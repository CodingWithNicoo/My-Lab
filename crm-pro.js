let contacts = JSON.parse(localStorage.getItem("contacts_pro")) || [];

const form = document.getElementById("contactForm");
const list = document.getElementById("contactList");
const search = document.getElementById("search");

/* ===== GUARDAR ===== */
function save() {
  localStorage.setItem("contacts_pro", JSON.stringify(contacts));
}

/* ===== RENDER ===== */
function render(filter = "") {
  list.innerHTML = "";

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(c => {
    const card = document.createElement("div");
    card.className = "contact-item";

    const img = document.createElement("img");
    img.src = c.avatar || "https://i.imgur.com/1Q9Z1ZC.png";

    const data = document.createElement("div");
    data.className = "contact-data";
    data.innerHTML = `
      <h3>${c.name}</h3>
      <p>${c.email}</p>
      <p>${c.category} • <span class="tags">${c.tags}</span></p>
    `;

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.innerHTML = `
      <button onclick="openModal('${c.id}')">🔍</button>
      <button onclick="editContact('${c.id}')">✏️</button>
      <button onclick="deleteContact('${c.id}')">🗑️</button>
    `;

    card.append(img, data, actions);
    list.appendChild(card);
  });
}

/* ===== CREAR/EDITAR ===== */
form.addEventListener("submit", e => {
  e.preventDefault();

  const id = document.getElementById("contactId").value;

  const newContact = {
    id: id || crypto.randomUUID(),
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    tags: document.getElementById("tags").value,
    category: document.getElementById("category").value,
    notes: document.getElementById("notes").value,
    avatar: avatarPreview
  };

  if (id) {
    const i = contacts.findIndex(c => c.id === id);
    contacts[i] = newContact;
  } else {
    contacts.push(newContact);
  }

  save();
  render();
  form.reset();
  avatarPreview = null;
  document.getElementById("contactId").value = "";
});

/* ===== AVATAR ===== */
let avatarPreview = null;

document.getElementById("avatar").addEventListener("change", e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => avatarPreview = reader.result;
  reader.readAsDataURL(file);
});

/* ===== EDIT ===== */
function editContact(id) {
  const c = contacts.find(x => x.id === id);
  document.getElementById("contactId").value = c.id;
  document.getElementById("name").value = c.name;
  document.getElementById("email").value = c.email;
  document.getElementById("phone").value = c.phone;
  document.getElementById("tags").value = c.tags;
  document.getElementById("category").value = c.category;
  document.getElementById("notes").value = c.notes;
  avatarPreview = c.avatar;
}

/* ===== DELETE ===== */
function deleteContact(id) {
  contacts = contacts.filter(c => c.id !== id);
  save();
  render();
}

/* ===== SEARCH ===== */
search.addEventListener("input", e => {
  render(e.target.value);
});

/* ===== MODAL ===== */
function openModal(id) {
  const c = contacts.find(x => x.id === id);

  document.getElementById("modalBody").innerHTML = `
    <img src="${c.avatar || "https://i.imgur.com/1Q9Z1ZC.png"}" style="width:100px; border-radius:50%; margin-bottom:10px;">
    <h2>${c.name}</h2>
    <p><strong>Email:</strong> ${c.email}</p>
    <p><strong>Teléfono:</strong> ${c.phone}</p>
    <p><strong>Categoría:</strong> ${c.category}</p>
    <p><strong>Tags:</strong> ${c.tags}</p>
    <p><strong>Notas:</strong><br>${c.notes}</p>
  `;

  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

/* ===== EXPORT ===== */
function exportContacts() {
  const blob = new Blob([JSON.stringify(contacts)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contacts.json";
  a.click();
}

/* ===== IMPORT ===== */
document.getElementById("importFile").addEventListener("change", e => {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      contacts = JSON.parse(reader.result);
      save();
      render();
    } catch {
      alert("Archivo inválido");
    }
  };
  reader.readAsText(e.target.files[0]);
});

/* ===== START ===== */
render();
