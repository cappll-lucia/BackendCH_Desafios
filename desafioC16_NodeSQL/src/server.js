// import dependeces
// const express = require('express');
import express from 'express';
const {Server: HttpServer}= require('http');
const {Server: IOServer} = require('socket.io');
import config from './scripts/config.js';
import * as handlebars from 'express-handlebars';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
const ControllerProds =  require('../components/controllers/products.js');
const ControllerChat = require('../components/controllers/chat.js');

const __dirname= dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const hbs = handlebars.create({
    extname: '.hbs',
    layoutDir: __dirname + "/public/views/layout",
    partialsDir:__dirname + "/public/views/partials"
})

const chat = new ControllerChat(config.sqlite3, './resources/chat.txt');
const products = new ControllerProds(config.sqlite3, './resources/products.txt');


app.use(express.static('public'));
app.use(express.json);
app.use(express.urlencoded({extended:true}));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './public/views');


app.get('/', (request, response)=>{
    response.render('index', {});
})

io.on('connection', async socket=>{
    const productsList = products.getAll();
    const chatList = chat.getAll();
    socket.emit('updateProds', productsList);
    socket.emit('updateChat', chatList);
})

socket.on('newMsj', async msj=>{
    chatList.push(msj);
    await chat.saveMsj(msj);
    io.sockets.emit('updateChat', chatList);
})


const PORT = 8080;
app.listen(PORT, ()=>{console.log(`server running at http://localhost:${PORT}`)});