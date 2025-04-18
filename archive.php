<?php
/**
 * The template for displaying archive pages.
 *
 * This template is used for displaying category, tag, author, or date-based archives.
 * It retrieves the archive title, description, and posts using the `zwt_archive_post()` function.
 *
 * @package Zeal_Boilerplate
 * @since 1.0.0
 */

get_header(); // Include the header template
?>

<main>
    <?php
    // Display archive title and description
    echo "<h1>" . get_the_archive_title() . "</h1>";
    echo "<p>" . get_the_archive_description() . "</p>";

    // Load the archive posts and category filter
    echo zwt_archive_post();
    ?>
</main>

<?php
get_footer(); // Include the footer template