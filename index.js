/**
 * @author Daniel Armengod Sorrosal
 * @description This is a little example from a bot where you can feed it and be carefull with him.
 * @date 16-04-2019
 */


class Tamagotchi{

    constructor(hungry, life, happiness, sleepness){
        this.hungry = hungry;
        this.life = life;
        this.happiness = happiness;
        this.sleepness = sleepness;
    }
}

// url bot
var urlBot = 'https://api.telegram.org/bot744288029:AAHikTZ2Esa_wejAvdHp0OkMNSwjOxRc6m8';

var tama = new Tamagotchi(0, 100, 100, 0);

var http = require('http');


// start the loop for the telegram api
setInterval( updateStatus, 2000);

/**
 * @description function that
 * @method GET
 */
function info() {
    var resp = 'Welcome to the tamagotchi time..., that are the commands...: /hungry, /life, /happiness and /sleepness';
}

/**
 * @description function feed, minus the hungry level
 */
function feed(){
    tama.hungry -= 10;
}

 /**
 * @description function play, add happines to the tamagotchi
 */
function play(){
    tama.happiness += 10;
}

 /**
 * @description function sleep, minus the sleep level from the tamagotchi
 */
function sleep(){
    tama.sleepness -= 10;
}


/**
 * @description method that is executed by n seconds/minues/hours, and updates hungry, happiness, sleepness and life values
 */
function updateStatus(){

    console.log('hungry :: '    + tama.hungry );
    console.log('happiness :: ' + tama.happiness );
    console.log('sleepness :: ' + tama.sleepness );
    console.log('life :: '      + tama.life );

    //main status changed
    tama.hungry     = ( tama.hungry < 100 ) ? tama.hungry += 10 : tama.hungry;
    tama.happiness  = ( tama.happiness > 0 ) ? tama.happiness -= 10 : tama.happiness;
    tama.sleepness  = ( tama.sleepness < 100 ) ? tama.sleepness += 10 : tama.sleepness;
    
    //life dependencies logics
    tama.life = tama.hungry == 100 && tama.life > 0 ? tama.life -= 10 : tama.life;
    tama.life = tama.happiness == 0 && tama.life > 0 ? tama.life -= 10 : tama.life;
    tama.life = tama.sleepness == 100 && tama.life > 0 ? tama.life -= 10 : tama.life;
    

    console.log('hungry :: '    + tama.hungry );
    console.log('happiness :: ' + tama.happiness );
    console.log('sleepness :: ' + tama.sleepness );
    console.log('life :: '      + tama.life );

    //check life status
    if( tama.life == 0 ){
        console.log('estoy muerto');
    }
    
}

http.request(options, function(res){
    console.log('STATUS: ' + res.statusCode );
    console.log('HEADERS: ' + JSON.stringify(res.headers) );
    res.setEncoding('utf8');

    res.on('data', function(chunk){
        console.log('BODY CALLOUT' + chunk);
    });
}).end();
