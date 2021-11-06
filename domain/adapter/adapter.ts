
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