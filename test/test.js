const multivalue = require('../lib/multivalue');

const data = 
{
    foo: 
    {
        _en: 'fooEN',
        _de: 'fooDE'
    },
    bar: [{ _en: 'arr1EN', _de: 'arr1DE' }, { a: { _de: 'aDE', _en: 'aEN' }, b: 'b' }]
};

console.log( multivalue.get( data, [], [ 'en', 'GB' ]));
console.log( multivalue.get( data, [ 'bar', '1', 'a' ], [ 'en', 'GB' ]));
console.log( multivalue.get( data, 'bar', [ 'sk', 'SK' ]));