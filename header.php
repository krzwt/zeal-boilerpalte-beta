<?php
/**
 * The template for displaying site header
 *
 * @package mytheme
 */

if ( !defined( 'ABSPATH' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes() ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ) ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2" />
    <!-- <meta name="theme-color" content="#7b0a2e"/> -->
	<link rel="profile" href="http://gmpg.org/xfn/11" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ) ?>" />
    <?php wp_head(); ?>
</head>
<body <?php body_class() ?>>
	<div class="wrapper">
		
        <header class="main-header">
            <h1>Header goes here...</h1>
        </header>