<?php
/**
 * mytheme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package mytheme
 */

if ( !defined( 'ABSPATH' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit;
}

if ( !defined( '_S_VERSION' ) ) {
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Define the default contant that will be used throughout your theme.
 */
define( 'THEME_PREFIX', 'mytheme' );

define( 'PLACEHOLDER_IMAGE_URL', get_stylesheet_directory_uri().'/assets/images/placeholder-image.jpg' );
define( 'PLACEHOLDER_IMAGE_ALT', 'Image ALT Text' );

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function mytheme_setup() {
	/**
	 * Add default posts and comments RSS feed links to head. 
	 */
	add_theme_support( 'automatic-feed-links' );

	/**
	 * Let WordPress manage the document title. 
	 */
	add_theme_support( 'title-tag' );

	/**
	 * Enable support for Post Thumbnails on posts and pages. 
	 */
	add_theme_support( 'post-thumbnails' );

	/**
	* Switch default core markup for search form, comment form, and comments to output valid HTML5.
	*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	/**
	 * This theme uses wp_nav_menu() in one location.
	 */
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', THEME_PREFIX ),
			'menu-2' => esc_html__( 'Secondary', THEME_PREFIX ),
		)
	);
}
add_action( 'after_setup_theme', 'mytheme_setup' );

/**
 * Enqueue scripts and styles.
 */
function mytheme_scripts() {
	wp_enqueue_style( 'mytheme-style', get_stylesheet_uri(), array(), _S_VERSION );

	wp_enqueue_script( 'jquery' );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'mytheme_scripts' );

/**
 * Enqueue scripts and styles.
 */
require get_template_directory() . '/includes/theme-scripts.php';

/**
 * Implement the Custom Action for this theme.
 */
require get_template_directory() . '/includes/theme-action.php';

/**
 * Implement the Custom Filter for this theme.
 */
require get_template_directory() . '/includes/theme-filter.php';

/**
 * Add the Custom functions for this theme.
 */
require get_template_directory() . '/includes/theme-functions.php';

/**
 * Register the Custom ACF Block for this theme.
 */
require get_template_directory() . '/includes/acf-block-register.php';
