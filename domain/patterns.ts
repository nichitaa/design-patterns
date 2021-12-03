/// <reference path="singleton/demo.ts" />
/// <reference path="builder/demo.ts" />
/// <reference path="factoryMethod/demo.ts" />
/// <reference path="adapter/demo.ts" />
/// <reference path="facade/demo.ts" />
/// <reference path="proxy/demo.ts" />
/// <reference path="observer/demo.ts" />
/// <reference path="iterator/demo.ts" />

namespace Patterns {
    interface IPatternObject {
        type: 'Creation DPs' | 'Structural DPs' | 'Behavioral DPs' | 'Exit',
        patterns?: {
            name: string,
            pattern?: any
        }[]
    }

    export const patterns: IPatternObject[] = [{
        type: 'Creation DPs',
        patterns: [{
            name: 'Singleton',
            pattern: SingletonPattern
        }, {
            name: 'Builder',
            pattern: BuilderPattern
        }, {
            name: 'Factory Method',
            pattern: FactoryMethodPattern
        }, {
            name: 'Back'
        }]
    }, {
        type: 'Structural DPs',
        patterns: [{
            name: 'Adapter',
            pattern: AdapterPattern
        }, {
            name: 'Facade',
            pattern: FacadePattern
        }, {
            name: 'Proxy',
            pattern: ProxyPattern
        }, {
            name: 'Back'
        }]
    }, {
        type: 'Behavioral DPs',
        patterns: [{
            name: 'Observer',
            pattern: ObserverPattern
        }, {
            name: 'Iterator',
            pattern: IteratorPattern
        }, {
            name: 'Back'
        }]
    }, {
        type: 'Exit'
    }];
}