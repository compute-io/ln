/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	ln = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number ln', function tests() {

	it( 'should export a function', function test() {
		expect( ln ).to.be.a( 'function' );
	});

	it( 'should compute the natural logarithm', function test() {
		assert.strictEqual( ln( 7 ), Math.log( 7 ) );
		assert.strictEqual( ln( 90 ), Math.log( 90 ) );
		assert.strictEqual( ln( 300 ), Math.log( 300 ) );
		assert.strictEqual( ln( 0 ), -Infinity );
	});

	it( 'should return `NaN` if provided with a negative number or zero', function test() {
		var val;

		val = ln( -9 );
		assert.isTrue( val !== val );

		val = ln( -900 );
		assert.isTrue( val !== val );

		val = ln( -81 );
		assert.isTrue( val !== val );
	});

});
