namespace FacadePattern {
    export interface IShape {
        draw(): string;
    }

    class Square implements IShape {
        public draw(): string {
            return 'square - ⬜';
        }
    }

    class Triangle implements IShape {
        public draw(): string {
            return 'triangle - ▽';
        }
    }

    class Circle implements IShape {
        public draw(): string {
            return 'circle - ◯';
        }
    }

    export class ShapeFacade {
        private circle: Circle;
        private triangle: Triangle;
        private square: Square;

        constructor() {
            this.circle = new Circle();
            this.triangle = new Triangle();
            this.square = new Square();
        }

        public drawCircle(): string {
            return this.circle.draw();
        }

        public drawSquare(): string {
            return this.square.draw();
        }

        public drawTriangle(): string {
            return this.triangle.draw();
        }
    }

}