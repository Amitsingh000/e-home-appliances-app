import products from "./api/products.json";
import { getCartProductFromLS } from "./getCartProducts";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";
import { incrementDecrement } from "./incrementDecrement";


let cartProducts = getCartProductFromLS();
let filterProducts = products.filter((curProd) => {
    return cartProducts.some((curElem) => curElem.id === curProd.id);
});

// to update the addtocart page

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

// show cart product

const showCartProduct = () => {
    filterProducts.forEach((curProd) => {
        const { category, id, image, name, stock, price } = curProd;

        let productClone = document.importNode(templateContainer.content, true);

        const lSActualData = fetchQuantityFromCartLS(id, price);

        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;

        productClone.querySelector(".productQuantity").textContent = lSActualData.quantity;
        productClone.querySelector(".productPrice").textContent = lSActualData.price;


        //handle Increment and Decrement
        productClone.querySelector(".stockElement").addEventListener("click", (event) => {
            incrementDecrement(event, id, stock, price);
        })

        // handle remove from cart button.    
        productClone.querySelector(".remove-to-cart-button")
            .addEventListener("click", () => removeProdFromCart(id));

        cartElement.appendChild(productClone);
    });
};

// Showing the cartProducts
showCartProduct();

// calculating the card total in our cartProducts page
updateCartProductTotal();
