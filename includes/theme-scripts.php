<?php
/**
* Load the theme scripts.
*/

if ( !defined( 'ABSPATH' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit;
}

function force_load_jquery() {
    wp_enqueue_script( 'jquery' ); // Enqueue the new jQuery
}
add_action( 'wp_enqueue_scripts', 'force_load_jquery', 1 ); // Execute early to override WP jQuery

/**
 * Enqueue custom AJAX script and localize AJAX URL for frontend requests.
 */
add_action( 'wp_enqueue_scripts', 'zwt_enqueue' );
function zwt_enqueue() {
    // Enqueue the custom AJAX handling script
    wp_enqueue_script(
        'zwt-ajax-script', // Script handle
        get_template_directory_uri() . '/assets/js/zwt-ajax-script.js', // Script path
        array( 'jquery' ), // Dependencies (requires jQuery)
        '1.0.0', // Version
        true // Load script in the footer
    );

    // Localize the script to pass AJAX URL and nonce to JavaScript
    wp_localize_script(
        'zwt-ajax-script',
        'zwt_ajax_object', // JavaScript object name
        array(
            'ajax_url' => admin_url( 'admin-ajax.php' ), // AJAX handler URL
            'nonce' => wp_create_nonce( 'ajax-nonce' ) // Security nonce
        )
    );
}