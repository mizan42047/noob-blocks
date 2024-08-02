/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	icon: {
		src: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<path d="M6 5v2h1v18H6v2h8v-2h-1v-6h6v6h-1v2h8v-2h-1V7h1V5h-8v2h1v6h-6V7h1V5Zm3 2h2v8h10V7h2v18h-2v-8H11v8H9Z"/>
			</svg>,
	},

	/**
	 * @see ./save.js
	 */
	save,
} );
