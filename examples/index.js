'use strict';

var matrix = require( 'dstructs-matrix' ),
	ln = require( './../lib' );

var data,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*1000 );
}
out = ln( data );
console.ln( 'Arrays: %s\n', out );


// ----
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
console.ln( 'Accessors: %s\n', out );


// ----
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
console.ln( 'Deepset:');
console.dir( out );
console.ln( '\n' );


// ----
// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
tmp = ln( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}
console.ln( 'Typed arrays: %s\n', out );


// ----
// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = ln( mat );
console.ln( 'Matrix: %s\n', out.toString() );


// ----
// Matrices (custom output data type)...
out = ln( mat, {
	'dtype': 'uint8'
});
console.ln( 'Matrix (%s): %s\n', out.dtype, out.toString() );
