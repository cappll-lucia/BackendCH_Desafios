const io = require('socket.io');



const socket = io();

const prodToRegister = document.getElementById('productToRegister');
prodToRegister.addEventListener('submit', ev=>{
    ev.preventDefault();
    let id=document.getElementById('id').value
    let title=document.getElementById('title').value
    let price=document.getElementById('price').value
    let imgUrl=document.getElementById('imgUrl').value
    socket.emit('prodToRegister', {
        id: id,
        title: title,
        price: price,
        imgUrl: imgUrl 
    })
    prodToRegister.reset();
})


const chatForm = document.getElementById('chatForm');
chatForm.addEventListener('submit', ev=>{
    ev.preventDefault();
    let usr = document.getElementById('usrName').value;
    let email = document.getElementById('email').value;
    let msjText = document.getElementById('msjText').value;
    let today = new Date();
    let date = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDay()+1} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    socket.emit('newMsj', {
        date: date,
        usr: usr,
        email: email,
        msjContent: msjText
    })
    chatForm.reset();
});


socket.on('connect', ()=>{
    console.log('Scocket connected to server');
});

socket.on('updateProds', prods=>{
    fetch('http://localhost:8080/views/products.hbs')
        .then(response=>{
            return response.text();
        })
        .then(plantilla=>{
            let template = Handlebars.compile(plantilla);
            let html = template({prods});
            document.getElementById('productsList').innerHTML= html;
        })
})

socket.on('updateChat', chats=>{
    fetch('http://localhost:8080/views/chat.hbs')
        .then (response=>{
            return response.text();
        })
        .then (plantilla=>{
            let template = Handlebars.compile(plantilla);
            let html= template({chats});
            document.getElementById('chatChild').innerHTML=html;
        })
})
