var letters = 'defghijkmnpqrtuvwxyz';


function randomInt (min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

function randomLetter () {
    return letters[randomInt(0, letters.length - 1)];
}

function randomLetters (count) {
    var s = '';
    for (var i=0; i < count; i++) {
        s += randomLetter();
    };
    return s;
}

