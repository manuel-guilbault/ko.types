#Get started
##Conversion
Let's create an observable containing a [moment](http://momentjs.com/) object, then create a bounded
converter to format the value using LL format (long date), for french culture (see [moment doc](http://momentjs.com/docs/#/displaying/format/) for other formats).

```javascript
var date = ko.observable(moment());
var viewModel = {
    date: date,
    displayDate: date.extend({ convert: { fromType: 'moment', toType: 'string', format: 'LL', language: 'fr' } })
};
ko.applyBindings(viewModel);
```

Now whatever moment value you write to ```viewModel.date```, ```viewModel.displayDate```'s value will be this moment converted to string. Of course, change notifications are propagated, which means that any subscriptions listening to ```viewModel.displayDate``` will be notified if ```viewModel.date``` changes.

But wait - there's more! Converter observables work both ways, so you can bind an input to ```viewModel.displayDate```, and use the parsed value by reading ```viewModel.date```.

There's a bunch of built-in [converters](Converters), check them out.

Also, check the [knockout validation integration](ko.validation) for automatic error messages when a conversion error occurs.

##Type restrictions
When writing reusable modules, it might be a good idea in some circumstances to prevent users (that is, developers using your piece of code) from using the wrong type on the wrong observable. The type extender does this. Simply extend an observable for a given type:
```javascript
var viewModel = {
    date: ko.observable().extend({ type: 'moment' })
};
```
Try to set a moment object to ```viewModel.date```: everything's fine. Try to set anything else (except ```null``` or ```undefined```, which are okay) and a TypeError will be thrown.

As a bonus, if you create a converter observable from a type-restricted observable, you don't need to specify the ```fromType``` argument: the ```convert``` extender will detect it automatically.

There's a bunch of built-in [types](Types), check them out.

##API
Check the [API](API).
