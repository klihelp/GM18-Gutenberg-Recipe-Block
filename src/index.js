const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, InnerBlocks, PlainText } = wp.editor;
const { RangeControl, TextControl, CheckboxControl } = wp.components;
const { __ } = wp.i18n;

import './index.scss';

function getImageTemplate() {
	return [
		[ 'core/image', {
				placeholder: __( 'Upload an image.' )
			}
		]
	]
}


function getRecipeTemplate( props ) {

    function updateTitleAttribute( newValue ) {
        props.setAttributes({
            title: newValue
        });
    }

    let template = [
        // [ blockName, attributes ]

        [ 'core/heading', {
            	placeholder: __( 'My Awesome Recipe' ) ,
				tagName: 'h4',
				value: props.attributes.title,
				onChange: updateTitleAttribute,
            	className: 'jetpack-recipe-title'
            }
        ],
		['core/columns', {
    		columns: 4,
		}, [
			[ 'core/column', {}, [
                [ 'gm18-recipe-block/text-block', {
                    value: 'Servings: 4',
                	}
                ]
			]
			],
            [ 'core/column', {}, [
                [ 'gm18-recipe-block/text-block', {
                    value: 'Time: 2hr 30mins',
                }
                ]
            ]
            ],
            [ 'core/column', {}, [
                [ 'gm18-recipe-block/text-block', {
                    value: 'Difficulty: easy',
                }
                ]
            ]
            ],
            [ 'core/column', {}, [
                [ 'gm18-recipe-block/text-block', {
                    value: 'Print',
                }
                ]
            ]
            ]
		]],
        [ 'core/separator', {}],
		[ 'core/image', {
            placeholder: __( 'Upload an image.' )
        	}]

    ];

    if(props.attributes.showNotes) {
        template.push([ 'core/paragraph', {
                placeholder: 'Recipe Notes'
            }
        ]);

    }
    if (props.attributes.showIngredients) {
        template.push(
            [ 'gm18-recipe-block/locked-template-block', {}, [ // Ingredients
                [ 'core/heading', {
                    content: 'Ingredients',
                }
                ],
                [ 'core/list', {
                    placeholder: 'List your ingredients'
                }
                ]
            ]]);
    }

    if (props.attributes.showDirections) {
        template.push(
            [ 'gm18-recipe-block/locked-template-block', {}, [ // Ingredients
                [ 'core/heading', {
                    content: 'Directions',
                }
                ],
                [ 'core/list', {
                    placeholder: 'List your directions'
                }
                ]
            ]]);
    }

    // if(props.attributes.showIngredients) {
    // 	template.push(
    // 		['gm18-recipe-block/meta-block',{
    // 			servings: props.attributes.servings,
	// 			time: props.attributes.time,
	// 			difficulty: props.attributes.difficulty,
	// 			print: props.attributes.print
	// 		}]
	// 	);
	// }

    return template

}

registerBlockType('gm18-recipe-block/text-block', {
    title: __( 'Meta Block' ),

    category: 'common',

    description: __( 'Block for Recipe meta information' ),

	attributes: {
    	value: {
    		type: 'string'
		}
	},
	edit( props ) {
    	return (
            <PlainText
				className="recipe-meta"
                value={ props.attributes.value }
                onChange={ ( content ) => props.setAttributes( { value: content } ) }
            />
        );
    },
	save( props ) {
		return (
            <PlainText.Content />
        );
	}
});


