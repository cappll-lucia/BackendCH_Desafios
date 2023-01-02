
let fs = require('fs');

let chatJson = await fs.promises.readFile('./resources/chat.txt');
export const chat = JSON.parse(chatJson);

let prodsJson = await fs.promises.readFile('./resources/chat.txt');
export const products = JSON.parse(prodsJson);

