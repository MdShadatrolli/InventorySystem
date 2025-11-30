async function loadActivities() {
    const res = await fetch(`${API}/activity`, {
        headers: authHeader()
    });

    const data = await res.json();
    const tbody = document.querySelector("#activityTable tbody");

    tbody.innerHTML = "";

    data.forEach(a => {
        tbody.innerHTML += `
            <tr>
                <td>${a.action}</td>
                <td>${a.user}</td>
            </tr>
        `;
    });
}

loadActivities();
