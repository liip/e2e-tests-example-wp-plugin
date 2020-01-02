/**
 * BLOCK: e2e-tests-example/wrapper-block
 */

const { __ } = wp.i18n; // Translate function
const { registerBlockType } = wp.blocks; // Function to register our block
const {
	Fragment, // Used to wrap our edit component and only have one root element
} = wp.element;
const {
	InnerBlocks, // Allows it to place child blocks inside our block
	InspectorControls, // We place our select control inside the inspector controls which show up at the right side of the editor
	AlignmentToolbar, // This is the alignment toolbar to select the alignment of the block content
	BlockControls, // We place our alignment toolbar inside the block controls which show up above the selected block
} = wp.blockEditor;
const {
	PanelBody, // A panel where we place our select control in (creates a collapsible element)
	SelectControl, // Our select control to choose the background color
	CheckboxControl, // We use the checkbox control to enable the margin bottom
} = wp.components;
const {
	applyFilters, // We use this function to make the background color options filterable
} = wp.hooks;

let bgColorOptions = [
	{
		value: '',
		label: __( 'No Background Color', 'e2e-tests-example' ),
	},
	{
		value: 'paleturquoise',
		label: __( 'Light Blue', 'e2e-tests-example' ),
	},
	{
		value: 'orange',
		label: __( 'Orange', 'e2e-tests-example' ),
	},
];
bgColorOptions = applyFilters( 'e2eTestsExample.wrapperBlock.bgColorOptions', bgColorOptions );

const prepareStyles = ( bgColor, alignment, marginBottom ) => {
	return {
		backgroundColor: bgColor && bgColor !== '' ? bgColor : null,
		marginBottom: marginBottom ? '60px' : null,
		textAlign: alignment && alignment !== '' ? alignment : null,
	};
};

registerBlockType( 'e2e-tests-example/wrapper-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Wrapper Block', 'e2e-tests-example' ), // Block title.
	icon: 'editor-table', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Wrapper Block', 'e2e-tests-example' ),
	],

	attributes: {
		// Register bgColor attribute to save the chosen color
		bgColor: {
			type: 'string',
		},
		alignment: {
			type: 'string',
		},
		marginBottom: {
			type: 'boolean',
		},
	},

	edit( { attributes, setAttributes, className } ) {
		const {
			bgColor = '',
			alignment = '',
			marginBottom = false,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Background Color', 'e2e-tests-example' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Background Color', 'e2e-tests-example' ) }
							value={ bgColor }
							options={ bgColorOptions }
							onChange={ ( selectedOption ) => setAttributes( { bgColor: selectedOption } ) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Margin bottom', 'e2e-tests-example' ) }
						initialOpen={ false }
					>
						<CheckboxControl
							label={ __( 'Add margin bottom', 'e2e-tests-example' ) }
							checked={ marginBottom }
							onChange={ ( isChecked ) => setAttributes( { marginBottom: isChecked } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						label={ __( 'Change wrapper block alignment', 'e2e-tests-example' ) }
						onChange={ ( newAlignment ) => ( setAttributes( { alignment: newAlignment } ) ) }
					/>
				</BlockControls>
				<div
					className={ className }
					style={ prepareStyles( bgColor, alignment, marginBottom ) }
				>
					<InnerBlocks />
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			bgColor = '',
			alignment = '',
			marginBottom = false,
		} = attributes;

		return (
			<div
				style={ prepareStyles( bgColor, alignment, marginBottom ) }
			>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