registerBlockType( 'gm18-recipe-block/meta-block', {

    title: __( 'Meta Block' ),

    category: 'common',

    description: __( 'Block for Recipe meta information' ),

	attributes: {
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
            type: 'boolean',
        }
	},

    edit( props ) {
    	console.log('Servings' + props.attributes.servings);
		return <div>
            <ul className="jetpack-recipe-meta">
                {props.attributes.servings && <li className="jetpack-recipe-servings" itemProp="recipeYield">
                    <strong>{__('Servings')}: </strong>{props.attributes.servings}</li>}
                {props.attributes.time && <li className="jetpack-recipe-time">
                    <time itemProp="totalTime" dateTime={props.attributes.time}>
                        <strong>{__('Duration')}: </strong>{props.attributes.time}</time>
                </li>}
                {props.attributes.difficulty && <li className="jetpack-recipe-difficulty">
                    <strong>{__('Difficulty')}: </strong>{props.attributes.difficulty}</li>}
                {props.attributes.print && <li className="jetpack-recipe-print"><a href="#">{__('Print')}</a></li>}
            </ul>
		</div>
    },

    save(props) {
        return <div>
            <ul className="jetpack-recipe-meta">
                {props.attributes.servings && <li className="jetpack-recipe-servings" itemProp="recipeYield">
                    <strong>{__('Servings')}: </strong>{props.attributes.servings}</li>}
                {props.attributes.time && <li className="jetpack-recipe-time">
                    <time itemProp="totalTime" dateTime={props.attributes.time}>
                        <strong>{__('Duration')}: </strong>{props.attributes.time}</time>
                </li>}
                {props.attributes.difficulty && <li className="jetpack-recipe-difficulty">
                    <strong>{__('Difficulty')}: </strong>{props.attributes.difficulty}</li>}
                {props.attributes.print && <li className="jetpack-recipe-print"><a href="#">{__('Print')}</a></li>}
            </ul>
		</div>

    },

});

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
        showDirections: {
            type: 'boolean',
            default: true
        },
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
			type: 'boolean',
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
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		ingredients: {
			type: 'array',
			source: 'children',
			selector: 'li',
		},
		directions: {
			type: 'array',
			source: 'children',
			selector: 'li',
		},
	},

	// In the admin.
	edit( props ) {

	    const RecipeCheckboxControl = function(key, value, labelMessage, helpMessage) {

            return <CheckboxControl
                label={labelMessage}
                help={helpMessage}
                checked={ value }
                onChange={ ( isChecked ) => { props.setAttributes({ [ key ]: isChecked }) } }
            />

        };
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

		function updateDifficultyAttribute( newValue ) {
			props.setAttributes({
				difficulty: newValue
			});
		}

		function updatePrintAttribute( newValue ) {
			props.setAttributes({
				print: newValue
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

		return <div className='recipe-options'>
			<InspectorControls>
				<RangeControl
					label={ __( 'Servings' ) }
					value={ props.attributes.servings }
					initialPosition={ 2 }
					onChange={ updateServingsAttribute }
					min={ 1 }
					max={ 100 }
				/>
				<TextControl
					label={ __( 'Time' ) }
					value={ props.attributes.time }
					onChange={ updateTimeAttribute }
				/>
				<TextControl
					label={ __( 'Difficulty' ) }
					value={ props.attributes.difficulty }
					onChange={ updateDifficultyAttribute }
				/>
				<CheckboxControl
					heading={ __( 'Display Print button' ) }
					label={ __( 'Display Print' ) }
					checked={ props.attributes.print }
					onChange={ updatePrintAttribute }
				/>
                { RecipeCheckboxControl('showIngredients', props.attributes.showIngredients, 'Ingredients', 'Show Recipe Ingredients?')}
                { RecipeCheckboxControl('showNotes', props.attributes.showNotes, 'Notes', 'Show Recipe Notes?')}
                { RecipeCheckboxControl('showDirections', props.attributes.showDirections, 'Directions', 'Show Recipe Directions?')}
			</InspectorControls>

            <InnerBlocks
                template={ getRecipeTemplate(props) }
                templateLock="insert"
            />

			{/*<InnerBlocks*/}
				{/*template={ getImageTemplate() }*/}
				{/*templateLock="all"*/}
			{/*/>*/}
			{/*<h4 class="jetpack-recipe-notes-title">{ __( 'Notes' ) }</h4>*/}
			{/*<RichText*/}
				{/*value={props.attributes.notes}*/}
				{/*onChange={updateNotesAttribute}*/}
				{/*placeholder={ __( 'Add notes to your recipe.' ) }*/}
				{/*multiline='p'*/}
			{/*/>*/}
			{/*<h4 class="jetpack-recipe-ingredients-title">{ __( 'Ingredients' ) }</h4>*/}
			{/*<RichText*/}
				{/*tagName={'ul'}*/}
				{/*value={props.attributes.ingredients}*/}
				{/*onChange={updateIngredientsAttribute}*/}
				{/*placeholder={ __( 'Add a list of all the ingredients needed.' ) }*/}
				{/*multiline={'li'}*/}
			{/*/>*/}
			{/*<h4 class="jetpack-recipe-directions-title">{ __( 'Directions' ) }</h4>*/}
			{/*<RichText*/}
				{/*tagName={'ol'}*/}
				{/*value={props.attributes.directions}*/}
				{/*onChange={updateDirectionsAttribute}*/}
				{/*placeholder={ __( 'Add some directions.' ) }*/}
				{/*multiline={'li'}*/}
			{/*/>*/}
		</div>;
	},

	// After saving, so this is what appears on the frontend.
	save( props ) {
		return <div class="hrecipe jetpack-recipe" itemscope itemtype="https://schema.org/Recipe">
			<RichText.Content
				tagName={'h3'}
				value={ props.attributes.title}
				className={'jetpack-recipe-title'}
			/>
			<ul class="jetpack-recipe-meta">
				{ props.attributes.servings && <li class="jetpack-recipe-servings" itemprop="recipeYield"><strong>{ __( 'Servings' ) }: </strong>{ props.attributes.servings }</li> }
				{ props.attributes.time && <li class="jetpack-recipe-time">
					<time itemprop="totalTime" datetime={ props.attributes.time }><strong>{ __( 'Duration' ) }: </strong>{ props.attributes.time }</time>
				</li> }
				{ props.attributes.difficulty && <li class="jetpack-recipe-difficulty"><strong>{ __( 'Difficulty' ) }: </strong>{ props.attributes.difficulty }</li> }
				{ props.attributes.print && <li class="jetpack-recipe-print"><a href="#">{ __( 'Print' ) }</a></li> }
			</ul>
			<InnerBlocks.Content
				template={ getImageTemplate() }
			/>
			{/*{ props.attributes.notes &&*/}
				{/*<div class="jetpack-recipe-notes">*/}
					{/*<h4 class="jetpack-recipe-notes-title">{ __( 'Notes' ) }</h4>*/}
					{/*<RichText.Content*/}
						{/*value={props.attributes.notes}*/}
					{/*/>*/}
				{/*</div>*/}
			{/*}*/}
			{/*{ props.attributes.ingredients &&*/}
				{/*<div class="jetpack-recipe-ingredients">*/}
					{/*<h4 class="jetpack-recipe-ingredients-title">{ __( 'Ingredients' ) }</h4>*/}
					{/*<RichText.Content*/}
						{/*tagName={'ul'}*/}
						{/*value={props.attributes.ingredients}*/}
					{/*/>*/}
				{/*</div>*/}
			{/*}*/}
			{/*{ props.attributes.directions &&*/}
				{/*<div class="jetpack-recipe-directions">*/}
					{/*<h4 class="jetpack-recipe-directions-title">{ __( 'Directions' ) }</h4>*/}
					{/*<RichText.Content*/}
						{/*tagName={'ol'}*/}
						{/*value={props.attributes.directions}*/}
					{/*/>*/}
				{/*</div>*/}
			{/*}*/}
		</div>;
	}
});
