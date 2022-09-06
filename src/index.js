const productList = [];
for (let i = 0; i < 36; i++) {
    productList.push({
        id: i,
        name: "Image " + (i + 1),
        price: 120 * (i + 1),
        image: "https://picsum.photos/500/500?random&img=" + i,
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam illo sapiente similique suscipit possimus veritatis. Natus enim cupiditate et ratione ipsum! Fugit, quaerat quasi? Animi quos perferendis praesentium numquam porro.',
        category: "Toys",
    });
  }
  productList.push({
    id: 36,
    name: 'Screen',
    price: 150,
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam illo sapiente similique suscipit possimus veritatis. Natus enim cupiditate et ratione ipsum! Fugit, quaerat quasi? Animi quos perferendis praesentium numquam porro.',
    category: "Electronics",
});
productList.push({
    id: 37,
    name: 'Mouse',
    price: 50,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam illo sapiente similique suscipit possimus veritatis. Natus enim cupiditate et ratione ipsum! Fugit, quaerat quasi? Animi quos perferendis praesentium numquam porro.',
    category: "Electronics",
});


let previous = document.getElementById('btnPrevious')
let next = document.getElementById('btnNext')
let gallery = document.querySelector('.cards-container')
let pageIndicator = document.getElementById('page')
let galleryDots = document.getElementById('gallery-dots');

let perPage = 10;
let page = 1;
let pages = Math.ceil(productList.length / perPage)

const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');

const menuHamIcon = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');

const promotionContainer = document.querySelector('.promotion-container');

const menuCar = document.querySelector('.navbar-shopping-card');
const shoppingCartContainer = document.querySelector('#shoppingCartContainer');

let position = 1;
const productDetailRoot = document.querySelector('.product-detail-root');
renderProductDetail(productList);
const productDetailClose = document.querySelectorAll('.product-detail-close');

const cardsContainer = document.querySelector('.cards-container');
const productDetailContainer = document.querySelectorAll('.productDetail');
let shopingCardClass;
let amount;
const myOrderContent = document.querySelector('.my-order-content');
const orderTotal = document.querySelector('.order-total');

menuEmail.addEventListener('click', toggleDesktopMenu);
menuHamIcon.addEventListener('click', toggleMobileMenu);
menuCar.addEventListener('click', toggleCar);

const searchButton = document.querySelector('#search-button');
const inputSearch = document.querySelector('.search');

searchButton.addEventListener('click',function(){
    let searchElement = productList.filter(function(el) {
        return el.name.toLowerCase().indexOf(inputSearch.value.toLowerCase()) > -1;
    });
    renderCategory(searchElement);
});

//Header
let category = [];
const categories = document.querySelectorAll('.categories');
for(let i = 0; i < categories.length; i++){
    categories[i].addEventListener('click', function(){
        renderCategoryStyle(i);
    });
}


function renderCategoryStyle(index){
    for (let i = 0; i < categories.length; i++) {
        if(categories[i].classList.contains('active-category')){
            categories[i].classList.remove('active-category');
        }   
    }
    console.log(categories);
    categories[index].classList.add('active-category');
    renderCategory(index);
}

function renderCategory(index){
    category = [];
    if(index !== 0 && !Array.isArray(index) && index !== 6){
        for(product of productList){
            if(categories[index].children[0].innerText === product.category){
                category.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    description: product.description,
                    category: product.category, 
                });
            }
        }
    }else if(Array.isArray(index)) {
        category = index;
    }else{
        category = productList;
    }
    
    if(category.length > 0 && category.length <=10){
         perPage = 20;

    }else{
        perPage = 10;
    }
    page = 1;
    pages = Math.ceil(category.length / perPage);
    renderDots(category);
    renderProduct(category);
    
}
//

//Add to cart
const counterCart = document.querySelector('.counter-cart');

let myOrder = [];

