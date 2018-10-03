const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, InnerBlocks } = wp.editor;
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
			type: 'bool',
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
			source: 'children',
			selector: 'p',
		},
		ingredients: {
			type: 'string',
			source: 'children',
			selector: 'li',
		},
		directions: {
			type: 'string',
			source: 'children',
			selector: 'li',
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
			</InspectorControls>
			<RichText
				tagName={'h3'}
				value={ props.attributes.title }
				onChange={ updateTitleAttribute }
				placeholder={ __( 'Enter the title of your recipe.' ) }
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
			<InnerBlocks
				template={ getImageTemplate() }
				templateLock="all"
			/>
			<h4 class="jetpack-recipe-notes-title">{ __( 'Notes' ) }</h4>
			<RichText
				value={props.attributes.notes}
				onChange={updateNotesAttribute}
				placeholder={ __( 'Add notes to your recipe.' ) }
				multiline='p'
			/>
			<h4 class="jetpack-recipe-ingredients-title">{ __( 'Ingredients' ) }</h4>
			<RichText
				tagName={'ul'}
				value={props.attributes.ingredients}
				onChange={updateIngredientsAttribute}
				placeholder={ __( 'Add a list of all the ingredients needed.' ) }
				multiline={'li'}
			/>
			<h4 class="jetpack-recipe-directions-title">{ __( 'Directions' ) }</h4>
			<RichText
				tagName={'ol'}
				value={props.attributes.directions}
				onChange={updateDirectionsAttribute}
				placeholder={ __( 'Add some directions.' ) }
				multiline={'li'}
			/>
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
			{ props.attributes.notes &&
				<div class="jetpack-recipe-notes">
					<h4 class="jetpack-recipe-notes-title">{ __( 'Notes' ) }</h4>
					<RichText.Content
						value={props.attributes.notes}
					/>
				</div>
			}
			{ props.attributes.ingredients &&
				<div class="jetpack-recipe-ingredients">
					<h4 class="jetpack-recipe-ingredients-title">{ __( 'Ingredients' ) }</h4>
					<RichText.Content
						tagName={'ul'}
						value={props.attributes.ingredients}
					/>
				</div>
			}
			{ props.attributes.directions &&
				<div class="jetpack-recipe-directions">
					<h4 class="jetpack-recipe-directions-title">{ __( 'Directions' ) }</h4>
					<RichText.Content
						tagName={'ol'}
						value={props.attributes.directions}
					/>
				</div>
			}
		</div>;
	}
});
