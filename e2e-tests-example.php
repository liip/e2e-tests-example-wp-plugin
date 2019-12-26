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

// Register wrapper-block
register_block_type(
	'e2e-tests-example/wrapper-block',
	array(
		'render_callback' => 'wrapper_block_render_callback',
		'attributes' => array(
			'bgColor' => array(
				'type' => 'string',
			),
			'alignment' => array(
				'type' => 'string',
			),
			'marginBottom' => array(
				'type' => 'boolean',
			),
		),
	)
);

function wrapper_block_render_callback( $attributes, $content ) {
	// Start output capture.
	ob_start();

	$classes = array();
	$styles = '';
	if ( array_key_exists( 'className', $attributes ) && ! empty( $attributes['className'] ) ) {
		array_push( $classes, $attributes['className'] );
	}
	if ( array_key_exists( 'bgColor', $attributes ) && ! empty( $attributes['bgColor'] ) ) {
		$styles .= 'background-color: ' . $attributes['bgColor'] . ';';
	}
	if ( array_key_exists( 'marginBottom', $attributes ) && ! empty( $attributes['marginBottom'] ) ) {
		$styles .= 'margin-bottom: 60px;';
	}
	?>
	<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>" style="<?php echo esc_attr( $styles ); ?>">
		<?php echo $content; ?>
	</div>
	<?php
	// Record output.
	$html = ob_get_contents();
	ob_end_clean();
	return $html;
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
