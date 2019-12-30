import {
	activatePlugin,
	deactivatePlugin,
	createNewPost,
	getEditedPostContent,
	insertBlock,
	enablePageDialogAccept,
} from '@wordpress/e2e-test-utils';
import {
	openSidebarPanelWithTitle,
	selectBlockByName,
	selectOption,
	selectOptionIsAvailable,
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

		// Additional background color option should be available
		await openSidebarPanelWithTitle( 'Background Color' );
		expect( await selectOptionIsAvailable( 'Background Color', 'green' ) ).toBe( true );

		// Background color should be applied
		await selectOption( 'Background Color', 'green' );

		// Editor content should match snapshot
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
