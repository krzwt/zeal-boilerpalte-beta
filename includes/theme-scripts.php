<?php

/**
* Load the theme scripts.
*/

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

/**
 * Enqueue scripts and styles.
 */

function themeManifest()
{
    static $manifest = null;

    if (is_null($manifest)) {
        $manifest_path = get_template_directory() . '/assets/manifest.json';

        if (file_exists($manifest_path)) {
            $json = file_get_contents($manifest_path);
            $manifest = json_decode($json, true);
        } else {
            $manifest = array();
        }
    }

    return $manifest;
}

function themeCSS($key, $deps = array(), $media = 'all')
{
    $manifest = themeManifest();
    $filename = isset($manifest[$key]) ? ltrim($manifest[$key], '/') : 'css/' . ltrim($key, '/');

    $filepath = get_template_directory() . '/assets/' . $filename;
    $fileuri  = get_template_directory_uri() . '/assets/' . $filename;

    if (file_exists($filepath)) {
        $handle = THEME_PREFIX . '-' . sanitize_title(pathinfo($filename, PATHINFO_FILENAME));
        wp_enqueue_style($handle, $fileuri, $deps, filemtime($filepath), $media);
    }
}

function themeJS($key, $deps = array('jquery'), $in_footer = true)
{
    $manifest = themeManifest();
    $filename = isset($manifest[$key]) ? ltrim($manifest[$key], '/') : 'js/' . ltrim($key, '/');

    $filepath = get_template_directory() . '/assets/' . $filename;
    $fileuri  = get_template_directory_uri() . '/assets/' . $filename;

    if (file_exists($filepath)) {
        $handle = THEME_PREFIX . '-' . sanitize_title(pathinfo($filename, PATHINFO_FILENAME));
        wp_enqueue_script($handle, $fileuri, $deps, filemtime($filepath), $in_footer);
    }
}



function mythemeScripts()
{
    wp_enqueue_style(THEME_PREFIX . '-wp-style', get_stylesheet_uri(), array(), _THEME_VERSION);

    themeCSS('main.css');
    // themeCSS('vendor/common.css');
    // themeJS('vendor/swiper.js');
    // themeJS('vendor/fancyapps.js');
    themeJS('main.js');
    themeJS('modules/ajax-scripts.js');

    // Localize the script to pass AJAX URL and nonce to JavaScript
    wp_localize_script(
        THEME_PREFIX . '-ajax-script',
        'mytheme_ajax_object',
        array(
            'ajax_url' => admin_url('admin-ajax.php'), // AJAX handler URL
            'nonce' => wp_create_nonce('ajax-nonce') // Security nonce
        )
    );

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'mythemeScripts');
