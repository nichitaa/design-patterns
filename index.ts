/// <reference path="domain/singleton/demo.ts" />
/// <reference path="domain/builder/demo.ts" />
/// <reference path="domain/factoryMethod/demo.ts" />
/// <reference path="domain/adapter/demo.ts" />
/// <reference path="domain/facade/demo.ts" />
/// <reference path="domain/proxy/demo.ts" />

const inquirer = require('inquirer');

namespace Pattern {

    const patternDemo = (Pattern: any, name: string) => {
        Pattern.Demo.demo();
        return cliPatternOption(Pattern, name);
    };

    const displayPatternCode = (Pattern: any, name: string) => {
        fs.readFile(path.join(__dirname, Pattern.Demo.codePathName), 'utf8', (err, data) => {
            if (err) console.error(err.message);
            console.log(`\nPattern implementation: \n${data}`);
            return cliPatternOption(Pattern, name);
        });
    };

    const cliPatternOption = (Pattern: any, name: string) => {
        inquirer.prompt([{
            type: 'list',
            name: 'option',
            message: `${name} options`,
            choices: [
                '* Display code',
                '* Run demo',
                '* Back'
            ]
        }])
            .then(answer => {
                switch (answer.option) {
                    case '* Display code': {
                        return displayPatternCode(Pattern, name);
                    }

                    case '* Run demo': {
                        return patternDemo(Pattern, name);
                    }

                    case '* Back': {
                        return cli();
                    }
                    default: {
                        console.log('Please select a valid option!');
                        return cliPatternOption(Pattern, name);
                    }

                }
            });
    };

    const cli = () => {
        inquirer.prompt([{
            type: 'list',
            name: 'pattern',
            message: 'Select a pattern',
            choices: [
                '1. Singleton',
                '2. Builder',
                '3. Factory Method',
                '4. Adapter',
                '5. Facade',
                '6. Proxy',
                '7. Exit CLI'
            ]
        }])
            .then(answer => {
                const patternName = answer.pattern.split('. ')[1];
                switch (answer.pattern) {

                    case '1. Singleton': {
                        return cliPatternOption(SingletonPattern, patternName);
                    }
                    case '2. Builder': {
                        return cliPatternOption(BuilderPattern, patternName);
                    }
                    case '3. Factory Method': {
                        return cliPatternOption(FactoryMethodPattern, patternName);
                    }
                    case '4. Adapter': {
                        return cliPatternOption(AdapterPattern, patternName);
                    }
                    case '5. Facade': {
                        return cliPatternOption(FacadePattern, patternName);
                    }
                    case '6. Proxy': {
                        return cliPatternOption(ProxyPattern, patternName);
                    }
                    case '7. Exit CLI': {
                        console.log('Bye !');
                        return process.exit(0);
                    }
                    default: {
                        console.log('Please select a valid pattern!');
                        return cli();
                    }
                }
            });
    };

    cli();
}