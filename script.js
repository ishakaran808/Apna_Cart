let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Lava Blaze 5G (Glass Blue, 6GB RAM, UFS 2.2 128GB Storage)',
        image: '1.PNG',
        price: 11999
    },
    {
        id: 2,
        name: 'Samsung Galaxy S21 FE 5G Smartphone | Olive Pro-grade',
        image: '2.PNG',
        price: 37999
    },
    {
        id: 3,
        name: 'Apple iPhone 14 Pro Max (256 GB) - Deep Purple',
        image: '3.PNG',
        price: 70999
    },
    {
        id: 4,
        name: 'Vibez by Lifelong Ornate Smartwatch (VBSWW450, 1 Year Manufacturer Warranty, Gold)',
        image: '4.PNG',
        price: 24999
    },
    {
        id: 5,
        name: 'Fire-Boltt Visionary" AMOLED Bluetooth Calling Smartwatch (Champagne Gold)',
        image: '5.PNG',
        price: 2899
    },
    {
        id: 6,
        name: 'Noise ColorFit Pro 4 Alpha 1.78" AMOLED Display Instacharge (Deep Wine)',
        image: '6.PNG',
        price: 3799
    },
    {
        id: 7,
        name: 'boAt Nirvana 751 ANC Active Noise Cancelling Bluetooth, Carry Pouch(Gunmetal Grey)',
        image: '7.PNG',
        price: 4499
    },
    {
        id: 8,
        name: 'boAt Rockerz 450 Bluetooth On Ear Headphones with Mic (Aqua Blue)',
        image: '8.PNG',
        price: 1799
    },
    {
        id: 9,
        name: 'boAt Rockerz 450 Bluetooth On Ear Headphones with Mic (Hazel Beige)',
        image: '9.PNG',
        price: 2799
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}