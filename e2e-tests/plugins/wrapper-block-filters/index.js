/* eslint-disable wrap-iife */
( function() {
	function wrapperBlockFiltersBgColorOptions( bgColorOptions ) {
		return [
			...bgColorOptions,
			{ label: 'Green', value: 'green' },
		];
	}
	wp.hooks.addFilter( 'e2eTestsExample.wrapperBlock.bgColorOptions', 'wrapper-block-filters/e2e-tests-example/wrapper-block/bgColorOptions', wrapperBlockFiltersBgColorOptions );
} )();
