const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;

import { __ } from '@wordpress/i18n';

registerBlockType( 'gm18-recipe-block/recipe-block', {
	title: __( 'Recipe' ),
	description: __( 'Embed a recipe with consistent formatting, basic metadata, and an option to print.' ),
	icon: 'carrot',
	category: 'common',
	keywords: [ __( 'recipes' ), __( 'food' ), __( 'jetpack' ) ],

	// In the admin.
	edit(props) {
		return <p>Hello Editor</p>;
	},

	// After saving, so this is what appears on the frontend.
	save(props) {
		return <p>Hello Frontend</p>;
	}
});
