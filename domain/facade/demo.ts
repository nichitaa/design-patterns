/// <reference path="facade.ts"/>

namespace FacadePattern {
    export namespace Demo {
        export const codePathName = '../domain/facade/facade.ts';

        export const demo = (): void => {
            const shapeObject: FacadePattern.ShapeFacade = new FacadePattern.ShapeFacade();

            console.log('\nFacade Pattern for drawing shapes!\n');
            console.log(shapeObject.drawSquare());
            console.log(shapeObject.drawTriangle());
            console.log(`${shapeObject.drawCircle()}\n`);
        }
    }
}