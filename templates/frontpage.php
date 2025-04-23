<?php
/**
 * Template Name: Front Page
 *
 * @package mytheme
 */

if ( !defined( 'ABSPATH' ) ) {
	header('Status: 403 Forbidden');
	header('HTTP/1.1 403 Forbidden');
	exit;
}

get_header();
?>

	<main id="primary" class="site-main">

	<?php while ( have_posts() ) : the_post(); ?>

		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

			<?php echo entry_banner(); ?>

			<div class="entry-content">
				<?php
				the_content();

				wp_link_pages(
					array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', THEME_PREFIX ),
						'after'  => '</div>',
					)
				);
				?>
			</div><!-- .entry-content -->
			
		</article><!-- #post-<?php the_ID(); ?> -->

	<?php endwhile; ?>

	</main><!-- #main -->

<?php
get_footer();