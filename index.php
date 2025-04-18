<?php
/**
 * The template for displaying all pages
 *
 * @package mytheme
 */

if ( !defined( 'ABSPATH' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit;
}

get_header();
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
get_footer();

