const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');

const menuHamIcon = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');

const menuCar = document.querySelector('.navbar-shopping-card');
const shoppingCartContainer = document.querySelector('#shoppingCartContainer');
const productDetailClose = document.querySelector('.product-detail-close')

productDetailClose.addEventListener('click', closeProductDetailAside);
const cardsContainer = document.querySelector('.cards-container');
const productDetailContainer = document.querySelector('#productDetail');
menuEmail.addEventListener('click', toggleDesktopMenu);
menuHamIcon.addEventListener('click', toggleMobileMenu);
menuCar.addEventListener('click', toggleCar);

function openProductDetailAside() {
    shoppingCartContainer.classList.add('inactive');
    desktopMenu.classList.add('inactive');
    mobileMenu.classList.add('inactive');
    productDetailContainer.classList.remove('inactive');
}

function closeProductDetailAside() {
    productDetailContainer.classList.add('inactive');
}

function toggleDesktopMenu () {
    const isShoppingCartContainerClosed = shoppingCartContainer.classList.contains('inactive');
    const isProductDetaiClosed = productDetailContainer.classList.contains('inactive');
    //Si el menu movil esta abierto hay que cerrarlo
    if(!isShoppingCartContainerClosed){
        shoppingCartContainer.classList.add('inactive');
    }
    if(!isProductDetaiClosed){
        productDetailContainer.classList.add('inactive');
    } 
    desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu () {
    const isshoppingCartContainerClosed = shoppingCartContainer.classList.contains('inactive');
    const isProductDetaiClosed = productDetailContainer.classList.contains('inactive');
    //Si el menu movil esta abierto hay que cerrarlo
    if(!isshoppingCartContainerClosed){
        shoppingCartContainer.classList.add('inactive');
    }
    if(!isProductDetaiClosed){
        productDetailContainer.classList.add('inactive');
    }  
    mobileMenu.classList.toggle('inactive');
}

function toggleCar() {
    const ismobileMenuClosed = mobileMenu.classList.contains('inactive');
    const isDesktopMenuClosed = desktopMenu.classList.contains('inactive');
    const isProductDetaiClosed = productDetailContainer.classList.contains('inactive');
    //Si el menu movil esta abierto hay que cerrarlo
    if(!ismobileMenuClosed){
        mobileMenu.classList.add('inactive');
    }
    if(!isDesktopMenuClosed){
        desktopMenu.classList.add('inactive');
    }
    if(!isProductDetaiClosed){
        productDetailContainer.classList.add('inactive');
    }
    shoppingCartContainer.classList.toggle('inactive');
    
}

const productList = [];
productList.push({
    name: 'Bike',
    price: 120,
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
});
productList.push({
    name: 'Screen',
    price: 150,
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
});
productList.push({
    name: 'Mouse',
    price: 50,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
});

function rederProduct (arr) {
    for(product of arr){
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
    
        const img = document.createElement('img');
        img.setAttribute('src', product.image);
        img.addEventListener('click', openProductDetailAside);

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
    
        const div = document.createElement('div');
        const price = document.createElement('p');
        price.innerText = '$' + product.price;
        const name = document.createElement('p');
        name.innerText = product.name;
    
        const figure = document.createElement('figure');
        const icon = document.createElement('img');
        icon.setAttribute('src', '../Icons/bt_add_to_cart.svg');
        icon.setAttribute('alt', product.name);
    
        figure.appendChild(icon);
    
        div.appendChild(price);
        div.appendChild(name);
    
        productInfo.appendChild(div);
        productInfo.appendChild(figure);
    
        productCard.appendChild(img);
        productCard.appendChild(productInfo);
    
        cardsContainer.appendChild(productCard);
    }
}

rederProduct(productList);
