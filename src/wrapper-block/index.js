/**
 * BLOCK: e2e-tests-example/wrapper-block
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	Fragment, // Used to wrap our edit component and only have one root element
} = wp.element;
const {
	InnerBlocks, // Allows it to place child blocks inside our block
	InspectorControls, // We place our select control inside the inspector contorls which show up on the right of the editor
	BlockControls,
	AlignmentToolbar,
} = wp.blockEditor;
const {
	PanelBody, // A panel where we place our select control in (creates a colapsable element)
	SelectControl, // Our select control to choose the background color
	CheckboxControl,
} = wp.components;
const {
	applyFilters,
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
						initialOpen={ true }
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
						initialOpen={ true }
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
					style={ {
						backgroundColor: bgColor,
						marginBottom: marginBottom ? '60px' : null,
					} }
				>
					<InnerBlocks />
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			bgColor = '',
			marginBottom = false,
		} = attributes;

		const styles = {};

		// Only set attributes when background color is chosen
		if ( '' !== bgColor ) {
			styles.backgroundColor = bgColor;
		}
		if ( marginBottom ) {
			styles.marginBottom = '60px';
		}

		return (
			<div
				style={ styles }
			>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
