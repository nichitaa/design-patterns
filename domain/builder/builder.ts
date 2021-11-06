namespace BuilderPattern {
    export class RestaurantBuilder {
        private readonly name: string;
        private address: string;
        private rating: number;
        private cooksNo: number;
        private waitersNo: number;

        constructor(name: string) {
            this.name = name;
        }

        get Name() {
            return this.name;
        }

        setAddress(val: string) {
            this.address = val;
            return this;
        }

        get Address() {
            return this.address;
        }

        setRating(val: number) {
            this.rating = val;
            return this;
        }

        get Rating() {
            return this.rating;
        }

        setCooksNo(val: number) {
            this.cooksNo = val;
            return this;
        }

        get CooksNo() {
            return this.cooksNo;
        }

        setWaitersNo(val: number) {
            this.waitersNo = val;
            return this;
        }

        get WaitersNo() {
            return this.waitersNo;
        }

        build(): Restaurant {
            return new Restaurant(this);
        }
    }

    export class Restaurant {
        private readonly name: string;
        private readonly address: string;
        private readonly rating: number;
        private readonly cooksNo: number;
        private readonly waitersNo: number;

        constructor(builder: RestaurantBuilder) {
            this.name = builder.Name;
            this.address = builder.Address;
            this.rating = builder.Rating;
            this.cooksNo = builder.CooksNo;
            this.waitersNo = builder.WaitersNo;
        }

        get Name() {
            return this.name;
        }

        get Address() {
            return this.address;
        }

        get Rating() {
            return this.rating;
        }

        get CooksNo() {
            return this.cooksNo;
        }

        get WaitersNo() {
            return this.waitersNo;
        }
    }
}