let LoginBTN = document.getElementById("LoginBTN")
let LogoutBTN = document.getElementById("LogoutBTN")
let CartBTN = document.getElementById("CartBTN")
let LoginForm = document.getElementById("LoginForm")
let Login = document.getElementById("Login")
let User = document.getElementById("User")
const Products = [
    {
        id: 1,
        name: "Glasess 1",
        price: 180,
        img:"IMG/Glasess1.jpeg"
    },
    {
        id: 2,
        name: "Glasess 2",
        price: 250,
        img:"IMG/Glasess2.jpeg"
    },
    {
        id: 3,
        name: "Glasess 3",
        price: 380,
        img:"IMG/Glasess3.jpeg"
    },
    {
        id: 4,
        name: "Glasess 4",
        price: 240,
        img:"IMG/Glasess4.jpeg"
    },
    {
        id: 5,
        name: "Glasess 5",
        price: 300,
        img:"IMG/Glasess5"
    },
    {
        id: 6,
        name: "Glasess 6",
        price: 180,
        img:"IMG/Glasess6.jpeg"
    },
    {
        id: 7,
        name: "Glasess 7",
        price: 120,
        img:"IMG/Glasess7.jpeg"
    },
    {
        id: 8,
        name: "Glasess 8",
        price: 340,
        img:"IMG/Glasess8.jpeg"
    },
]
let ProductsContainer = document.getElementById("ProductsContainer")
let onelogin = document.getElementById("onelogin")
let overlay = document.getElementById('overlay')



if(localStorage.getItem('isLoggedIn') === 'true') {
    User.style.display="block"
    LogoutBTN.style.display="block"
    CartBTN.style.display="block"
    LoginBTN.style.display="none"
    onelogin.style.display="none"
    ShowProducts()
    
}else{
    CartBTN.style.display="none"
    LogoutBTN.style.display="none"
    LoginBTN.style.display="block"
}

LoginBTN.addEventListener("click", () => {
    Login.style.display="block"
    overlay.style.display="block"
})

LogoutBTN.addEventListener("click", () => {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
})

LoginForm.addEventListener('submit',function(event){
    event.preventDefault()

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // LocalStorge
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('isLoggedIn', 'true');

    window.location.reload();
})
const UserName =`Hi ${localStorage.getItem('userName')}`;
User.innerHTML = UserName


let CartItems = JSON.parse(localStorage.getItem('CartItems')) || []; 

let Cart = document.getElementById("Cart");
let CartProducts = document.getElementById("CartProducts");
let countCart = document.getElementById("countCart");


function CartChecker(id) {
    let CartItems = JSON.parse(localStorage.getItem('CartItems')) || []; 
    return CartItems.some((item) => item.id === id);
}


function ShowProducts() {
    ProductsContainer.innerHTML = '';

    Products.forEach(Product => {
        const ProductsCard = `
            <div class="col-md-3">
                <div class="card mb-3">
                    <img src="${Product.img}" class="card-img-top" alt="${Product.name}">
                    <div class="card-body align-content-end">
                        <h5 class="card-title">${Product.name}</h5>
                        <p class="card-text"><strong>Price: $${Product.price}</strong></p>
                        ${CartChecker(Product.id) 
                            ? `<button class="btn btn-danger w-100" onclick="DeleteToCart(${Product.id})">Delete from Cart</button>` 
                            : `<button class="btn btn-primary w-100" onclick="addToCart(${Product.id})">Add to Cart</button>`
                        }                         
                    </div>
                </div>
            </div>
        `;
        ProductsContainer.innerHTML += ProductsCard;
    });
}

function addToCart(id) {
    const Product = Products.find(Product => Product.id === id);
    CartItems.push(Product);
    localStorage.setItem('CartItems', JSON.stringify(CartItems));
    updateCartUI();
    ShowProducts(); 
}

function DeleteToCart(id) {
    CartItems = CartItems.filter(item => item.id !== id);
    localStorage.setItem('CartItems', JSON.stringify(CartItems));
    updateCartUI();
    ShowProducts(); 
}

function updateCartUI() {
    CartProducts.innerHTML = '';
    let TotalPrice = 0;

    CartItems.forEach(Product => {
        const CartProduct = `
            <div class="cart-item">
                <div class="col-md-4">
                    <img src="${Product.img}" class="img-fluid rounded-start" alt="${Product.name}">
                </div>
                <div class="col-md-6">
                    <div class="card-body text-center">
                        <h5 class="card-title">${Product.name}</h5>
                        <p class="card-text"><strong>Price: $${Product.price}</strong></p>
                    </div>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-danger" onclick="DeleteToCart(${Product.id})">X</button>    
                </div>
            </div>
        `;
        CartProducts.innerHTML += CartProduct;
        TotalPrice += Product.price;
    });

    Total.textContent = `Total: $${TotalPrice}`;
    countCart.innerHTML = CartItems.length;
}

window.onload = function() {
    updateCartUI();
    ShowProducts(); 
};

CartBTN.addEventListener("click", () => {
    Cart.style.display="flex"
    overlay.style.display="block"
})
if(countCart.length === 0){
    countCart.innerHTML = 0
}else{
    countCart.innerHTML = CartProducts.children.length
}
overlay.addEventListener("click",()=>{
    Login.style.display="none"
    Cart.style.display="none"
    overlay.style.display="none"
})