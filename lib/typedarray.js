'use strict';

// MODULES //

var LOG = require( './number.js' );


// NATURAL LOGARITHM //

/**
* FUNCTION: log( out, arr )
*	Computes an element-wise natural logarithm (base e).
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function log( y, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		y[ i ] = LOG( x[ i ] );
	}
	return y;
} // end FUNCTION log()


// EXPORTS //

module.exports = log;
