const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, InnerBlocks } = wp.editor;
const { RangeControl } = wp.components;

import { __, sprintf } from '@wordpress/i18n';

function getRecipeTemplate() {
    return [
        [ 'core/heading', {
            	placeholder: 'Recipe Name',
    		}
    	],
    	[ 'core/paragraph', {
    			placeholder: 'Recipe Notes'
			}
		], // [ blockName, attributes ]
        [ 'core/heading', {
            content: 'List yo shit.',
			level: 4,
        }
        ],
        [ 'core/list', {
    			placeholder: 'List your ingrediants'
			}
		]
    ]
}

function getRecipeOptionalTemplate() {
    return [
        [ 'core/paragraph', {
            placeholder: 'Recipe Notes'
        }
        ], // [ blockName, attributes ]
        [ 'core/heading', {
            content: 'Optional stuff',
            level: 4,
        }
        ],
    ]
}


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
	},

	// In the admin.
	edit( props ) {
		function updateServingsAttribute( newValue ) {
			props.setAttributes({
				servings: newValue
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
			</InspectorControls>
            <InnerBlocks
                template={ getRecipeTemplate() }
                templateLock="all"
                //allowedBlocks={ ALLOWED_BLOCKS }
			/>
			<InnerBlocks
				template={ getRecipeOptionalTemplate() }
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
