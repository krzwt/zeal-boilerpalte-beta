<?php
/**
 * mytheme functions and definitions
 *
 * @package mytheme
 */

if ( !defined( 'ABSPATH' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit;
}

if ( ! defined( '_THEME_VERSION' ) ) {
	define( '_THEME_VERSION', wp_get_theme()->get( 'Version' ) );
}

/**
 * Define the default contant that will be used throughout your theme.
 */
define( 'THEME_PREFIX', 'mytheme' );

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
	 * Enable support for wide alignment.
	 */
	add_theme_support( 'align-wide' );

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
	wp_enqueue_style( THEME_PREFIX . '-wp-style', get_stylesheet_uri(), array(), _THEME_VERSION );
    // wp_enqueue_style( THEME_PREFIX . '-style', get_template_directory_uri() . '/assets/css/style.min.css', array(), _THEME_VERSION );

	wp_enqueue_script( 'jquery' );

	// if (file_exists( get_template_directory() . '/assets/js/scripts.js' ) && is_user_logged_in()) {
    //     wp_register_script( THEME_PREFIX . '-scripts', get_template_directory_uri() . '/assets/js/scripts.js', array( 'jquery' ), _THEME_VERSION, true );
    // } else {
    //     wp_register_script( THEME_PREFIX . '-scripts', get_template_directory_uri() . '/assets/js/scripts.min.js', array( 'jquery' ), _THEME_VERSION, true );
    // }
    // wp_enqueue_script( THEME_PREFIX . '-scripts' );

	$manifest_path = get_template_directory() . '/public/manifest.json';
	if ( file_exists( $manifest_path ) ) {
        $manifest = json_decode( file_get_contents( $manifest_path ), true );

        if ( isset( $manifest['main.css'] ) ) {
            wp_enqueue_style( THEME_PREFIX . '-style', get_template_directory_uri() . '/public' . $manifest['main.css'], array(), _THEME_VERSION );
        }

        if ( isset( $manifest['main.js'] ) ) {
            wp_enqueue_script( THEME_PREFIX . '-scripts', get_template_directory_uri() . '/public' . $manifest['main.js'], array( 'jquery' ), _THEME_VERSION, true );
        }
    }

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

/**
 * Placeholder image.
 */
function placeholder_banner($title = 'Banner') {
    $placeholder_url = get_template_directory_uri() . '/assets/images/placeholder-banner.jpg';
    return '<img src="' . esc_url($placeholder_url) . '" alt="' . esc_attr($title) . '">';
}

/**
 * Entry banner.
 */
function entry_banner() {
    if (is_singular()) {
        $banner_image = get_the_post_thumbnail_url(get_the_ID(), 'full');
        $title = get_the_title();
    } elseif (is_category()) {
        $banner_image = '';
        $title = single_cat_title('', false);
    } elseif (is_tag()) {
        $banner_image = '';
        $title = single_tag_title('', false);
    } elseif (is_post_type_archive()) {
        $banner_image = '';
        $title = post_type_archive_title('', false);
    } elseif (is_archive()) {
        $banner_image = '';
        $title = get_the_archive_title();
    } elseif (is_home()) {
        $banner_image = '';
        $title = get_the_title(get_option('page_for_posts'));
    } elseif (is_search()) {
        $banner_image = '';
        $title = 'Search Results for: ' . get_search_query();
    } elseif (is_404()) {
        $banner_image = '';
        $title = 'Page Not Found';
    } else {
        $banner_image = '';
        $title = get_the_title();
    }

    echo '<div class="entry-banner">';

		if (!empty($banner_image)) {
			echo '<img src="' . esc_url($banner_image) . '" alt="' . esc_attr($title) . '">';
		} else {
			echo placeholder_banner($title);
		}

		echo '<div class="entry-header">';
			echo '<h1 class="entry-title">' . esc_html($title) . '</h1>';
		echo '</div>';
    echo '</div>';
}


/**
 * Allow SVG.
 */
function allow_svg_uploads_for_admin($mimes) {
    // Allow SVG for administrators only
    if (current_user_can('administrator')) {
        $mimes['svg'] = 'image/svg+xml';
    }
    return $mimes;
}
add_filter('upload_mimes', 'allow_svg_uploads_for_admin');

// Disable file type check for SVG (bypass the "not allowed" error)
function fix_svg_filetype_check($data, $file, $filename, $mimes) {
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    if ($ext === 'svg') {
        $data['type'] = 'image/svg+xml';
        $data['ext']  = 'svg';
    }
    return $data;
}
add_filter('wp_check_filetype_and_ext', 'fix_svg_filetype_check', 10, 4);


/**
 * SVG image.
 */
function svg_icon( $attachment_id ) {
    $file_path = get_attached_file( $attachment_id );

    if ( ! $file_path || ! file_exists( $file_path ) ) {
        return '';
    }

    $mime = mime_content_type( $file_path );
    if ( strpos( $mime, 'svg' ) !== false ) {
        return file_get_contents( $file_path );
    }

    return '';
}
