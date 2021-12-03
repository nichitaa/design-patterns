/// <reference path="iterator.ts" />

namespace IteratorPattern {
    export namespace Demo {
        export const codePathName = '../domain/iterator/iterator.ts';

        export const demo = (): void => {
            const collection = new CustomCollection();
            collection.add({type: 'string', value: 'hello'});
            collection.add({type: 'idk', value: 'skip me'});
            collection.add({type: 'number', value: 1});

            const iterator = collection.getIterator();

            console.log('\nIterator Pattern Demo!\n');

            console.log('First run');
            while (iterator.valid()) {
                const {val, idx} = iterator.next();
                console.log(`Index: ${idx}, Value: ${val}`);
            }

            console.log('Second run');
            while (iterator.valid()) {
                const {val, idx} = iterator.next();
                console.log(`Index: ${idx}, Value: ${val}`);
            }

            console.log();

        };
    }
}