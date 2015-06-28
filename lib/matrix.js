'use strict';

// MODULES //

var LOG = require( './number.js' );


// NATURAL LOGARITHM //

/**
* FUNCTION: log( out, matrix )
*	Computes an element-wise natural logarithm (base e).
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix} output matrix
*/
function log( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( 'log()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = LOG( x.data[ i ] );
	}
	return y;
} // end FUNCTION log()


// EXPORTS //

module.exports = log;
