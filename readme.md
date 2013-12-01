#Knockout Types
A knockout plugin for restricting observables types and bind observables for automatic value type conversion.

Author: [Manuel Guilbault](https://github.com/manuel-guilbault)

License: [MIT](http://www.opensource.org/licenses/mit-license.php)

<!---
###NuGet: [ko.types](http://nuget.org/packages/ko.types)
###NPM: [ko.types](https://npmjs.org/package/ko.types)
-->

##Getting Started
```javascript
//enforce an observable's value type
var intValue = ko.observable(1).extend({ type: 'integer' });
intValue(12); // intValue() = 12
intValue('test'); // throws a TypeError exception

//create a string converter bound to a type-safe observable
var stringWrapper = intValue.extend({ convert: 'string' });
//or
var stringWrapper = intValue.extend({ convert: { toType: 'string' } });

//read converted value
intValue(99);
stringWrapper(); // gives '99'

//write converted value
stringWrapper('test'); // update is not propagated, because 'test' is invalid
stringWrapper('12!!!'); // intValue() = 12

//create a string converter bound to a type-save observable, using strict parsing
var strictStringWrapper = intValue.extend({ convert: { toType: 'string', strict: true } });
strictStringWrapper('12 !!!'); // update is not propagated, because strict parsing is enabled
strictStringWrapper('12'); // intValue() = 12
```

Check the [wiki](https://github.com/manuel-guilbault/ko.types/wiki) for more.
