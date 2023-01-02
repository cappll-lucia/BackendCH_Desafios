// import dependeces
const express = require('express');
const {Server: HttpServer}= require('http');
const {Server: IOSocket} = require('socket.io');
import config from './scripts/config.js';
import * as hbs from 'express-handlebars';
import container from '../resources/clientSQL.js';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

// instances
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer= new HttpServer(app);
const io = new IOServer(httpServer);

