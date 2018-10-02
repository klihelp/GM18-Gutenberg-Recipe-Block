const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, PlainText, InspectorControls } = wp.editor;
const { RangeControl } = wp.components;

import { __, sprintf } from '@wordpress/i18n';

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
			type: 'int',
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
		ingredients: {
			type: 'array'
		}
	},

	// In the admin.
	edit( { attributes, setAttributes, className } ) {

		const { servings , title, ingredients } = attributes;

		function updateServingsAttribute( newValue ) {
			setAttributes({
				servings: newValue
			});
		}

        function setNextValues( newValue ) {
            setAttributes({
                ingredients: newValue
            });
        }

		return <p className='recipe-options'>
			<InspectorControls>
				<RangeControl
					label={ __( 'Servings' ) }
					value={ servings }
					initialPosition={ 2 }
					onChange={ updateServingsAttribute }
					min={ 1 }
					max={ 20 }
				/>
			</InspectorControls>
			<textarea class="title" >
				{title}
			</textarea>

			<h2> Ingredients </h2>
            <RichText
        multiline="li"
        tagName={ 'ul' }
        onChange={ setNextValues }
        value={ ingredients }
        />
		</p>;
	},

	// After saving, so this is what appears on the frontend.
	save( props ) {
		return <div class="hrecipe jetpack-recipe" itemscope itemtype="https://schema.org/Recipe">
			<h3 class="jetpack-recipe-title" itemprop="name">{ props.attributes.title }</h3>
			<ul class="jetpack-recipe-meta">
				<li class="jetpack-recipe-servings" itemprop="recipeYield"><strong>{ __( 'Servings' ) }: </strong>{ props.attributes.servings }</li>
			</ul>
		</div>;
	}
});
