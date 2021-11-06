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