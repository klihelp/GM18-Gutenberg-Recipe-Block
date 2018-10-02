const { createElement, Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, InnerBlocks } = wp.editor;
const { RangeControl, CheckboxControl } = wp.components;
const { withState } = wp.compose;


import { __, sprintf } from '@wordpress/i18n';

function getRecipeTemplate() {
    return [
         // [ blockName, attributes ]

        [ 'core/heading', {
                placeholder: 'Recipe Name',
            }
        ],
        [ 'core/paragraph', {
                placeholder: 'Recipe Notes'
            }
        ],
        [ 'gm18-recipe-block/locked-template-block', {}, [
                [ 'core/heading', {
                    content: 'Ingredients',
                }
                ],
                [ 'core/list', {
                    placeholder: 'List your ingrediants'
                }
                ]
            ]
        ]
    ]
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

    edit() {
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
	edit({ attributes, setAttributes, className }) {

	    const { servings } = attributes;

	    const updateServingsAttribute = servings => setAttributes({ servings });
        const MyCheckboxControl = withState( {
            isChecked: true,
            } )( ( { isChecked, setState } ) => (
                <CheckboxControl
                    label="Recipe Ingredients"
                    help="Does the Recipe have an unordered list of ingredients?"
                    checked={ isChecked }
                    onChange={ ( isChecked ) => { setState( { isChecked } ) } }
                />
        ) );


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
                <MyCheckboxControl />
			</InspectorControls>
            <InnerBlocks
                template={ getRecipeTemplate() }
                // templateLock="all"
                //allowedBlocks={ ALLOWED_BLOCKS }
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
