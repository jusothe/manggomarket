document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `<h3>${product.name}</h3><p>${product.price} VND</p>`;
        productList.appendChild(div);
    });
});
