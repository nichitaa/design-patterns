/// <reference path="proxy.ts" />

namespace ProxyPattern {
    export namespace Demo {
        export const codePathName = '../domain/proxy/proxy.ts';

        export const demo = (): void => {
            const proxy: ProxyPattern.Proxy = new ProxyPattern.Proxy('proxy1');

            console.log(`\nProxy Pattern Demo!\n`);
            console.log('proxy response:', proxy.getUserData('badToken'));
            console.log('proxy response:', proxy.getUserData('securedToken'));
            console.log('proxy response:', proxy.getUserData('securedToken'));
            console.log('proxy response:', proxy.getUserData('securedToken'));
            console.log();
        };
    }
}