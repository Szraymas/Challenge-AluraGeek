import { getProducts, addProduct, deleteProduct } from "./API.js";

async function displayProducts() {
    const products = await getProducts();
    const productsGrid = document.querySelector(".products-grid");
    productsGrid.innerHTML = "";

    products.forEach(product =>  {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const imgElement = document.createElement("img");
        imgElement.src = product.image;
        imgElement.alt = product.name;

        const nameElement = document.createElement("p");
        nameElement.textContent = product.name;

        const priceElement = document.createElement("p");
        priceElement.textContent = `$ ${product.price.toFixed(2)}`;
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => handleDeleteProduct(product.id, productCard));
       
        productCard.appendChild(imgElement);
        productCard.appendChild(nameElement);
        productCard.appendChild(priceElement);
        productCard.appendChild(deleteButton);


        productsGrid.appendChild(productCard);
    });
}

async function handleAddProduct(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const price = parseFloat(document.querySelector('input[name="price"]').value.replace(",", "."));
    const image = document.querySelector('input[name="image"]').value;

    const newProduct = {name, price, image};

    const addedProduct = await addProduct(newProduct);

    if(addedProduct){
        displayProducts();
        event.target.reset();
    }else{
        alert("No se puede agregar el producto");
    }
    
}


async function handleDeleteProduct(id, productCard) {
    const isDeleted = await deleteProduct(id);

    if(isDeleted){
        productCard.remove();
        alert(`Producto con ID ${id} eliminado exitosamente`);
    }else{
        alert("NO se pudo eliminar el producto");
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();

    const addedProductForm = document.querySelector(".add-product-form form");
    addedProductForm.addEventListener("submit", handleAddProduct);
});

