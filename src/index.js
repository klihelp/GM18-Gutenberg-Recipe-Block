const { createElement, Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, InnerBlocks } = wp.editor;
const { RangeControl, CheckboxControl } = wp.components;
const { withState } = wp.compose;


import { __, sprintf } from '@wordpress/i18n';


function getRecipeTemplate( showNotes, showIngredients ) {


    let template = [
        // [ blockName, attributes ]

        [ 'core/heading', {
                placeholder: 'Recipe Name',
            }
        ]
    ];

    if(showNotes) {
        template.push([ 'core/paragraph', {
                placeholder: 'Recipe Notes'
            }
        ]);

    }
    if (showIngredients) {
        template.push(
            [ 'gm18-recipe-block/locked-template-block', {}, [ // Ingredients
                [ 'core/heading', {
                    content: 'Ingredients',
                }
                ],
                [ 'core/list', {
                    placeholder: 'List your ingrediants'
                }
                ]
            ]]);
    }

    return template

}

function getRecipeNameTemplate() {
    return [
        [ 'core/heading', {
            	placeholder: 'Recipe Name',
    		}
    	],
    	[ 'core/paragraph', {
    			placeholder: 'Recipe Notes'
			}
		] // [ blockName, attributes ]
    ]
}

function getRecipeIngredientsTemplate() {
    return [
        [ 'core/heading', {
            content: 'Ingredients',
        }
        ],
        [ 'core/list', {
            placeholder: 'List your ingrediants'
        }
        ]
    ]
}
registerBlockType( 'gm18-recipe-block/locked-template-block', {
    title: __( 'Reusable Template' ),

    category: 'reusable',

    description: __( 'Locked Template block used as a container.' ),

    icon: 'carrot',

    supports: {
        customClassName: false,
        html: false,
        inserter: false,
    },

    edit( props ) {
        return <InnerBlocks templateLock="all" />;
    },

    save() {
        return <InnerBlocks.Content/>;
    },
});

registerBlockType( 'gm18-recipe-block/recipe-block', {
	title: __( 'Recipe' ),
	description: __( 'Embed a recipe with consistent formatting, basic metadata, and an option to print.' ),
	icon: 'carrot',
	category: 'common',
	keywords: [ __( 'recipes' ), __( 'food' ), __( 'jetpack' ) ],
	attributes: {
	    showIngredients: {
	        type: 'boolean',
            default: true
        },
        showNotes: {
	        type: 'boolean',
            default: true
        },
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

	    console.log(props.attributes.showIngredients);

	    const updateServingsAttribute = servings => props.setAttributes({ servings });
        const RecipeCheckboxControl = function(key, value, labelMessage, helpMessage) {

            return <CheckboxControl
                label={labelMessage}
                help={helpMessage}
                checked={ value }
                onChange={ ( isChecked ) => { props.setAttributes({ [ key ]: isChecked }) } }
            />

        };

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
                { RecipeCheckboxControl('showIngredients', props.attributes.showIngredients, 'Ingredients', 'Show Recipe Ingredients?')}
                { RecipeCheckboxControl('showNotes', props.attributes.showNotes, 'Notes', 'Show Recipe Notes?')}
			</InspectorControls>
            <InnerBlocks
                template={ getRecipeTemplate(
                    props.attributes.showNotes,
                    props.attributes.showIngredients
                )}
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
