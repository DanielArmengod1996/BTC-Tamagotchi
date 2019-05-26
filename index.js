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

var https = require('https');


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

    // get the last message from the bot of telegram
    getResponseFromServer();
    // print in console the status from the tamagotchi
    logTamaStatus();

    //main status changed
    tama.hungry     = ( tama.hungry < 100 ) ? tama.hungry += 10 : tama.hungry;
    tama.happiness  = ( tama.happiness > 0 ) ? tama.happiness -= 10 : tama.happiness;
    tama.sleepness  = ( tama.sleepness < 100 ) ? tama.sleepness += 10 : tama.sleepness;
    
    //life dependencies logics
    tama.life = tama.hungry == 100 && tama.life > 0 ? tama.life -= 10 : tama.life;
    tama.life = tama.happiness == 0 && tama.life > 0 ? tama.life -= 10 : tama.life;
    tama.life = tama.sleepness == 100 && tama.life > 0 ? tama.life -= 10 : tama.life;

    logTamaStatus();

    //check life status
    if( tama.life == 0 ){
        // dead tatmagotcho
    }
    
}
/**
 * @description Query call to get the bot status
*/
function getResponseFromServer(){
    https.get(urlBot, (resp) => {
    
        let data = '';
    
        resp.on( 'data', (chunck) => {
            data += chunck;
        });
    
        resp.on( 'end', () => {
            console.log( 'INFO RESPUESTA SERVIDOR : ' + data );
            // se va a deserializar y recoger el comando de dicho bot
        });
    
    }).on('error', (err) => {
        console.log( 'Error : ' + err.message );
    });
}

function logTamaStatus(){
    console.log('hungry :: '    + tama.hungry );
    console.log('happiness :: ' + tama.happiness );
    console.log('sleepness :: ' + tama.sleepness );
    console.log('life :: '      + tama.life );
}
