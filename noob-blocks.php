<?php

/**
 * Plugin Name:       Noob Blocks
 * Description:       Collection of custom Gutenberg blocks to design your webpages with ease.
 * Requires at least: 6.5
 * Requires PHP:      8.0
 * Version:           1.0.0
 * Author:            mizan42047, bdkoder
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       noob-blocks
 *
 */

defined('ABSPATH') || exit;

function noob_blocks_register_blocks()
{
	$block_list     =  [
		'heading'      => [
			'title'       => __('Heading', 'noob-blocks'),
			'category'    => 'widgets',
			'is_active'   => true,
			'badge'       => 'new',
		]
	];

	$blocks = apply_filters('noob_blocks_block_list', $block_list);
	if (!empty($blocks)) {
		foreach ($blocks as $key => $block) {
			$blocks_dir = trailingslashit(plugin_dir_path(__FILE__)) . 'build/blocks/' . $key;
			if (!file_exists($blocks_dir)) continue;
			register_block_type($blocks_dir);
			wp_set_script_translations( "noob-blocks-$key-editor-script", 'noob-blocks', plugin_dir_path(__FILE__) . '/languages' );
		}
	}
}
add_action('init', 'noob_blocks_register_blocks');
function noob_blocks_editor_assets(){
	$editor_assets_path = trailingslashit(plugin_dir_path(__FILE__)) . 'build/modules/index.asset.php';
	if(file_exists($editor_assets_path)){
		$editor_assets = include $editor_assets_path;
		wp_enqueue_script('noob-blocks-module-editor-script', plugin_dir_url(__FILE__) . 'build/modules/index.js', $editor_assets['dependencies'], $editor_assets['version'], true);
	}
}
add_action("enqueue_block_editor_assets", "noob_blocks_editor_assets");
function noob_blocks_asset_loader(){
	$dependency_path  = trailingslashit(plugin_dir_path(__FILE__)) . 'build/modules/index.asset.php';
	if(file_exists($dependency_path)){
		$dependency = include $dependency_path;
		wp_enqueue_style('noob-blocks-module-style', plugin_dir_url(__FILE__) . 'build/modules/style-index.css', [], $dependency['version']);
	}
}
add_action('enqueue_block_assets', "noob_blocks_asset_loader");
function noob_blocks_render($block_content, $block) {
	if (isset($block['blockName']) && str_contains($block['blockName'], 'noob-blocks/')) {
		$tags = new WP_HTML_Tag_Processor( $block_content );
		$tags->next_tag('div');
		$tags->add_class( 'noob-blocks' );
		$tags->get_updated_html();
		$module_style = !empty($block['attrs']['moduleStyle']) ? $block['attrs']['moduleStyle'] : '';
		return sprintf("<style>%1s</style> %2s", $module_style, $tags);
	}

	return $block_content;
}
add_filter( 'render_block', 'noob_blocks_render', 10, 2 );
