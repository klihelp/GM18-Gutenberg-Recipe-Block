const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls } = wp.editor;
const { RangeControl, TextControl } = wp.components;

import './index.scss';

registerBlockType( 'gm18-recipe-block/recipe-block', {
	title: __( 'Recipe' ),
	description: __( 'Embed a recipe with consistent formatting, basic metadata, and an option to print.' ),
	icon: 'carrot',
	category: 'common',
	keywords: [ __( 'recipes' ), __( 'food' ), __( 'jetpack' ) ],
	attributes: {
		title: {
			type: 'string',
		},
		servings: {
			type: 'string',
		},
		time: {
			type: 'string',
		},
		difficulty: {
			type: 'string',
		},
		print: {
			type: 'string',
		},
		source: {
			type: 'string',
		},
		sourceurl: {
			type: 'string',
		},
		image: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
		notes: {
			type: 'string',
		},
		ingredients: {
			type: 'string',
		},
		directions: {
			type: 'string',
		},
	},

	// In the admin.
	edit( props ) {
		function updateTitleAttribute( newValue ) {
			props.setAttributes({
				title: newValue
			});
		}

		function updateServingsAttribute( newValue ) {
			props.setAttributes({
				servings: newValue
			});
		}

		function updateTimeAttribute( newValue ) {
			props.setAttributes({
				time: newValue
			});
		}

		function updateNotesAttribute( newValue ) {
			props.setAttributes({
				notes: newValue
			});
		}

		function updateIngredientsAttribute( newValue ) {
			props.setAttributes({
				ingredients: newValue
			});
		}

		function updateDirectionsAttribute( newValue ) {
			props.setAttributes({
				directions: newValue
			});
		}

		return <p className='recipe-options'>
			<InspectorControls>
				<RangeControl
					label={ __( 'Servings' ) }
					value={ props.attributes.servings }
					initialPosition={ 2 }
					onChange={ updateServingsAttribute }
					min={ 1 }
					max={ 20 }
				/>
				<TextControl
					label={ __( 'Time' ) }
					value={ props.attributes.time }
					onChange={ updateTimeAttribute }
				/>
			</InspectorControls>
			<TextControl
				label={ __( 'Recipe title' ) }
				value={ props.attributes.title }
				onChange={ updateTitleAttribute }
			/>
			<ul class="jetpack-recipe-meta">
				<li class="jetpack-recipe-servings" itemprop="recipeYield"><strong>{ __( 'Servings' ) }: </strong>{ props.attributes.servings }</li>
				<li class="jetpack-recipe-time">
					<time itemprop="totalTime" datetime={ props.attributes.time }><strong>{ __( 'Duration' ) }: </strong>{ props.attributes.time }</time>
				</li>
			</ul>
			<h4 class="jetpack-recipe-notes-title">{ __( 'Notes' ) }</h4>
			<RichText
				value={props.attributes.notes}
				onChange={updateNotesAttribute}
			/>
			<h4 class="jetpack-recipe-ingredients-title">{ __( 'Ingredients' ) }</h4>
			<RichText
				value={props.attributes.ingredients}
				onChange={updateIngredientsAttribute}
			/>
			<h4 class="jetpack-recipe-directions-title">{ __( 'Directions' ) }</h4>
			<RichText
				value={props.attributes.directions}
				onChange={updateDirectionsAttribute}
			/>
		</p>;
	},

	// After saving, so this is what appears on the frontend.
	save( props ) {
		return <div class="hrecipe jetpack-recipe" itemscope itemtype="https://schema.org/Recipe">
			<h3 class="jetpack-recipe-title" itemprop="name">{ props.attributes.title }</h3>
			<ul class="jetpack-recipe-meta">
				<li class="jetpack-recipe-servings" itemprop="recipeYield"><strong>{ __( 'Servings' ) }: </strong>{ props.attributes.servings }</li>
				<li class="jetpack-recipe-time">
					<time itemprop="totalTime" datetime={ props.attributes.time }><strong>{ __( 'Duration' ) }: </strong>{ props.attributes.time }</time>
				</li>
			</ul>
			<h4 class="jetpack-recipe-notes-title">{ __( 'Notes' ) }</h4>
			<RichText.Content
				value={props.attributes.notes}
			/>
			<h4 class="jetpack-recipe-ingredients-title">{ __( 'Ingredients' ) }</h4>
			<RichText.Content
				value={props.attributes.ingredients}
			/>
			<h4 class="jetpack-recipe-directions-title">{ __( 'Directions' ) }</h4>
			<RichText.Content
				value={props.attributes.directions}
			/>
		</div>;
	}
});
