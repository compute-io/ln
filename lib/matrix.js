'use strict';

// MODULES //

var LN = require( './number.js' );


// NATURAL LOGARITHM //

/**
* FUNCTION: ln( out, matrix )
*	Computes an element-wise natural logarithm (base e).
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix} output matrix
*/
function ln( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( 'ln()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = LN( x.data[ i ] );
	}
	return y;
} // end FUNCTION ln()


// EXPORTS //

module.exports = ln;
