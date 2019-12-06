/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
	getEditedPostContent,
	insertBlock,
	enablePageDialogAccept,
} from '@wordpress/e2e-test-utils';
import {
	selectBlockByName,
	selectOption,
} from './helper';

describe( 'wrapper block filters', () => {
	beforeAll( async () => {
		enablePageDialogAccept();
		await activatePlugin( 'e2e-tests-example-wrapper-block-filters' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'e2e-tests-example-wrapper-block-filters' );
	} );

	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'e2eTestsExample.wrapperBlock.bgColorOptions should add bg options', async () => {
		await insertBlock( 'Wrapper Block' );
		await selectBlockByName( 'e2e-tests-example/wrapper-block' );

		// Additional style option should be available
		expect( await page.$( 'select.components-select-control__input > option[value="green"]' ) ).not.toBeNull();

		// Style option should be applied
		await selectOption( 'Background Color', 'green' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
