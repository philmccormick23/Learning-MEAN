class Bike {
    constructor(
    public price: number,
    public max_speed: string,
    public miles?: number
    ) { 
        this.miles = 0;
     }

    displayInfo = () => {
        console.log("Price: " + this.price + ". Max_speed: " + this.max_speed + ". Miles: " + this.miles);
        return this;
    }

    ride = () => {
        this.miles += 10;
        console.log("riding", this.miles);
        return this;
    }
    reverse = () => {
        if (this.miles >= 5) {
            this.miles -= 5;
            console.log("reversing", this.miles)
            return this;
        } else {
            console.log("Not enough miles to reverse.", this.miles);
            return this;
        }
   }
}

let bike1 = new Bike(200, "500mph")
let bike2 = new Bike(100, "200mph")
let bike3 = new Bike(220, "250mph")

bike1.ride().ride().ride().reverse().displayInfo()
bike2.ride().ride().reverse().reverse().displayInfo()
bike3.reverse().reverse().reverse().displayInfo()