function addToCart(id, inputRequest){
    //Se suma el contador del carrito
    let number = Number(counterCart.innerText) + 1;
    counterCart.innerText = number;
    
    let isDefined = false;
    let counterElement = 1;
    let price1 = productList[id].price;
    let total = 0;
    id = Number(id);
    shopingCardClass = document.querySelectorAll('.shopping-card');  
    amount = document.querySelectorAll('.amount');
    
    if(myOrder.length > 0){ 
        let i = 0;
        let j = myOrder.length - 1;
        while(i < myOrder.length && isDefined === false) {
            if(myOrder[i].id === id){
                console.log(myOrder[i]);
                isDefined = true;
                console.log(amount[j].value)
                console.log(myOrder[i].amount)
                if(Number(amount[j].value) +1 > myOrder[i].amount){
                    price1 = productList[id].price + myOrder[i].price;
                }else{
                    price1 = myOrder[i].price - productList[id].price;
                }
                console.log(price1)
                myOrder[i].price = price1;
                shopingCardClass[j].childNodes[3].innerText = price1;

                if(!inputRequest){
                    counterElement += Number(amount[j].value); 
                    amount[j].value = counterElement;
                }
                myOrder[i].amount = Number(amount[j].value);
            }else{
                isDefined = false;
            }
            i++;
            j--;
        }
        
    }
    if(myOrder.length === 0 || !isDefined){
        myOrder.push({
            id: productList[id].id,
            name: productList[id].name,
            price: price1,
            image: productList[id].image,
            amount: counterElement
        });
        renderCart(productList[id].name, price1, productList[id].image, 1, id);
    }   
    for(order of myOrder){
        total+= order.price;
    }
    orderTotal.innerText = total;
}



function openProductDetailAside(id) {
    shoppingCartContainer.classList.add('inactive');
    desktopMenu.classList.add('inactive');
    mobileMenu.classList.add('inactive');
    position = id;
    for(let i = 0; i < productList.length; i++){
        if(!productDetailContainer[i].classList.contains('inactive')){
            productDetailContainer[i].classList.add('inactive');
        }
        
    }
    productDetailContainer[id].classList.remove('inactive');
}

function closeProductDetailAside(id) {
    productDetailContainer[id].classList.add('inactive');
}

