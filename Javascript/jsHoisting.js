//1 
var hello = 'world'; 
console.log(hello); 

//2 
var needle = 'haystack';
function test(){
	var needle = 'magnet';
	console.log(needle); //magnet
}
test(); //magnet

//3 
function print(){
	brendan = 'only okay';
	console.log(brendan);//only okay
}
var brendan = 'super cool';
console.log(brendan); // super cool

//4
var food = 'chicken';
console.log(food);  // chicken
function eat(){
	food = 'half-chicken';
	console.log(food);//half chicken
	var food = 'gone';
}
eat();

//5 
var mean = function() {
	food = "chicken";
	console.log(food);
	var food = "fish";
	console.log(food);
}
mean(); //chicken, fish
console.log(food); //undefined
console.log(food); //undefined

//6 
var genre = "disco";
console.log(genre); //disco 
function rewind() {
	genre = "rock";
	console.log(genre);
	var genre = "r&b";
	console.log(genre);
}
rewind();//rock, r&b
console.log(genre); //disco

//7 

dojo = "san jose";
console.log(dojo); //san jose
function learn() {
	dojo = "seattle";
	console.log(dojo);
	var dojo = "burbank";
	console.log(dojo);
}
learn(); //seattle, burbank
console.log(dojo); //san jose

//8 
function makeDojo(name, students){
        const dojo = {};
        dojo.name = name;
        dojo.students = students;
        if(dojo.students > 50){
            dojo.hiring = true;
        }
        else if(dojo.students <= 0){
            dojo = "closed for now";
        }
        return dojo;
}
console.log(makeDojo("Chicago", 65)); //true
console.log(makeDojo("Berkeley", 0)); //'closed for now'