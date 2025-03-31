<?php

/**
 * Load the theme actions.
 */

if (!defined('ABSPATH')) {
	header('Status: 403 Forbidden');
	header('HTTP/1.1 403 Forbidden');
	exit;
}

/**
 * Removes unnecessary emoji scripts
 */
function disable_wp_emojis()
{
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('wp_print_styles', 'print_emoji_styles');
	remove_action('admin_print_styles', 'print_emoji_styles');
}
add_action('init', 'disable_wp_emojis');
