const apiUrl = "http://localhost:3000/products";

async function getProducts() {
    try {
        const response = await fetch(apiUrl);

        if(!response.ok){
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const products = await response.json();
        return products;

    } catch (error) {
        console.error("Error al buscar los productos: ",error);
        return[];
    }
}

async function addProduct(product) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        if(!response.ok){
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error para agregar el producto", error);
        return null;
    }
    
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`,{
            method: "DELETE"
        });

        if(!response.ok){
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return true;
    } catch (error) {
        console.error("Error al eliminar el producto", error);
        return false;   
    }
}


export {getProducts, addProduct, deleteProduct};