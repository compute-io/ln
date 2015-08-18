'use strict';

// MODULES //

var LN = require( './number.js' );


// NATURAL LOGARITHM //

/**
* FUNCTION: ln( out, arr )
*	Computes an element-wise natural logarithm (base e).
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function ln( y, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		y[ i ] = LN( x[ i ] );
	}
	return y;
} // end FUNCTION ln()


// EXPORTS //

module.exports = ln;
