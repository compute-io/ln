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

describe( 'typed-array log', function tests() {

	it( 'should export a function', function test() {
		expect( log ).to.be.a( 'function' );
	});

	it( 'should compute the natural logarithm', function test() {
		var data, actual, expected;

		data = new Float32Array( [
			Math.pow( Math.E, 2 ),
			Math.pow( Math.E, 0 ),
			Math.pow( Math.E, 3 ),
			Math.pow( Math.E, 10 ),
			Math.pow( Math.E, 9 ),
			Math.pow( Math.E, 4 )
		] );
		actual = new Float32Array( data.length );

		actual = log( actual, data );
		expected = new Float32Array( [ 2, 0, 3, 10, 9, 4 ] );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( log( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
