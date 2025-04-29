<?php

/**
 * The template for displaying 404
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

    <main id="primary" class="site-main 404 not-found">

        <?php echo entry_banner(); ?>

        <div class="container">

           <div class="entry-content">
                <h1>404</h1>
           </div><!-- .entry-content -->

     </div>

    </main><!-- #main -->

<?php
get_footer();
