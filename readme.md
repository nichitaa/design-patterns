> # *Design Patterns*
>
> FAF 192 Y3-S1
>
> Pasecinic Nichita



The purpose of this laboratory work is studying programming design patterns. This is a cli application with functionality of  running a demo on pattern or displaying the actual implementation for a specific pattern.

To run it:

```bash
$ git clone https://github.com/nichitaa/design-patterns
$ npm install # install dependencies
$ npm start # compile and run the builded version (tsc && node build/index.js)

```

![gif](https://github.com/nichitaa/design-patterns/blob/main/gif/gif1.gif)

### **Creational design patterns**

Creational patterns provide various object creation mechanisms, which increase flexibility and reuse of existing code.

**Singleton** is a creational design pattern, which ensures that only one object of its kind exists and provides a single point of access to it for any other code. Singleton has almost the same pros and cons as global variables. Although they’re super-handy, they break the modularity of your code and it could be implemented as follows:

```typescript
namespace SingletonPattern {
    export class Singleton {
        private static _instance: Singleton;

        private constructor() {}

        public static getInstance(): Singleton {
            if (!Singleton._instance) {
                Singleton._instance = new Singleton();
            }
            return Singleton._instance;
        }
    }
}
```

**Builder** is a creational design pattern, which allows constructing complex objects step by step. Unlike other creational patterns, Builder doesn’t require products to have a common interface. That makes it possible to produce different products using the same construction process. It could be implemented as follows:

```typescript
namespace BuilderPattern {
    export class RestaurantBuilder {
        private readonly name: string;
        private address: string;

        constructor(name: string) {
            this.name = name;
        }

        get Name() {
            return this.name;
        }

        setAddress(val: string) {
            this.address = val;
            return this;
        }

        get Address() {
            return this.address;
        }

        // ... other attributes
        
        build(): Restaurant {
            return new Restaurant(this);
        }
    }

    export class Restaurant {
        private readonly name: string;
        private readonly address: string;
        private readonly rating: number;
        private readonly cooksNo: number;
        private readonly waitersNo: number;

        constructor(builder: RestaurantBuilder) {
            this.name = builder.Name;
            this.address = builder.Address;
            this.rating = builder.Rating;
            this.cooksNo = builder.CooksNo;
            this.waitersNo = builder.WaitersNo;
        }

        get Name() {
            return this.name;
        }
        // ... other attributes
    }
}
```

**Factory method** is a creational design pattern which solves the problem of creating product objects without specifying their concrete classes. Factory Method defines a method, which should be used for creating objects instead of direct constructor call (`new` operator). Subclasses can override this method to change the class of objects that will be created. It could be implemented as follows:

```typescript
namespace FactoryMethodPattern {

    /***
     * Types of food in our Food factory
     * */
    export enum FoodTypesEnum {
        MEAT = 'MEAT',
        VEGETABLE = 'VEGETABLE'
    }

    /***
     * Abstract interface of a concrete product (food) from our factory
     * */
    export interface IFood {
        name: string;
        preparationTime: number;
        type: FoodTypesEnum;

        prepare(args?: any): void;
    }

    /***
     * The method on both Concrete products will do the same thing, so we can use inheritance
     * where Food class implements the Abstract product (IFood)
     * */
    export class Food implements IFood {
        name: string;
        preparationTime: number;
        type: FoodTypesEnum;

        constructor(name: string, time: number, type: FoodTypesEnum) {
            this.name = name;
            this.preparationTime = time;
            this.type = type;
        }

        prepare(args?: any): void {
            console.log(`${this.type} Food: ${this.name} was prepared in: ${this.preparationTime} time units.`);
        }
    }

    /***
     * Concrete products
     * */
    export class VegetableFood extends Food {
        constructor(name: string, time: number, type: FoodTypesEnum) {
            super(name, time, type);
        }
    }

    export class MeatFood extends Food {
        constructor(name: string, time: number, type: FoodTypesEnum) {
            super(name, time, type);
        }
    }

    /***
     * Our Food Factory
     * */
    export namespace FoodFactory {
        export const createFood = (type: FoodTypesEnum, name: string, time: number) => {
            switch (type) {
                case FactoryMethodPattern.FoodTypesEnum.MEAT: {
                    return new MeatFood(name, time, type);
                }
                case FoodTypesEnum.VEGETABLE: {
                    return new VegetableFood(name, time, type);
                }
                default: {
                    throw new Error(`No such food type: ${type}`);
                }
            }
        };
    }
}
```



### **Structural design patterns**

In software engineering, the Structural Design Patterns are concerned with how classes and objects are composed to form larger structures. Structural class patterns use inheritance to create a hierarchy of classes/abstractions, but the structural object patterns use composition which is generally a more flexible alternative to inheritance.

**Facade** is a structural design pattern that provides a simplified (but limited) interface to a complex system of classes, library or framework and it could be implemented as follows:

```typescript
namespace FacadePattern {
    export interface IShape {
        draw(): string;
    }

    class Square implements IShape {
        public draw(): string {
            return 'square - ⬜';
        }
    }

    class Circle implements IShape {
        public draw(): string {
            return 'circle - ◯';
        }
    }

    export class ShapeFacade {
        private circle: Circle;
        private square: Square;

        constructor() {
            this.circle = new Circle();
            this.square = new Square();
        }

        public drawCircle(): string {
            return this.circle.draw();
        }

        public drawSquare(): string {
            return this.square.draw();
        }
        
        // ... other facade parts methods
    }

}
```

**Adapter** is a structural design pattern, which allows incompatible objects to collaborate. The Adapter acts as a wrapper between two objects. It catches calls for one object and transforms them to format and interface recognizable by the second object. It could be implemented as follows:

```typescript
namespace AdapterPattern {
    export interface ITarget {
        getMessage(): string;
    }

    export class Target implements ITarget {
        getMessage(): string {
            return 'Default message from Target class';
        }
    }

    export class Adaptee {
        public getAdapteeMessage() {
            return 'Message from adaptee: zdarova';
        }
    }

    export class Adapter extends Target {
        private _adaptee: Adaptee;

        constructor(adaptee: Adaptee) {
            super();
            this._adaptee = adaptee;
        }

        public getMessage(): string {
            const result = this._adaptee.getAdapteeMessage().toUpperCase()
            return `Adapter Upper case message: ${result}`
        }
    }
}
```

**Proxy** is a structural design pattern that provides an object that acts as a substitute for a real service object used by a client. A proxy receives client requests, does some work (access control, caching, etc.) and then passes the request to a service object. It could be implemented as follows:

```typescript
namespace ProxyPattern {

    export interface IService {
        getUserData(params?: any): void;
    }

    /***
     * Real subject (service) the proxy will redirect to
     * */
    export class SensitiveUserService implements IService {
        getUserData() {
            return {'username': 'nichitaa', 'password': 'strongPassword', 'university': 'UTM'};
        }
    }

    /***
     * Proxy with simple auth / load balance / caching
     * */
    export class Proxy implements IService {
        private readonly proxyName: string;
        private userService: SensitiveUserService;
        private limit: number; // max number of requests
        private cachedData: any;

        constructor(name: string) {
            this.proxyName = name;
            this.userService = new SensitiveUserService();
            this.limit = 2;
            this.cachedData = null;
        }

        getUserData(authToken: string) {
            if (this.checkAuth(authToken)) {
                if (this.loadBalance()) {
                    if (this.cache()) {
                        // all checks have passed, do redirect to the real service
                        this.cachedData = this.userService.getUserData();
                        return this.cachedData;
                    } else {
                        return this.cachedData;
                    }
                } else {
                    return `[${this.proxyName}] No more available requests`;
                }
            } else {
                return `[${this.proxyName}] Not Authorized`;
            }
        }

        cache() {
            return !this.cachedData;
        }

        loadBalance() {
            if (this.limit === 0) return false;
            else {
                this.limit--;
                return true;
            }
        }

        checkAuth(token: string) {
            return token === 'securedToken';
        }
    }
}
```

### **Behavioral design patterns**

In software engineering, behavioral design patterns have the purpose of identifying common communication patterns between different software entities. By doing so, these patterns increase flexibility in carrying out this communication.

**Iterator** is a behavioral design pattern that allows sequential traversal through a complex data structure without exposing its internal details.

```typescript
namespace IteratorPattern {

    interface Iterator<ItemType, ReturnType> {
        /**
         * @returns the item at current position
         */
        current(): ItemType;

        /**
         * @returns the item following the logic described below
         */
        next(): ReturnType;

        /**
         * @returns the current position
         */
        key(): number;

        /**
         * @returns boolean value, true if in collection are still more items
         * to be traversed, else returns false and resets the current position
         */
        valid(): boolean;

        /**
         * @returns void resets the position to initial
         */
        rewind(): void;
    }

    interface Aggregator<ItemType, ReturnType> {
        getIterator(): Iterator<ItemType, ReturnType>;
    }

    /**
     * Concrete implementation
     */
    interface IteratorItem {
        type: 'string' | 'number' | 'idk',
        value?: string | number
    }

    interface IteratorReturn {
        idx: number;
        val: IteratorItem['value'];
    }

    /**
     * Logic for this CustomIterator is straightforward,
     * it will just skip the elements with type: 'idk' in collection,
     * and additional it will type check the value of the item property
     * to match the specified type
     */
    export class CustomIterator implements Iterator<IteratorItem, IteratorReturn> {
        private position: number = 0;

        constructor(private collection: CustomCollection) {}

        current(): IteratorItem {
            return this.collection.getItems()[this.position];
        }

        key(): number {
            return this.position;
        }

        next(): IteratorReturn {
            const item = this.collection.getItems()[this.position];
            switch (item.type) {
                case 'string': {
                    if (item.value && typeof item.value !== 'string') {
                        throw new Error(`Type is string but was given the value: ${item.value}`);
                    }
                    break;
                }
                case 'number': {
                    if (item.value && typeof item.value !== 'number') {
                        throw new Error(`Type is number but was given the value: ${item.value}`);
                    }
                    break;
                }
                case 'idk': {
                    // skip items with 'idk' types
                    this.position++;
                    return this.next();
                }
                default: {
                    throw new Error(`Unhandled type: ${item.type}`);
                }
            }
            const res = {idx: this.position, val: item.value};
            this.position++;
            return res;
        }

        rewind(): void {
            this.position = 0;
        }

        valid(): boolean {
            const exists = this.position < this.collection.getCount();
            if (exists) {
                return exists;
            } else {
                this.rewind();
                return exists;
            }
        }
    }

    /**
     * A CustomCollection that can use the CustomIterator logic to
     * iterate in collection items
     */
    export class CustomCollection implements Aggregator<IteratorItem, IteratorReturn> {
        private items: IteratorItem[] = [];

        public getItems(): IteratorItem[] {
            return this.items;
        }

        public getCount(): number {
            return this.items.length;
        }

        public add(item: IteratorItem): void {
            this.items.push(item);
        }

        public getIterator(): Iterator<IteratorItem, IteratorReturn> {
            return new CustomIterator(this);
        }

    }
}
```

**Observer** pattern provides a way to subscribe and unsubscribe to and from these events for any object that implements a subscriber interface.

```typescript
namespace ObserverPattern {
    interface Subject {
        registerObserver(o: Observer);

        removeObserver(o: Observer);

        notifyObservers();
    }

    interface Observer {
        update(course: number);
    }

    /**
     * Our Subject class that will be providing the current price of BTC_USD
     */
    export class TradingPlatform implements Subject {
        private observers: Observer[] = [];

        private BTC_USD: number;

        setBTCUSDPrice(price: number) {
            console.log(`[live] BTC-USD: ${price}`);
            this.BTC_USD = price;
            this.notifyObservers();
        }

        registerObserver(o: Observer) {
            this.observers.push(o);
        }

        removeObserver(o: Observer) {
            const idx = this.observers.indexOf(o);
            this.observers.splice(idx, 1);
        }

        notifyObservers() {
            for (let o of this.observers) {
                o.update(this.BTC_USD);
            }
        }
    }

    /**
     * Our Observers that will consume and get notified of the BTC-USD price provided by the Subject
     */
    export class WalletDashboard implements Observer {
        /**
         * @param courseProvider - is the actual TradingPlatform in this example
         */
        constructor(private courseProvider: Subject) {
            this.courseProvider.registerObserver(this);
        }

        update(BTC_USD_Price: number) {
            if (BTC_USD_Price > 60000) {
                console.log('BTC price is higher then 60k$, app recommendation is to sell it!');
            } else {
                console.log('BTC course is less then 60k$, app recommendation is to buy it!');
            }
        }
    }

    export class NewsApp implements Observer {
        constructor(private courseProvider: Subject) {
            this.courseProvider.registerObserver(this);
        }

        update(BTC_USD_Price: number) {
            console.log(`Breaking NEWS: Is Bitcoin real money ? it is ${BTC_USD_Price}$ now!`);
        }
    }
}
```

