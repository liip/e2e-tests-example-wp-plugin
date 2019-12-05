<?php
/**
 * Plugin Name: E2E Tests Example
 * Description: Example how to write E2E tests for a Gutenberg block in WordPress.
 * Author: Liip AG
 * Author URI: https://liip.ch
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: e2e-tests-example
 * Domain Path: /languages/
 *
 * @package e2e-tests-example
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'enqueue_block_editor_assets', 'e2e_tests_example_enqueue_block_editor_assets' );

function e2e_tests_example_enqueue_block_editor_assets() {
    // Enqueue our script
    wp_enqueue_script(
        'e2e-tests-example-js',
        esc_url( plugins_url( '/build/index.js', __FILE__ ) ),
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components' ),
        '1.0.0',
        true // Enqueue the script in the footer.
    );
}
