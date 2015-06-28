/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	log = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor log', function tests() {

	it( 'should export a function', function test() {
		expect( log ).to.be.a( 'function' );
	});

	it( 'should compute the natural logarithm using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x': Math.pow( Math.E, 4 ) },
			{'x': Math.pow( Math.E, 6 ) },
			{'x': Math.pow( Math.E, 9 ) },
			{'x': Math.pow( Math.E, 15 ) },
			{'x': Math.pow( Math.E, 10 ) },
			{'x': Math.pow( Math.E, 25 ) }
		];
		actual = new Array( data.length );

		actual = log( actual, data, getValue );
		expected = [ 4, 6, 9, 15, 10, 25 ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( log( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = log( actual, data, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
