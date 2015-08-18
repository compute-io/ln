'use strict';

// MODULES //

var LN = require( './number.js' );


// NATURAL LOGARITHM //

/**
* FUNCTION: ln( out, arr, accessor )
*	Computes an element-wise natural logarithm using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function ln( y, x, clbk ) {
	var len = x.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = LN( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION ln()


// EXPORTS //

module.exports = ln;
