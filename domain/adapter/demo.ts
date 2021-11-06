/// <reference path="adapter.ts" />

namespace AdapterPattern {
    export namespace Demo {
        export const codePathName = '../domain/adapter/adapter.ts';

        export const demo = (): void => {

            console.log('\nAdapter Pattern!\n');
            const target: AdapterPattern.Target = new AdapterPattern.Target();
            console.log(target.getMessage());

            const adaptee: AdapterPattern.Adaptee = new AdapterPattern.Adaptee();
            console.log(adaptee.getAdapteeMessage());

            const adapter: AdapterPattern.Adapter = new AdapterPattern.Adapter(adaptee);
            console.log(`${adapter.getMessage()}\n`);

        };
    }
}