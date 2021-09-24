import inquirer from 'inquirer'
import fs from "fs";

/**
 * Singleton Logger
 * */
export class Logger {
    private logs: object[];
    private static _instance: Logger;

    private constructor() {
        this.logs = []
    }

    public static getInstance(): Logger {
        if (!Logger._instance) {
            Logger._instance = new Logger();
        }
        return Logger._instance;
    }

    get count(): number {
        return this.logs.length
    }

    public log(msg: string | object, json = false) {
        const time = new Date().toISOString();
        if (json) {
            fs.appendFile('log.log', `\n${time} # - ${JSON.stringify(msg, null, 2)}`, (err) => {
                if (err) throw err;
            })
        } else {
            fs.appendFile('log.log', `\n${time} # - ${msg}`, (err) => {
                if (err) throw err;
            })
        }
        this.logs.push({msg, time});
    }
}


/**
 * Restaurant Builder
 * */
class RestaurantBuilder {
    private name: string;
    private cooks: any[] = []
    private waiters: any[] = []
    private tables: any[] = []
    private order: any[] = []

    setName(name: string) {
        this.name = name;
        return this
    }

    get Name() {
        return this.name;
    }

    addCook(config: any): RestaurantBuilder {
        this.cooks.push(config)
        return this
    }

    get Cooks() {
        return this.cooks
    }

    addWaiter(config: any) {
        this.waiters.push(config);
        return this
    }

    get Waiters() {
        return this.waiters;
    }

    addTable(config: any) {
        this.tables.push(config);
        return this;
    }

    get Tables() {
        return this.tables;
    }

    addOrder(config: any) {
        this.order.push(config);
        return this;
    }

    get Orders() {
        return this.order;
    }

    build() {
        return new Restaurant(this);
    }
}

/**
 * Actual Restaurant
 * */
class Restaurant {
    readonly name: string;
    readonly cooks: any[];
    readonly waiters: any[];
    readonly tables: any[];
    readonly order: any[];

    constructor(builder: RestaurantBuilder) {
        this.name = builder.Name;
        this.cooks = builder.Cooks;
        this.waiters = builder.Waiters;
        this.tables = builder.Tables;
        this.order = builder.Orders;
    }

    get Name() {
        return this.name;
    }

    get Cooks() {
        return this.cooks;
    }

    get Waiters() {
        return this.waiters;
    }

    get Tables() {
        return this.tables;
    }

    get Orders() {
        return this.order;
    }
}

/**
 * Food Factory
 * */
class VegetablesFood {
    /**
     * Concrete product 1
     * */
    prepare(food, r: Restaurant) {
        console.log(`restaurant ${r.Name} preparing vegetable food - ${food}`)
    }
}

class MeatFood {
    /**
     * Concrete product 2
     * */
    prepare(food, r: Restaurant) {
        console.log(`restaurant ${r.Name} preparing meat food - ${food}`)
    }
}

class FoodFactory {
    spiceType(type) {
        switch (type) {
            case 'vegetable': {
                return new VegetablesFood()
            }
            case 'meat': {
                return new MeatFood();
            }
            default: {
                return null;
            }
        }
    }
}

/**
 * CLI functionality with above classes
 * */

// globally used variables
const foodFactory = new FoodFactory();
const logger = Logger.getInstance();
const restaurants: { id?: number, r?: Restaurant }[] = [];


