<?php
/**
 * Plugin Name: e2e-tests-example-wrapper-block-filters
 * Description: [FOR TESTING PURPOSES ONLY] Plugin to test wrapper block filters.
 * Plugin URI: https://github.com/liip/e2e-tests-example-wp-plugin
 * Author: Liip AG
 *
 * @package e2e-tests-example-wrapper-block-filters
 */

/**
 * Registers a custom script for the plugin.
 */
function enqueue_wrapper_block_filters_plugin_script() {
	wp_enqueue_script(
		'e2e-tests-example-wrapper-block-filters',
		plugins_url( 'wrapper-block-filters/index.js', __FILE__ ),
		array(
			'wp-hooks',
		),
		filemtime( plugin_dir_path( __FILE__ ) . 'wrapper-block-filters/index.js' ),
		true
	);
}
add_action( 'init', 'enqueue_wrapper_block_filters_plugin_script' );