function toggleDesktopMenu () {
    const isShoppingCartContainerClosed = shoppingCartContainer.classList.contains('inactive');
    const isProductDetaiClosed = productDetailContainer[position].classList.contains('inactive');
    //Si el menu movil esta abierto hay que cerrarlo
    if(!isShoppingCartContainerClosed){
        shoppingCartContainer.classList.add('inactive');
    }
    if(!isProductDetaiClosed){
        productDetailContainer[position].classList.add('inactive');
    } 
    desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu () {
    const isshoppingCartContainerClosed = shoppingCartContainer.classList.contains('inactive');
    const isProductDetaiClosed = productDetailContainer[position].classList.contains('inactive');
    
    //Si el menu movil esta abierto hay que cerrarlo
    if(!isshoppingCartContainerClosed){
        shoppingCartContainer.classList.add('inactive');
    }
    if(!isProductDetaiClosed){
        productDetailContainer[position].classList.add('inactive');
    } 
    promotionContainer.classList.toggle('inactive'); 
    mobileMenu.classList.toggle('inactive');
}

function toggleCar() {
    const ismobileMenuClosed = mobileMenu.classList.contains('inactive');
    const isDesktopMenuClosed = desktopMenu.classList.contains('inactive');
    const isProductDetaiClosed = productDetailContainer[position].classList.contains('inactive');
    const isPromotionContainerClosed = promotionContainer.classList.contains('inactive');
    //Si el menu movil esta abierto hay que cerrarlo
    if(!ismobileMenuClosed){
        mobileMenu.classList.add('inactive');
    }
    if(!isDesktopMenuClosed){
        desktopMenu.classList.add('inactive');
    }
    if(!isProductDetaiClosed){
        productDetailContainer[position].classList.add('inactive');
    }
    if(isPromotionContainerClosed){
        promotionContainer.classList.remove('inactive');
    }
    shoppingCartContainer.classList.toggle('inactive');
}


function renderCart (name, price, image, amount, id) {
    const shoppingCard = document.createElement('div');
    shoppingCard.classList.add('shopping-card');

    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.setAttribute('src', image);
    img.setAttribute('alt', name);

    const pName = document.createElement('p');
    pName.innerText = name;

    const numberInput = document.createElement('input');
    numberInput.classList.add('amount');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('min', 1);
    numberInput.setAttribute('value', amount);
    numberInput.addEventListener('input',function(){
        addToCart(id, true);
    });
    const pPrice = document.createElement('p');
    pPrice.innerText = price;

    const deleteElement = document.createElement('img');
    deleteElement.setAttribute('src', './Icons/icon_close.png');
    deleteElement.setAttribute('alt', 'Delete');

    shoppingCard.appendChild(figure);
    shoppingCard.appendChild(pName);
    shoppingCard.appendChild(numberInput);
    shoppingCard.appendChild(pPrice);
    shoppingCard.appendChild(deleteElement);

    figure.appendChild(img);

    myOrderContent.prepend(shoppingCard);  
}

function renderProductDetail (arr){
    for(product of arr){
        const productDetails = document.createElement('aside');
        productDetails.classList.add('productDetail');
        productDetails.classList.add('inactive');
        
        const productDetailClose1 = document.createElement('div');
        productDetailClose1.classList.add('product-detail-close');

        const iconClose = document.createElement('img');
        iconClose.setAttribute('src','./Icons/icon_close.png');
        iconClose.setAttribute('alt','close');

        const img = document.createElement('img');
        img.setAttribute('src',product.image);
        img.setAttribute('alt',product.name);
        
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
        
        const pPrice = document.createElement('p');
        pPrice.innerText = product.price;

        const pName = document.createElement('p');
        pName.innerText = product.name;

        const pDescription = document.createElement('p');
        pDescription.innerText = product.description;

        const btnAddCart = document.createElement('button');
        btnAddCart.classList.add('primary-button');
        btnAddCart.classList.add('add-to-cart-button');

        const btnICon = document.createElement('img');
        btnICon.setAttribute('src', './Icons/bt_add_to_cart.svg');
        btnICon.setAttribute('alt', 'add to cart');

        btnAddCart.appendChild(btnICon);
        btnAddCart.innerHTML = 'Add to cart';

        productInfo.appendChild(pPrice);
        productInfo.appendChild(pName);
        productInfo.appendChild(pDescription);
        productInfo.appendChild(btnAddCart);

        productDetailClose1.appendChild(iconClose);

        productDetails.appendChild(productDetailClose1);
        productDetails.appendChild(img);
        productDetails.appendChild(productInfo);

        productDetailRoot.appendChild(productDetails);
    }
}

// Gallery dots
function renderDots(arr){
    while (galleryDots.firstChild) {
        galleryDots.removeChild(galleryDots.lastChild);
    }
    for (let i = 0; i < pages; i++){
        let dot = document.createElement('button');
        dot.classList.add('gallery-dot');
        dot.setAttribute('data-index', i);
    
        let dotSpan = document.createElement('span');
        dotSpan.classList.add('sr-only');
    
        let dotNumber = document.createTextNode(i + 1);
        
       
        dotSpan.appendChild(dotNumber);
        dot.appendChild(dotSpan);
        
        dot.addEventListener('click', function(e) {
          let self = e.target
          goToPage(self.getAttribute('data-index'), arr)
        });
        
        galleryDots.appendChild(dot);
    }
}


// Previous Button
function renderPrevious(arr){
    previous.addEventListener('click', function() {
        if (page === 1) {
          page = 1;
        } else {
          page--;
          renderProduct(arr);
        }
      });
}
 
  // Next Button
function renderNext(arr){
    next.addEventListener('click', function() {
        if (page < pages) {
          page++;
          renderProduct(arr);
        }
    });
}

  
  // Jump to page
function goToPage(index, arr) {
    index = parseInt(index);
    page =  index + 1;
    
    renderProduct(arr);
}

function renderProduct (arr) {
  while(gallery.firstChild)
  gallery.removeChild(gallery.firstChild);

  let offset = (page - 1) * perPage;
  let dots = document.querySelectorAll('.gallery-dot');

  for (let i = 0; i < dots.length; i++){
    dots[i].classList.remove('active');
  }
  
  dots[page - 1].classList.add('active');

  for(let i = offset; i < offset + perPage; i++){
    if ( arr[i] ) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.classList.add(arr[i].id);
        const img = document.createElement('img');
        img.setAttribute('src', arr[i].image);
        img.setAttribute('alt', arr[i].name);
        //Ver detalle
        img.addEventListener('click',function (){
            openProductDetailAside(productCard.classList[1]);
          })
        //Cerrar detalle
        productDetailClose[arr[i].id].addEventListener('click', function(){
            closeProductDetailAside(productCard.classList[1]);
        });
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
    
        const div = document.createElement('div');
        const price = document.createElement('p');
        price.innerText = '$' + arr[i].price;
        const name = document.createElement('p');
        name.innerText = arr[i].name;
    
        const figure = document.createElement('figure');
        const icon = document.createElement('img');
        icon.setAttribute('src', './Icons/bt_add_to_cart.svg');
        icon.setAttribute('alt', arr[i].name);
        icon.classList.add('btn-add-cart')
        icon.addEventListener('click', function(){
            addToCart(productCard.classList[1]);
        });
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
    // Animate images
    let galleryItems = document.querySelectorAll('.product-card');
    for (let i = 0; i < galleryItems.length; i++) {
        let onAnimateItemIn = animateItemIn(i);
        setTimeout(onAnimateItemIn, i * 100);
    }
  
    function animateItemIn(i) {
        let item = galleryItems[i];
        return function() {
            item.classList.add('animate');
        }
    }
    // Update page indicator
    pageIndicator.textContent = "Page " + page + " of " + pages;
}

renderDots(productList);
renderPrevious(productList);
renderNext(productList);
renderProduct(productList);


