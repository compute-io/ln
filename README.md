Natural Logarithm
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm).

The [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm) is defined for any positive real number as

<div class="equation" align="center" data-raw-text="\quad \log \left( x \right) = y \quad \text{s.t.} \quad e^y = x" data-equation="eq:natural_logarithm">
	<img src="https://cdn.rawgit.com/compute-io/log/c732d977e749c3b2f625351eb729fde11d8dca4e/docs/img/eqn.svg" alt="Equation for the natural logarithm.">
	<br>
</div>

In JavaScript, `log(0) = -Infinity`. For negative numbers, the [natural logarithm](https://en.wikipedia.org/wiki/Square_root) is __not__ defined.



## Installation

``` bash
$ npm install compute-log
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var log = require( 'compute-log' );
```

#### log( x[, opts] )

Computes an element-wise (natural logarithm)[https://en.wikipedia.org/wiki/Natural_logarithm). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = log( Math.pow( Math.E, 3 ) );
// returns 3

out = log( -9 );
// returns NaN

data = [ 3, 7, 9 ];
out = log( data );
// returns [ ~1.0986, ~1.7918 , ~2.1972 ]

data = new Int8Array( data );
out = log( data );
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

out = log( mat );
/*
	[ -Infinity 0
	  0.6931    1.0986
	  1.3863    1.6094 ]
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

var out = log( data, {
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


var out = log( data, 'x|1', '|' );
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

out = log( data, {
	'dtype': 'int32'
});
// returns Int32Array( [1,1,2 ] )

// Works for plain arrays, as well...
out = log( [ 3, 7, 9 ], {
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

out = log( data, {
	'copy': false
});
// returns [ ~1.0986, ~1.7918 , ~2.1972 ]

bool = ( data === out );
// returns true

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

out = log( mat, {
	'copy': false
});
/*
	[ -Infinity 0
	  0.6931    1.0986
	  1.3863    1.6094 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm) is `NaN`.

	``` javascript
	var data, out;

	out = log( null );
	// returns NaN

	out = log( true );
	// returns NaN

	out = log( {'a':'b'} );
	// returns NaN

	out = log( [ true, null, [] ] );
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

	out = log( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = log( data, {
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
	var out = log( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	log = require( 'compute-log' );

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
out = log( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = log( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = log( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
out = log( data );

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = log( mat );

// Matrices (custom output data type)...
out = log( mat, {
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


[npm-image]: http://img.shields.io/npm/v/compute-log.svg
[npm-url]: https://npmjs.org/package/compute-log

[travis-image]: http://img.shields.io/travis/compute-io/log/master.svg
[travis-url]: https://travis-ci.org/compute-io/log

[coveralls-image]: https://img.shields.io/coveralls/compute-io/log/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/log?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/log.svg
[dependencies-url]: https://david-dm.org/compute-io/log

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/log.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/log

[github-issues-image]: http://img.shields.io/github/issues/compute-io/log.svg
[github-issues-url]: https://github.com/compute-io/log/issues
