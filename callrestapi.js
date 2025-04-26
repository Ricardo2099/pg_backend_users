// Cambia esta URL a la que tengas de tu backend desplegado en Render
const API_URL = "https://pg-restapi-kcis.onrender.com/api/users";

// Función para obtener usuarios
async function getUsers() {
  const response = await fetch(API_URL);
  const users = await response.json();
  const list = document.getElementById("userList");
  list.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.innerHTML = `${user.name} - ${user.email} - ${user.age} años - ${user.comments} 
      <button onclick="deleteUser(${user.id})">Eliminar</button>`;
    list.appendChild(li);
  });
}

// Función para crear usuario
async function createUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = parseInt(document.getElementById("age").value);
  const comments = document.getElementById("comments").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, age, comments })
  });

  if (response.ok) {
    alert("Usuario creado exitosamente!");
    getUsers();
  } else {
    alert("Error creando usuario.");
  }
}

// Función para eliminar usuario
async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    alert("Usuario eliminado exitosamente!");
    getUsers(); // Recarga la lista
  } else {
    alert("Error eliminando usuario.");
  }
}
