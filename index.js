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
var tama;
var lastChecked = new Date().getMilliseconds;

const express = require('express');
const app = express();

app.get('/info', function(req, res) {
    var resp = 'Welcome to the tamagotchi time..., that are the commands...: /hungry, /life, /happiness and /sleepness';
    res.send( JSON.stringify(resp));
});

app.get('/hungry', function(req, res) {
    var resp = tama.hungry;
    console.log(tama.hungry);
    res.send( JSON.stringify(resp));
});
app.get('/life', function(req, res) {
    var resp = tama.life;
    console.log(tama.life);
    res.send( JSON.stringify(resp));
});
app.get('/happiness', function(req, res) {
    var resp = tama.happiness;
    console.log(tama.happiness);
    res.send( JSON.stringify(resp));
});
app.get('/sleepness', function(req, res) {
    var resp = tama.sleepness;
    console.log(tama.sleepness);
    res.send( JSON.stringify(resp));
});


function updateStatus(){
    //main status changed
    tama.hungry     = ( tama.hungry < 100 ) ? tama.hungry += 10 : tama.hungry;
    tama.happiness  = ( tama.happiness > 0 ) ? tama.happiness -= 10 : tama.happiness;
    tama.sleepness  = ( tama.sleepness < 100 ) ? tama.sleepness += 10 : tama.sleepness;
    
    //life dependencies logics
    tama.life = tama.hungry == 100 && tama.life > 0 ? tama.life -= 10 : tama.life;
    tama.life = tama.happiness == 0 && tama.life > 0 ? tama.life -= 10 : tama.life;
    tama.life = tama.sleepness == 100 && tama.life > 0 ? tama.life -= 10 : tama.life;
    

    console.log('hungry :: ' + tama.hungry );
    console.log('happiness :: ' + tama.happiness );
    console.log('sleepness :: ' + tama.sleepness );
    console.log('life :: ' + tama.life );

    //check life status
    if( tama.life == 0 ){
        //matar a tamagotchi
        console.log('estoy muerto');
    }
}

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('Listening on : ' + port );
    tama = new Tamagotchi( 0, 100, 100, 0 );
    setInterval( updateStatus, 10000);
});