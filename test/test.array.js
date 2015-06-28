/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	log = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array log', function tests() {

	it( 'should export a function', function test() {
		expect( log ).to.be.a( 'function' );
	});

	it( 'should compute the natural logarithm', function test() {
		var data, actual, expected;

		data = [
			Math.pow( Math.E, 4 ),
			Math.pow( Math.E, 6 ),
			Math.pow( Math.E, 9 ),
			Math.pow( Math.E, 15 ),
			Math.pow( Math.E, 10 ),
			Math.pow( Math.E, 25 )
		];
		actual = new Array( data.length );

		actual = log( actual, data );
		expected = [ 4, 6, 9, 15, 10, 25 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( log( [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = log( actual, data );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
