/// <reference path="../domain/patterns.ts" />

namespace Patterns {
    export const getPattern = (type: string, name: string) => {
        const dps = patterns.find(el => el.type === type).patterns;
        return dps.find(el => el.name === name).pattern;
    };
}