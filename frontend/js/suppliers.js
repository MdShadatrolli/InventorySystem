// LOAD SUPPLIERS
if (document.getElementById("supplierTable")) loadSuppliers();

async function loadSuppliers() {
    const res = await fetch(`${API}/suppliers`, {
        headers: authHeader()
    });

    const data = await res.json();
    const tbody = document.querySelector("#supplierTable tbody");

    tbody.innerHTML = "";

    data.forEach(s => {
        tbody.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.contact}</td>
            </tr>
        `;
    });
}

// ADD SUPPLIER
if (document.getElementById("addSupplierForm")) {
    document.getElementById("addSupplierForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const supplier = {
            name: document.getElementById("name").value,
            contact: document.getElementById("contact").value
        };

        const res = await fetch(`${API}/suppliers`, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify(supplier)
        });

        document.getElementById("msg").textContent = "Supplier added!";
    });
}
