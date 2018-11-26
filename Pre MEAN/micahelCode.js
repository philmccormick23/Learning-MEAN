var heffalumps = { character: "Heffalumps", about: "Who is this?", hasHoney: false};
var eeyore =     { character: "Eeyore", about: "Depressed AF", hasHoney: false};
var kanga =      { character: "Kanga", about: "Gengish kahn", hasHoney: false};
var owl =        { character: "Owl", about: "Who? lol", hasHoney: false};
var robin =      { character: "Robin", about: "Da nana na na, da nana na na, BATMAN!", hasHoney: false};
var rabbit =     { character: "Rabbit", about: "It's Wabbit hunting season.", hasHoney: false};
var gopher =     { character: "Gopher", about: "Got nothing.", hasHoney: false};
var piglet =     { character: "Piglet", about: "I smell bacon", hasHoney: false};
var pooh =       { character: "Winnie the Pooh", about: "Honey addiction can be serious", hasHoney: false};
var bees =       { character: "Bees", about: "Very BEEhaved neigbor.", hasHoney: true};
var tigger =     { character: "Tigger", about: "Everyone is jelous of the tail.", hasHoney: false};

heffalumps.west = eeyore;

eeyore.east = heffalumps;
eeyore.south = kanga;

kanga.north = eeyore;
kanga.south = robin;

robin.north =kanga;
robin.east  = rabbit;
robin.south = pooh;
robin.west = owl;

owl.east = robin;
owl.south = piglet;

rabbit.east = gopher;
rabbit.south = bees;
rabbit.west = robin;

gopher.west = rabbit;

piglet.north = owl;
piglet.east = pooh;

pooh.north = robin;
pooh.east = bees;
pooh.south = tigger;
pooh.west = piglet;

bees.north = rabbit;
bees.west = pooh;

tigger.north = pooh;

console.log(pooh);

var loc = heffalumps;
var about = loc.about;
var pickedup = false;

function print_arrow_key(keyCodeNumber) {
    var key_arrow_or_other = document.getElementById('key_arrow_or_other'),
        SPACEBAR = 32,
        R = 82,
        LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;
    switch (keyCodeNumber) {
    case LEFT:
        if(loc.west != null){
            key_arrow_or_other.innerHTML = loc.west.character+", <br><br>"+loc.west.about;
            loc = loc.west; about = loc.about;
        }
        else{
            key_arrow_or_other.innerHTML = "No one there.<br><br>Lame.";
        }
        break;
    case UP:
        if(loc.north != null){
            key_arrow_or_other.innerHTML = loc.north.character+", <br><br>"+loc.north.about;
            loc = loc.north; about = loc.about;
        }
        else{
            key_arrow_or_other.innerHTML = "No one there.<br><br>Lame.";
        }
        break;
    case RIGHT:
        if(loc.east != null){
            key_arrow_or_other.innerHTML = loc.east.character+", <br><br>"+loc.east.about;
            loc = loc.east; about = loc.about;
        }
        else{
            key_arrow_or_other.innerHTML = "No one there.<br><br>Lame.";
        }
        break;
    case DOWN:
        if(loc.south != null){
            key_arrow_or_other.innerHTML = loc.south.character+", <br><br>"+loc.south.about;
            loc = loc.south; about = loc.about;
        }
        else{
            key_arrow_or_other.innerHTML = "No one there.<br><br>Lame.";
        }
        break;
    case SPACEBAR:
        if(pickedup == false){
            key_arrow_or_other.innerHTML = loc.character+", <br><br>"+loc.about+pickUp(loc);
            break;
        }
        else{
            key_arrow_or_other.innerHTML = loc.character+", <br><br>"+loc.about+drop(loc);
            break;
        }
    case R:
        loc = heffalumps;
        about = heffalumps.about;
        key_arrow_or_other.innerHTML = "Push any of the arrow keys!";
        break;

    default:
        key_arrow_or_other.innerHTML = 'Other character (not an arrow key)';
        break;
    }
}

function checkKeycode(event) {
    var keyDownEvent = event || window.event,
        keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
    print_arrow_key(keycode);

    return false;
}

function pickUp(loc){
    if(loc.hasHoney == false){
        return "<br><br>There is no honey at this location.";
    }
    else{
        loc.hasHoney = false;
        pickedup = true;
        return "<br><br>You found some Honey!";
    }
}
function drop(loc){
    if(loc == pooh){
        loc.hasHoney = true;
        return "<br><br>Yay! You Won the game!<br>***   \"R\" To restart.   ***";
    }
    else{

        return "<br><br>Wrong dropoff location!!";
    }
}

document.onkeydown = checkKeycode;