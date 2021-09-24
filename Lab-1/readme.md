> # *Creational Design Patterns*
>
> FAF 192 Y3-S1
>
> Pasecinic Nichita

In this laboratory work was studied creational design patterns. 

**Singleton** is a creational design pattern, which ensures that only one object of its kind exists and provides a single point of access to it for any other code. Singleton has almost the same pros and cons as global variables. Although they’re super-handy, they break the modularity of your code.

**Builder** is a creational design pattern, which allows constructing complex objects step by step. Unlike other creational patterns, Builder doesn’t require products to have a common interface. That makes it possible to produce different products using the same construction process.

**Prototype** is a creational design pattern that allows cloning objects, even complex ones, without coupling to their specific classes. All prototype classes should have a common interface that makes it possible to copy objects even if their concrete classes are unknown. Prototype objects can produce full copies since objects of the same class can access each other’s private fields.

**Factory method** is a creational design pattern which solves the problem of creating product objects without specifying their concrete classes. Factory Method defines a method, which should be used for creating objects instead of direct constructor call (`new` operator). Subclasses can override this method to change the class of objects that will be created.

**Abstract Factory** is a creational design pattern, which solves the problem of creating entire product families without specifying their concrete classes. Abstract Factory defines an interface for creating all distinct products but leaves the actual product creation to concrete factory classes. Each factory type corresponds to a certain product variety.

​	For the sample project was implemented singleton, builder and factory method patterns. Singleton class is represented by the `Logger` class which main method is saving a timestamped log message to `log.log` file. The logger was used as a singleton because is not needed multiple instances of it and to maintain consistency in our log management. A private constructor will for Logger will make impossible to use  the `new` keyword to create a new instance of Logger, the static method `getInstance()` returns the only one instance of it / or creates it if it is the first call.

```javascript
public static getInstance(): Logger {
        if (!Logger._instance) {
            Logger._instance = new Logger();
        }
        return Logger._instance;
    }
```

​	The `RestaurantBuilder` represents the builder class for `Restaurant` and contains a bunch of private attributes and getter / setter for them. Once called `.build()` method on a builder instance it will return a new instance of `Restaurant` with all configurations from the context of builder class. The Restaurant class has as well some getters for attributes for logging purposes.  A builder class can be used like so:

```javascript
const r = new RestaurantBuilder()
	.setName("Name")
	.addCook("cook1")
	.addTable(1)
	.addCook("cook2")
	.addTable(2)
	.addWaiter("waiter1")
	.addWaiter("waiter2")
	.build()
```

​	The `FoodFactory` class implements the simple Factory method, which creates a new instance of a concreate product by a given parameter, either it is vegetable or meat. Can be used like so:

```javascript
const foodFactory = new FoodFactory();
const someMeat = foodFactory.spiceType("meat")
someMeat.prepare("chichen")
const someVegetable = foodFactory.spiceType("vegetable")
someVegetable.prepare("salad")

```

All of the classes above can be tested in a CLI. There is the option of creating multiple restaurants using the builder method, listing all of created restaurants and invoking some some food factory methods on them in order to prepare food and all of the actions done in command prompt will be saved and logged in the file log.log 

#### run locally

```bash
$ git clone https://github.com/nichitaa/SDTM-Labs
$ npm install # or yarn install
$ npm start # yarn start
```



![gif](https://github.com/nichitaa/SDTM-Labs/blob/main/Lab-1/gif/gif.gif)