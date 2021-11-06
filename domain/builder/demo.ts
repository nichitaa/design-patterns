/// <reference path="builder.ts" />

namespace BuilderPattern {
    export namespace Demo {
        export const codePathName = '../domain/builder/builder.ts';

        export const demo = (): void => {
            const restaurant: BuilderPattern.Restaurant = new BuilderPattern.RestaurantBuilder('Ithaa Undersea')
                .setAddress('JP8F+6H9, Conrad Rangali Island 20077, Maldive')
                .setRating(4.9)
                .setCooksNo(50)
                .setWaitersNo(40)
                .build();

            console.log('\nBuilder Pattern Demo!\nRestaurant build with builder pattern');
            console.log(`Restaurant configurations: `);
            console.log(`Name: ${restaurant.Name}`);
            console.log(`Address: ${restaurant.Address}`);
            console.log(`Rating: ${restaurant.Rating}`);
            console.log(`Cooks number: ${restaurant.CooksNo}`);
            console.log(`Waiters number: ${restaurant.WaitersNo}\n`);
        };
    }
}