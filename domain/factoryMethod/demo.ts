/// <reference path="factoryMethod.ts"/>

namespace FactoryMethodPattern {
    export namespace Demo {
        export const codePathName = '../domain/factoryMethod/factoryMethod.ts';

        export const demo = (): void => {
            const meatFood: FactoryMethodPattern.IFood = FactoryMethodPattern.FoodFactory.createFood(FoodTypesEnum.MEAT, 'Chicken', 2000);
            const vegetableFood: FactoryMethodPattern.IFood = FactoryMethodPattern.FoodFactory.createFood(FoodTypesEnum.VEGETABLE, 'Salad', 1000);

            console.log('\nFactory Method Pattern!\n');
            console.log('Factory food preparation');
            meatFood.prepare();
            vegetableFood.prepare();
            console.log();
        };
    }
}