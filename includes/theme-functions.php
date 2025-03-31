<?php
/**
* Load the theme functions.
*/

if ( !defined( 'ABSPATH' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit;
}

/**
 * Generate an accessible ACF link with fallback title.
 *
 * @param array  $link        The ACF link array.
 * @param string $link_class  Additional CSS classes for styling.
 * @return string             HTML anchor tag or empty string.
 */
function acf_link( $link, $link_class = '' ) {
    if ( ! is_array( $link ) || empty( $link['url'] ) ) {
        return ''; // Return empty string if the link is invalid.
    }

    // Extract link values.
    $link_url    = esc_url( $link['url'] );
    $link_title  = ! empty( $link['title'] ) ? esc_html( $link['title'] ) : __( 'Read More', 'text-domain' ); // Fallback title.
    $link_target = ! empty( $link['target'] ) ? '_blank' : '_self';
    $rel_attr    = ( '_blank' === $link_target ) ? 'noopener noreferrer' : 'nofollow';
    $link_class  = esc_attr( $link_class ? $link_class : 'btn' );

    // Return formatted accessible link.
    return sprintf(
        '<a class="%s" href="%s" target="%s" rel="%s" aria-label="%s">%s</a>',
        $link_class,
        $link_url,
        esc_attr( $link_target ),
        esc_attr( $rel_attr ),
        esc_attr( $link_title ), // `aria-label` improves accessibility.
        $link_title
    );
    /** use */
    //echo acf_link( $link, 'custom-button' );
}
