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
    console.log(tama.hungry);
    res.send( JSON.stringify(resp));
});
app.get('/happiness', function(req, res) {
    var resp = tama.happiness;
    console.log(tama.hungry);
    res.send( JSON.stringify(resp));
});
app.get('/sleepness', function(req, res) {
    var resp = tama.sleepness;
    console.log(tama.hungry);
    res.send( JSON.stringify(resp));
});

app.get('/updateStatus', function(req, res){
    var rightNow = new Date().getMilliseconds();
    
    if( rightNow - lastChecked > 60000 ){
        //TODO: some logical shit do in that condition

    }
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('Listening on ${port}');
    tama = new Tamagotchi( 0, 100, 100, 0 );
});