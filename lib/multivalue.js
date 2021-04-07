'use strict';

function isMultivalue( value, prefix )
{
    return ![...Object.keys( value )].find( k => !k.startsWith( prefix ));
}

function getValue( value, scope, prefix )
{
    for( let entry of scope )
    {
        if( value.hasOwnProperty( prefix + entry ))
        {
            return value[ prefix + entry ];
        }
    }
}

function resolve( data, scope, prefix, replacer )
{
    //console.log( 'resolve', data );

    if( replacer )
    {
        let replaced = replacer( data );

        if( replaced !== undefined ){ return replaced }
    }

    if( data && typeof data === 'object' )
    {
        if( Array.isArray( data ))
        {
            let arr = data; data = new Array( data.length );

            for( let i = 0; i < arr.length; ++i )
            {
                data[i] = resolve( arr[i], scope, prefix, replacer );
            }
        }
        else
        {
            isMultivalue( data, prefix ) && ( data = getValue( data, scope, prefix ));

            if( data && typeof data === 'object' )
            {
                if( Array.isArray( data ))
                {
                    data = resolve( data, scope, prefix );
                }
                else
                {
                    let obj = data; data = {};

                    for( let property in obj )
                    {
                        //console.log( 'property', property );

                        data[property] = resolve( obj[property], scope, prefix, replacer );
                    }
                }
            }
        }
    }

    return data;
}

function get( data, path, scope, prefix = '_', replacer )
{
    let value = data;

    if( !Array.isArray( path ))
    {
        value = value[ path ];
    }
    else
    {
        for( let node of path )
        {
            // TODO asi aj tu replacer

            isMultivalue( value, prefix ) && ( value = getValue( value, scope, prefix ));

            value = value[ node ];
        }
    }

    return resolve( value, scope, prefix, replacer );
}

module.exports.isMultivalue = isMultivalue;
module.exports.resolve = resolve;
module.exports.get = get;