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

// last Id from bot
var lastId = '';



// url bot
var urlBot = 'https://api.telegram.org/bot744288029:AAHyh3PoGODKsvB6jIZ1WUJEm8j8IvN_KlE/getUpdates';

var tama = new Tamagotchi(0, 100, 100, 0);

var https = require('https');


// start the loop for the telegram api
var intervl = setInterval( updateStatus, 5000);

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

    //main status changed
    tama.hungry     = ( tama.hungry < 100 ) ? tama.hungry += 10 : tama.hungry;
    tama.happiness  = ( tama.happiness > 0 ) ? tama.happiness -= 10 : tama.happiness;
    tama.sleepness  = ( tama.sleepness < 100 ) ? tama.sleepness += 10 : tama.sleepness;
    
    //life dependencies logics
    tama.life = tama.hungry == 100 && tama.life > 0 ? tama.life -= 10 : tama.life;
    tama.life = tama.happiness == 0 && tama.life > 0 ? tama.life -= 10 : tama.life;
    tama.life = tama.sleepness == 100 && tama.life > 0 ? tama.life -= 10 : tama.life;

    //logTamaStatus();

    //check life status
    if( tama.life == 0 ){
        // dead tatmagotcho
    }
    
}

/**
 * @description get message from the bot
*/
function sendMessage( idChat, textChat ){
    var urlSendBot = `https://api.telegram.org/bot744288029:AAHyh3PoGODKsvB6jIZ1WUJEm8j8IvN_KlE/sendMessage?chat_id=${idChat}&text=${textChat}`;

    
    https.get(urlSendBot, (resp) => {
    
        let data = '';
    
        resp.on( 'data', (chunck) => {
            data += chunck;
        });
    
        resp.on( 'end', () => {
            console.log('mensaje enviado');
        });
    
    }).on('error', (err) => {
        console.log( 'Error : ' + err.message );
    });
}


/**
 * @description get message from the bot
*/
function getResponseFromServer(){
    https.get(urlBot, (resp) => {
    
        let data = '';
    
        resp.on( 'data', (chunck) => {
            data += chunck;
        });
    
        resp.on( 'end', () => {
            // se va a deserializar y recoger el comando de dicho bot
            var body = JSON.parse(data);
            //se recoge el mensaje del bot
            console.log(':::::: Mensaje ::::::');
            
            var command = body.result[body.result.length-1].message.text;
            if(lastId != body.result[body.result.length-1].update_id ){
                console.log( 'nuevo comando detectado : ' + command );

                var text = body.result[body.result.length-1].message.text;
                var from = body.result[body.result.length-1].message.from.id;
                text = realiseAction(text);
                console.log( 'from :: ' + from );
                console.log( 'text :: ' + text );

                sendMessage(from, text);
            }else{
                var text = calculateStatus();
                var from = body.result[body.result.length-1].message.from.id;

                sendMessage(from, text);
            }
            
            // se actualiza la ultima id del último mensaje que se ha recogido
            lastId = body.result[body.result.length-1].update_id;
        });
    
    }).on('error', (err) => {
        console.log( 'Error : ' + err.message );
    });
}

function realiseAction(text){
    switch (text) {
        case '/comer':
            feed();
            return 'HMMMM K RICOOOOO';
        case '/jugar':
            play();
            return 'JAJAJJAA QUE DIVER';
        case '/dormir':
            sleep();
            return 'UII, CUANTO HE DORMIDO';

        default:
            return calculateStatus();
    }
}


function calculateStatus(){
    if( tama.life == 0){
        return 'estoy muerto';
    } else if( tama.hungry >= 50 ){
        return 'tengo hambre';
    }else if( tama.sleepness >= 50){
        return 'tengo sueño, quiero dormir';
    }else if( tama.happiness < 20){
        return 'estoy triste, juega conmigo';
    }else if( tama.life <= 50 ){
        return 'me estoy muriendo';
    } else {
        return 'Hola, jajaj, estoy de puta madre';
    }
}

function logTamaStatus(){
    console.log('hungry :: '    + tama.hungry );
    console.log('happiness :: ' + tama.happiness );
    console.log('sleepness :: ' + tama.sleepness );
    console.log('life :: '      + tama.life );
}
