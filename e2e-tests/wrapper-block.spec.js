/**
 * WordPress dependencies
 */
import {
	createNewPost,
	enablePageDialogAccept,
	getEditedPostContent,
	insertBlock,
} from '@wordpress/e2e-test-utils'
import {
	clickElementByText,
	selectBlockByName,
	selectOption,
} from './helper';

describe( 'wrapper block', () => {
	beforeAll( async () => {
		enablePageDialogAccept();
	} );
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'Wrapper block should be available', async () => {
		await insertBlock( 'Wrapper Block' );

		// Check if block was inserted
		expect( await page.$( '[data-type="e2e-tests-example/wrapper-block"]' ) ).not.toBeNull();

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Background color should be applied', async () => {
		await insertBlock( 'Wrapper Block' );
		await selectBlockByName( 'e2e-tests-example/wrapper-block' );

		// Change background color
		await selectOption( 'Background Color', 'orange' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );

	it( 'Margin bottom should be applied', async () => {
		await insertBlock( 'Wrapper Block' );
		await selectBlockByName( 'e2e-tests-example/wrapper-block' );

		// Change background color
		await clickElementByText( 'label', 'Add margin bottom' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