const cliRestaurant = (r: RestaurantBuilder) => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Restaurant configuration',
                choices: ['name', 'add a cook', 'add tables', 'add waiters', 'build', 'exit'],
            },
        ])
        .then(answers => {
            switch (answers.action) {
                case 'name': {
                    inquirer.prompt([{
                        type: 'input',
                        name: 'name',
                        message: 'Restaurant name: ',
                        default: r.Name ? r.Name : ''
                    }]).then(answer => {
                        logger.log(`Changing restaurant name, ${r.Name} -> ${answer.name}`)
                        r.setName(answer.name)
                        cliRestaurant(r)
                    })
                    break
                }
                case 'add a cook': {
                    inquirer.prompt([{
                        type: 'input',
                        name: 'cook',
                        message: `Cook ${r.Cooks.length} name: `
                    }]).then(answer => {
                        r.addCook(answer.cook)
                        logger.log(`Added new cook: ${answer.cook} , to restaurant: ${r.Name}`)
                        cliRestaurant(r)
                    })
                    break
                }
                case 'add tables': {
                    inquirer.prompt([{
                        type: 'confirm',
                        name: 'table',
                        message: `Current nr of tables: ${r.Tables.length}, hit enter to add one more`,
                        default: true,
                    }]).then(answer => {
                        if (answer.table) {
                            r.addTable({"id": r.Tables.length})
                            logger.log(`Added new table to restaurant ${r.Name} [total nr of tables: ${r.Tables.length}]`)
                        }
                        cliRestaurant(r)
                    })
                    break
                }
                case 'add waiters': {
                    inquirer.prompt([{
                        type: 'input',
                        name: 'waiter',
                        message: `Waiter ${r.Waiters.length} name: `,
                    }]).then(answer => {
                        r.addWaiter(answer.waiter)
                        logger.log(`Added new waiter: ${answer.waiter} to restaurant: ${r.Name} `)
                        cliRestaurant(r)
                    })
                    break
                }
                case 'build': {
                    inquirer.prompt([{
                        type: 'confirm',
                        name: 'build',
                        message: `Are you sure you want to build restaurant ${r.Name} with ${r.Tables.length} tables, cooks: ${JSON.stringify(r.Cooks)}, waiters: ${JSON.stringify(r.Waiters)}`,
                        default: true,
                    }]).then(answer => {
                        if (answer.build) {
                            const done = r.build()
                            logger.log(`New restaurant ${r.Name} was just build: `)
                            logger.log({name: r.Name, tables: r.Tables, cooks: r.Cooks, waiters: r.Waiters}, true)
                            restaurants.push({'id': restaurants.length, r: done})
                        }
                        cliStart()
                    })
                    break
                }
                case 'exit': {
                    return cliStart();
                }
                default: {
                    return cliStart()
                }
            }
        });
}

const cliPrepareFood = (r: Restaurant) => {
    inquirer.prompt([{
        type: 'list',
        message: `Select a spice type from restaurant ${r.Name}`,
        name: 'type',
        choices: ['meat', 'vegetable', 'back']
    }]).then(answers => {
        if (answers.type === 'back') return cliViewAllRestaurants();
        inquirer.prompt([{
            type: 'input',
            message: 'input food name you want to prepare: ',
            name: 'food'
        }]).then(foodAnswer => {
            const spiced = foodFactory.spiceType(answers.type)
            logger.log(`Restaurant ${r.Name} will prepare food type: ${answers.type} and food item: ${foodAnswer.food}`)
            spiced!.prepare(foodAnswer.food, r)
            return cliViewAllRestaurants()
        })
    })
}

const cliViewAllRestaurants = () => {
    const choices: any[] = []
    restaurants.map(el => choices.push(el.r!.Name))
    choices.push('#back')
    inquirer.prompt({
        choices: choices,
        type: 'list',
        name: 'restaurants',
        message: 'Pick a restaurant'
    })
        .then(answers => {
            if (answers.restaurants === '#back') return cliStart()
            const r = restaurants.find(el => el!.r!.Name === answers.restaurants)
            logger.log(`Picked restaurant: ${r!.r!.Name}`)
            return cliPrepareFood(r!.r!)
        })
}

const cliStart = () => {
    inquirer
        .prompt([{
            type: 'list',
            name: 'action',
            message: 'Restaurant actions ?',
            choices: ['configure', 'view all'],
        }])
        .then(answers => {
            switch (answers.action) {
                case 'configure': {
                    const r = new RestaurantBuilder()
                    logger.log(`Building a new restaurant`)
                    return cliRestaurant(r);
                }
                case 'view all': {
                    logger.log(`Viewing new restaurant`)
                    return cliViewAllRestaurants()
                }
                default: {
                    return cliStart()
                }
            }
        });
}


logger.log(`Application started`)
cliStart()
