/// <reference path="observer.ts" />

namespace ObserverPattern {
    export namespace Demo {
        export const codePathName = '../domain/observer/observer.ts';

        export const demo = (): void => {

            /**
             * Our Subject
             */
            const tradingPlatform = new ObserverPattern.TradingPlatform();

            /**
             * Our Observers
             */
            const walletDashboard = new ObserverPattern.WalletDashboard(tradingPlatform);
            const newsApp = new ObserverPattern.NewsApp(tradingPlatform);

            console.log('\nObserver Pattern Demo!\n');

            tradingPlatform.setBTCUSDPrice(50000);
            tradingPlatform.setBTCUSDPrice(65000);

            console.log();
        };
    }
}