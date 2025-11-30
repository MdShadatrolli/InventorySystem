// LOAD PRODUCTS TABLE
if (document.getElementById("productTable")) loadProducts();

async function loadProducts() {
    const res = await fetch(`${API}/products`, {
        headers: authHeader()
    });
    const data = await res.json();

    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    data.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.qty}</td>
                <td>${p.price}</td>
                <td>${p.supplier}</td>
            </tr>
        `;
    });
}

// ADD PRODUCT
if (document.getElementById("addProductForm")) {
    document.getElementById("addProductForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const product = {
            name: document.getElementById("name").value,
            qty: document.getElementById("qty").value,
            price: document.getElementById("price").value,
            supplier: document.getElementById("supplier").value
        };

        const res = await fetch(`${API}/products`, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify(product)
        });

        const data = await res.json();
        document.getElementById("msg").textContent = "Product added!";
    });
}
