Natural Logarithm
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm).

The [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm) is defined for any positive real number as

<div class="equation" align="center" data-raw-text="\quad \ln \left( x \right) = y \quad \text{s.t.} \quad e^y = x" data-equation="eq:natural_logarithm">
	<img src="https://cdn.rawgit.com/compute-io/ln/baeb2ee1c23a5da7c050368b6ab5db41ed47bc9c/docs/img/eqn.svg" alt="Equation for the natural logarithm.">
	<br>
</div>

In JavaScript, `log(0) = -Infinity`. For negative numbers, the [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm) is __not__ defined.



## Installation

``` bash
$ npm install compute-ln
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var ln = require( 'compute-ln' );
```

#### ln( x[, opts] )

Computes an element-wise [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = ln( Math.pow( Math.E, 3 ) );
// returns 3

out = ln( -9 );
// returns NaN

data = [ 3, 7, 9 ];
out = ln( data );
// returns [ ~1.0986, ~1.7918 , ~2.1972 ]

data = new Int8Array( data );
out = ln( data );
// returns Float64Array( [~1.0986,~1.7918 ,~2.1972] )

data = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'int16' );
/*
	[  0  1
	   2  3
	   4  5 ]
*/

out = ln( mat );
/*
	[ -Infinity   0
	  ~0.6931    ~1.0986
	  ~1.3863    ~1.6094 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,Math.pow( Math.E, 4 )],
	[1,Math.pow( Math.E, 6 )],
	[2,Math.pow( Math.E, 15 )],
	[3,Math.pow( Math.E, 10 )],
	[4,Math.pow( Math.E, 25 )]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = ln( data, {
	'accessor': getValue
});
// returns [ 4, 6, 15, 10, 25 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,Math.pow( Math.E, 4 )]},
	{'x':[1,Math.pow( Math.E, 6 )]},
	{'x':[2,Math.pow( Math.E, 15 )]},
	{'x':[3,Math.pow( Math.E, 10 )]},
	{'x':[4,Math.pow( Math.E, 25 )]}
];


var out = ln( data, {
	'path': 'x|1',
	'sep': '|'
});
/*
	[
		{'x':[0,4]},
		{'x':[1,6]},
		{'x':[2,15]},
		{'x':[3,10]},
		{'x':[4,25]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [3,7,9] );

out = ln( data, {
	'dtype': 'int32'
});
// returns Int32Array( [1,1,2 ] )

// Works for plain arrays, as well...
out = ln( [ 3, 7, 9 ], {
	'dtype': 'uint8'
});
// returns Uint8Array( [1,1,2] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 3, 7, 9 ];

out = ln( data, {
	'copy': false
});
// returns [ ~1.0986, ~1.7918 , ~2.1972 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[  0  1
	   2  3
	   4  5 ]
*/

out = ln( mat, {
	'copy': false
});
/*
	[ -Infinity  ~0
	  ~0.6931    ~1.0986
	  ~1.3863    ~1.6094 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm) is `NaN`.

	``` javascript
	var data, out;

	out = ln( null );
	// returns NaN

	out = ln( true );
	// returns NaN

	out = ln( {'a':'b'} );
	// returns NaN

	out = ln( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = ln( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = ln( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = ln( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	ln = require( 'compute-ln' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*1000 );
}
out = ln( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = ln( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = ln( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
out = ln( data );

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = ln( mat );

// Matrices (custom output data type)...
out = ln( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-ln.svg
[npm-url]: https://npmjs.org/package/compute-ln

[travis-image]: http://img.shields.io/travis/compute-io/ln/master.svg
[travis-url]: https://travis-ci.org/compute-io/ln

[codecov-image]: https://img.shields.io/codecov/c/github/compute-io/ln/master.svg
[codecov-url]: https://codecov.io/github/compute-io/ln?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/ln.svg
[dependencies-url]: https://david-dm.org/compute-io/ln

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/ln.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/ln

[github-issues-image]: http://img.shields.io/github/issues/compute-io/ln.svg
[github-issues-url]: https://github.com/compute-io/ln/issues
