/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	log = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset log', function tests() {

	it( 'should export a function', function test() {
		expect( log ).to.be.a( 'function' );
	});

	it( 'should compute the principal square root and deep set', function test() {
		var data, expected;

		data = [
			{'x': Math.pow( Math.E, 4 ) },
			{'x': Math.pow( Math.E, 6 ) },
			{'x': Math.pow( Math.E, 9 ) },
			{'x': Math.pow( Math.E, 15 ) },
			{'x': Math.pow( Math.E, 10 ) },
			{'x': Math.pow( Math.E, 25 ) }
		];

		data = log( data, 'x' );
		expected = [
			{'x':4},
			{'x':6},
			{'x':9},
			{'x':15},
			{'x':10},
			{'x':25}
		];

		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,Math.pow( Math.E, 4 )]},
			{'x':[9,Math.pow( Math.E, 6 )]},
			{'x':[9,Math.pow( Math.E, 9 )]},
			{'x':[9,Math.pow( Math.E, 15 )]},
			{'x':[9,Math.pow( Math.E, 10 )]},
			{'x':[9,Math.pow( Math.E, 25 )]}
		];

		data = log( data, 'x/1', '/' );
		expected = [
			{'x':[9,4]},
			{'x':[9,6]},
			{'x':[9,9]},
			{'x':[9,15]},
			{'x':[9,10]},
			{'x':[9,25]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( log( [], 'x' ), [] );
		assert.deepEqual( log( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = log( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
