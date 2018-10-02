<?php
/**
 * Plugin Name: GM 2018 Gutenpies
 * Plugin URI: https://automattic.com
 * Description: Teaching WordPresses how to cook
 * Version: 1.0.0
 * Author: The Chefs
 *
 * @package gm18-gutenberg-recipe-block
 */

defined( 'GM18GUTENPIES__VERSION' ) || define( 'GM18GUTENPIES__VERSION', '1.0.0' );

/**
 * Retrieves a URL to a file in the plugin's directory.
 *
 * @param  string $path Relative path of the desired file.
 *
 * @return string       Fully qualified URL pointing to the desired file.
 *
 * @since 1.0.0
 */
function gm18_recipe_block_plugin_url( $path ) {
	return plugins_url( $path, __FILE__ );
}

/**
 * Registers the plugin's block.
 *
 * @since 1.0.0
 */
function gm18_recipe_block_register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
		'gm18_recipe_block',
		gm18_recipe_block_plugin_url( 'dist/index.js' ),
		array( 'wp-element', 'wp-blocks', 'wp-editor', 'wp-components' ),
		time()
	);

	register_block_type( 'gm18-recipe-block/recipe-block', array(
		'editor_script' => 'gm18_recipe_block',
	) );

	wp_register_style(
		'gm18-recipes-styles',
		gm18_recipe_block_plugin_url( 'dist/index.css' ),
		array(),
		time()
	);
}
add_action( 'init', 'gm18_recipe_block_register_block' );
