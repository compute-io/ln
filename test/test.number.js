/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	log = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number log', function tests() {

	it( 'should export a function', function test() {
		expect( log ).to.be.a( 'function' );
	});

	it( 'should compute the natural logarithm', function test() {
		assert.strictEqual( log( 7 ), Math.log( 7 ) );
		assert.strictEqual( log( 90 ), Math.log( 90 ) );
		assert.strictEqual( log( 300 ), Math.log( 300 ) );
		assert.strictEqual( log( 0 ), -Infinity );
	});

	it( 'should return `NaN` if provided with a negative number or zero', function test() {
		var val;

		val = log( -9 );
		assert.isTrue( val !== val );

		val = log( -900 );
		assert.isTrue( val !== val );

		val = log( -81 );
		assert.isTrue( val !== val );
	});

});
