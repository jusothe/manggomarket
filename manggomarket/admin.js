document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("product-form");
    const list = document.getElementById("admin-product-list");
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function renderList() {
        list.innerHTML = "";
        products.forEach((p, index) => {
            const li = document.createElement("li");
            li.textContent = `${p.name} - ${p.price} VND`;
            list.appendChild(li);
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("product-name").value;
        const price = document.getElementById("product-price").value;
        products.push({ name, price });
        localStorage.setItem("products", JSON.stringify(products));
        renderList();
        form.reset();
    });

    renderList();
});
