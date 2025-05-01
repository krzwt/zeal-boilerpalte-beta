<?php

/**
 * The template for displaying all single posts
 *
 * @package mytheme
 */

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

get_header();
?>

  <main id="primary" class="site-main">

        <?php
        while (have_posts()) :
            the_post();
            ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

                <?php echo entry_banner(); ?>

             <div class="entry-content">
                    <?php
                    the_content(sprintf(wp_kses(/* translators: %s: Name of current post. Only visible to screen readers */
                        __('Continue reading<span class="screen-reader-text"> "%s"</span>', THEME_PREFIX),
                        array(
                                    'span' => array(
                                        'class' => array(),
                                    ),
                        )
                    ), wp_kses_post(get_the_title())));
                    wp_link_pages(array(
                            'before' => '<div class="page-links">' . esc_html__('Pages:', THEME_PREFIX),
                            'after'  => '</div>',
                        ));
                    ?>
               </div><!-- .entry-content -->

            </article><!-- #post-<?php the_ID(); ?> -->

            <?php
            the_post_navigation(array(
                    'prev_text' => '<span class="nav-subtitle">' . esc_html__('Previous:', THEME_PREFIX) . '</span> <span class="nav-title">%title</span>',
                    'next_text' => '<span class="nav-subtitle">' . esc_html__('Next:', THEME_PREFIX) . '</span> <span class="nav-title">%title</span>',
                ));
// If comments are open or we have at least one comment, load up the comment template.
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
        endwhile; // End of the loop.
        ?>

  </main><!-- #main -->

<?php
get_footer();
