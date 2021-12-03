/// <reference path="domain/patterns.ts" />
/// <reference path="utils/utils.ts" />

const inquirer = require('inquirer');

namespace Patterns {

    let startCLI;
    (startCLI = () => {
        inquirer.prompt([{
            type: 'list',
            name: 'pattern',
            message: 'Select a design pattern category',
            choices: [...patterns.map((el) => el.type)]
        }])
            .then(answer => {
                const type = answer.pattern;
                if (type !== 'Exit') {
                    return cliShowPatternOfType(type);
                }
                console.log('Bye !');
                process.exit(0);
            });
    })();

    const cliShowPatternOfType = (type: string) => {
        const patternsOfType = patterns.find((el) => el.type === type).patterns;
        inquirer.prompt([{
            type: 'list',
            name: 'name',
            message: `${type}`,
            choices: [...patternsOfType.map((el) => el.name)]
        }]).then(answer => {
            const name = answer.name;
            if (name !== 'Back') {
                return cliPatternOptions(type, name);
            }
            return startCLI();
        });
    };

    const cliPatternOptions = (type: string, name: string) => {
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
                const option = answer.option;
                if (option === '* Display code') {
                    return showPatternSourceCode(type, name);
                } else if (option === '* Run demo') {
                    return showPatternDemo(type, name);
                } else {
                    return cliShowPatternOfType(type);
                }
            });
    };

    const showPatternSourceCode = (type: string, name: string) => {
        const pattern = getPattern(type, name);
        fs.readFile(path.join(__dirname, pattern.Demo.codePathName), 'utf8', (err, data) => {
            if (err) console.error(err.message);
            console.log(`\nPattern implementation: \n${data}`);
            return cliPatternOptions(type, name);
        });
    };

    const showPatternDemo = (type: string, name: string) => {
        const pattern = getPattern(type, name);
        pattern.Demo.demo();
        return cliPatternOptions(type, name);
    };

}