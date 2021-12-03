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