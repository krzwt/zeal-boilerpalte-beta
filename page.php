<?php
/**
 * The template for displaying all pages
 *
 * @package mytheme
 */

if ( !defined( 'ABSPATH' ) || !function_exists( 'add_filter' ) ) {
	header('Status: 403 Forbidden');
	header('HTTP/1.1 403 Forbidden');
	exit;
}

get_header();
?>

	<main id="primary" class="site-main">

		<?php while ( have_posts() ) : the_post(); ?>

			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

				<div class="entry-header">
					<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
				</div><!-- .entry-header -->

				<?php mytheme_post_thumbnail(); ?>

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

				<?php if ( get_edit_post_link() ) : ?>
					<div class="entry-footer">
						<?php
						edit_post_link(
							sprintf(
								wp_kses(
									/* translators: %s: Name of current post. Only visible to screen readers */
									__( 'Edit <span class="screen-reader-text">%s</span>', THEME_PREFIX ),
									array(
										'span' => array(
											'class' => array(),
										),
									)
								),
								wp_kses_post( get_the_title() )
							),
							'<span class="edit-link">',
							'</span>'
						);
						?>
					</div><!-- .entry-footer -->
				<?php endif; ?>
				
			</article><!-- #post-<?php the_ID(); ?> -->

		<?php endwhile; ?>

	</main><!-- #main -->

<?php
get_footer();
