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