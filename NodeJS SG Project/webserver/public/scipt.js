document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/personas")
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("tabla-personas");
            data.personas.forEach(persona => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${persona.id}</td>
                    <td>${persona.nombre}</td>
                    <td>${persona.apellido}</td>
                    <td>${persona.edad}</td>
                    <td>${persona.skills ? persona.skills.map(skill => Object.values(skill)[0]).join(", ") : "N/A"}</td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(error => console.error("Error cargando los datos:", error));
});
