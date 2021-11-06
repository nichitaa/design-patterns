/// <reference path="singleton.ts" />
const fs = require('fs');
const path = require('path');

namespace SingletonPattern {
    export namespace Demo {
        // used for displaying the pattern code for cli
        export const codePathName = '../domain/singleton/singleton.ts';

        export const demo = (): void => {
            const s1 = SingletonPattern.Singleton.getInstance();
            const s2 = SingletonPattern.Singleton.getInstance();

            console.log('\nSingleton Pattern Demo!');

            if (s1 === s2) {
                console.log('Singleton 1 and 2 share the same instance\n');
            } else {
                console.log('Singleton 1 and 2 are actually not singletons\n');
            }
        };
    }
}