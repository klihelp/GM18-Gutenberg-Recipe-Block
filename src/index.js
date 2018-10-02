const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;

registerBlockType( 'gm18-recipe-block/recipe-block', {
	title: 'Recipe',
	description: 'Embed a recipe with consistent formatting, basic metadata, and an option to print.',
	icon: 'carrot',
	category: 'common',
	keywords: [ 'recipes', 'food', 'jetpack' ],

	// In the admin.
	edit(props) {
		return <p>Hello Editor</p>;
	},

	// After saving, so this is what appears on the frontend.
	save(props) {
		return <p>Hello Frontend</p>;
	}
});
