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
			error_log(print_r( $blocks_dir,true ));
			if (!file_exists($blocks_dir)) continue;
			register_block_type($blocks_dir);
		}
	}
}
add_action('init', 'noob_blocks_register_blocks');
