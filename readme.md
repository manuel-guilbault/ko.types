#Knockout Types
A knockout plugin for restricting observables types and bind observables for automatic value type conversion.

Author: [Manuel Guilbault](https://github.com/manuel-guilbault)

License: [MIT](http://www.opensource.org/licenses/mit-license.php)

<!---
###NuGet: [ko.types](http://nuget.org/packages/ko.types)
###NPM: [ko.types](https://npmjs.org/package/ko.types)
-->

It can be sometimes painfull to have to deal with type conversion with knockout. For example, it is sometimes
impossible to use the ko.mapping plugin on some viewmodels, because you want to pass the result to an AJAX
call, and you need to make sure some properties are converted to the right type before being serialized
as JSON. This plugin makes it easy to make some observables type-safe, and also allows you to easily
wrap converter observables around your type-safe observables.

##Getting Started
```javascript
//enforce an observable's value type to [moment](http://momentjs.com/) objects
var value = ko.observable(moment()).extend({ type: "moment" });
value(moment().add('days', -1)); // value() will return yesterday's date
value("test"); // throws a TypeError exception

//create a string converter bound to the type-safe observable, formatting with LT (local time).
//No need to specify the source type; it is detected from the type-safe observable.
var converted = value.extend({ convert: { toType: "string", format: "LT" } });
converted(); // returns current time as a string

//read converted value
value(moment().add('hour', 1));
converted(); // returns current time plus one hour as a string

//write converted value
converted("test"); // update is not propagated, because "test" is invalid
converted("3:05 AM"); // value() returns today at 3:05 AM, as a moment object
```

Check the [wiki](https://github.com/manuel-guilbault/ko.types/wiki) for more.