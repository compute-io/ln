/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	log = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-log', function tests() {

	it( 'should export a function', function test() {
		expect( log ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				log( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				log( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				log( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				log( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( log( values[ i ] ) ) );
		}
	});

	it( 'should compute the natural logarithm when provided a number', function test() {
		assert.strictEqual( log( 6 ), Math.log( 6 ) );
		assert.strictEqual( log( 20 ), Math.log( 20 ) );

		assert.isTrue( isnan( log( NaN ) ) );
	});

	it( 'should compute an element-wise natural logarithm when provided a plain array', function test() {
		var data, actual, expected;

		data = [
			Math.pow( Math.E, 4 ),
			Math.pow( Math.E, 6 ),
			Math.pow( Math.E, 9 ),
			Math.pow( Math.E, 15 ),
			Math.pow( Math.E, 10 ),
			Math.pow( Math.E, 25 )
		];
		expected = [ 4, 6, 9, 15, 10, 25 ];

		actual = log( data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate...
		actual = log( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should compute an element-wise natural logarithm when provided a typed array', function test() {
		var data, actual, expected;

		data = new Float64Array( [
			Math.pow( Math.E, 4 ),
			Math.pow( Math.E, 6 ),
			Math.pow( Math.E, 9 ),
			Math.pow( Math.E, 15 ),
			Math.pow( Math.E, 10 ),
			Math.pow( Math.E, 25 )
		] );
		expected = new Float64Array( [ 4, 6, 9, 15, 10, 25 ] );

		actual = log( data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = log( data, {
			'copy': false
		});
		expected = new Float64Array( [ 4, 6, 9, 15, 10, 25 ] );
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should compute an element-wise natural logarithm and return an array of a specific type', function test() {
		var data, actual, expected;

		data = 	[
			Math.pow( Math.E, 4 ),
			Math.pow( Math.E, 6 ),
			Math.pow( Math.E, 9 ),
			Math.pow( Math.E, 15 ),
			Math.pow( Math.E, 10 ),
			Math.pow( Math.E, 25 )
		];
		expected = new Int8Array( [ 4, 6, 9, 15, 10, 25 ] );

		actual = log( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should compute an element-wise natural logarithm using an accessor', function test() {
		var data, actual, expected;

		data = [
			[0,Math.pow( Math.E, 4 )],
			[1,Math.pow( Math.E, 6 )],
			[2,Math.pow( Math.E, 15 )],
			[3,Math.pow( Math.E, 10 )],
			[4,Math.pow( Math.E, 25 )]
		];
		expected = [ 4, 6, 15, 10, 25 ];

		actual = log( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = log( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should compute an element-wise natural logarithm and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[0,Math.pow( Math.E, 4 )]},
			{'x':[1,Math.pow( Math.E, 6 )]},
			{'x':[2,Math.pow( Math.E, 15 )]},
			{'x':[3,Math.pow( Math.E, 10 )]},
			{'x':[4,Math.pow( Math.E, 25 )]}
		];
		expected = [
			{'x':[0,4]},
			{'x':[1,6]},
			{'x':[2,15]},
			{'x':[3,10]},
			{'x':[4,25]}
		];
		actual = log( data, {

			'path': 'x.1'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Specify a path with a custom separator...
		data = [
			{'x':[0,Math.pow( Math.E, 4 )]},
			{'x':[1,Math.pow( Math.E, 6 )]},
			{'x':[2,Math.pow( Math.E, 15 )]},
			{'x':[3,Math.pow( Math.E, 10 )]},
			{'x':[4,Math.pow( Math.E, 25 )]}
		];

		actual = log( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );
	});

	it( 'should compute an element-wise natural logarithm when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		d3 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = Math.log( i );
			d3[ i ] = Math.log( i );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = log( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = log( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should compute an element-wise natural logarithm and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float32Array( 25 );
		d2 = new Int32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = Math.floor( Math.log( i ) );
		}
		mat = matrix( d1, [5,5], 'float32' );
		out = log( mat, {
			'dtype': 'int32'
		});

		assert.strictEqual( out.dtype, 'int32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( log( [] ), [] );
		assert.deepEqual( log( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( log( new Int8Array() ), new Float64Array() );
	});

});
