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
function mytheme_scripts()
{
    wp_enqueue_style(THEME_PREFIX . '-wp-style', get_stylesheet_uri(), array(), _THEME_VERSION);
    wp_enqueue_script('jquery');
    $manifest_path = get_template_directory() . '/assets/.vite/manifest.json';

    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);

        foreach ($manifest as $key => $entry) {
            // Enqueue JS file (only if it's an entry point and ends in .js)
            if (!empty($entry['isEntry']) && isset($entry['file']) && substr($entry['file'], -3) === '.js') {
                wp_enqueue_script(
                    THEME_PREFIX . '-script-' . md5($entry['file']),
                    get_template_directory_uri() . '/assets/' . ltrim($entry['file'], '/'),
                    array(), // Add dependencies if needed
                    _THEME_VERSION,
                    true
                );
            }

            // Enqueue associated CSS files
            if (isset($entry['css']) && is_array($entry['css'])) {
                foreach ($entry['css'] as $css_file) {
                    wp_enqueue_style(
                        THEME_PREFIX . '-style-' . md5($css_file),
                        get_template_directory_uri() . '/assets/' . ltrim($css_file, '/'),
                        array(),
                        _THEME_VERSION
                    );
                }
            }

            // Handle standalone CSS entries (e.g., style.scss output)
            if (!empty($entry['isEntry']) && isset($entry['file']) && substr($entry['file'], -4) === '.css') {
                wp_enqueue_style(
                    THEME_PREFIX . '-style-' . md5($entry['file']),
                    get_template_directory_uri() . '/assets/' . ltrim($entry['file'], '/'),
                    array(),
                    _THEME_VERSION
                );
            }
        }
    }

    // Enqueue the custom AJAX handling script
    wp_enqueue_script(THEME_PREFIX . '-ajax-script', get_template_directory_uri() . '/sources/js/modules/ajax-scripts.js', array(), _THEME_VERSION, true);

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
add_action('wp_enqueue_scripts', 'mytheme_scripts');
