<?php

/**
 * Load the theme functions.
 */

if (!defined('ABSPATH')) {
	header('Status: 403 Forbidden');
	header('HTTP/1.1 403 Forbidden');
	exit;
}

/**
 * Generate an accessible ACF link with fallback title.
 *
 * @param array  $link        The ACF link array.
 * @param string $link_class  Additional CSS classes for styling.
 * @return string             HTML anchor tag or empty string.
 */
function acf_link($link, $link_class = '')
{
	if (! is_array($link) || empty($link['url'])) {
		return ''; // Return empty string if the link is invalid.
	}

	// Extract link values.
	$link_url    = esc_url($link['url']);
	$link_title  = ! empty($link['title']) ? esc_html($link['title']) : __('Read More', 'text-domain'); // Fallback title.
	$link_target = ! empty($link['target']) ? '_blank' : '_self';
	$rel_attr    = ('_blank' === $link_target) ? 'noopener noreferrer' : 'nofollow';
	$link_class  = esc_attr($link_class ? $link_class : 'btn');

	// Return formatted accessible link.
	return sprintf(
		'<a class="%s" href="%s" target="%s" rel="%s" aria-label="%s">%s</a>',
		$link_class,
		$link_url,
		esc_attr($link_target),
		esc_attr($rel_attr),
		esc_attr($link_title), // `aria-label` improves accessibility.
		$link_title
	);
	/** 
	 * Example Usage 
	 * echo acf_link( $link, 'custom-button' );
	 */
}

/**
 * Optimized function for rendering an ACF image using Image ID.
 *
 * @param int    $image_id   The image attachment ID.
 * @param string $size       Image size ('full', 'medium_large', etc.).
 * @param string $class      Additional CSS classes.
 * @return string            HTML img tag or empty string.
 */
function acf_image($image_id, $size = 'medium_large', $class = '')
{
	if (empty($image_id)) {
		return ''; // Return empty string if image ID is not valid.
	}

	// Get image attributes.
	$image_url  = wp_get_attachment_image_url($image_id, $size);
	$image_alt  = get_post_meta($image_id, '_wp_attachment_image_alt', true);
	$image_alt  = ! empty($image_alt) ? esc_attr($image_alt) : esc_attr(get_the_title()) . ' Image';
	$srcset     = wp_get_attachment_image_srcset($image_id, $size);

	// Return optimized image tag.
	return sprintf(
		'<img src="%s" srcset="%s" alt="%s" class="%s" loading="lazy" decoding="async" width="%s" height="%s">',
		esc_url($image_url),
		esc_attr($srcset),
		$image_alt,
		esc_attr($class),
		esc_attr(wp_get_attachment_metadata($image_id)['width'] ?? ''),
		esc_attr(wp_get_attachment_metadata($image_id)['height'] ?? '')
	);
	/** 
	 * Example Usage
	 * echo acf_image( $image_id, 'full', 'banner-image' );
	 */
}

/**
 * Debug function to print an array/object with optional logging.
 *
 * @param mixed $data  The data to debug.
 * @param bool  $exit  Stop execution after printing (default: false).
 * @param bool  $log   Log to error_log instead of printing (default: false).
 */
function printr($data, $exit = false, $log = false)
{
	if ($log) {
		error_log(print_r($data, true)); // Log to error_log instead of printing.
	} else {
		echo '<pre style="background: #222; color: #0f0; padding: 10px; border-radius: 5px;">';
		print_r($data);
		echo '</pre>';
	}

	if ($exit) {
		exit;
	}
	/**
	 * Example Usage
	 * printr( $my_array ); // Print for debugging.
	 * printr( $my_array, true ); // Print and stop execution.
	 * printr( $my_array, false, true ); // Log to error_log.
	 */
}

/**
 * Trim text to a specific word count.
 *
 * @param string $text   The text to trim.
 * @param int    $limit  The word limit.
 * @return string        Trimmed text.
 */
function trim_excerpt($text, $limit = 55)
{
	if (str_word_count($text, 0) > $limit) {
		$words = str_word_count($text, 2);
		$pos   = array_keys($words);
		$text  = substr($text, 0, $pos[$limit]) . '...';
	}
	return esc_html($text);
}
