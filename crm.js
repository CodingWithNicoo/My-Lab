let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const searchInput = document.getElementById("search");

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts(filter = "") {
  contactList.innerHTML = "";

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(contact => {
    const card = document.createElement("div");
    card.className = "contact-item";

    card.innerHTML = `
      <div class="contact-header">
        <h3>${contact.name}</h3>
        <div class="contact-actions">
          <button onclick="editContact('${contact.id}')">✏️</button>
          <button onclick="deleteContact('${contact.id}')">🗑️</button>
        </div>
      </div>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Teléfono:</strong> ${contact.phone || "—"}</p>
      <p><strong>Notas:</strong> ${contact.notes || "—"}</p>
    `;

    contactList.appendChild(card);
  });
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("contactId").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const notes = document.getElementById("notes").value;

  if (id) {
    // Editar existente
    const contact = contacts.find(c => c.id === id);
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.notes = notes;
  } else {
    // Crear nuevo
    contacts.push({
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      notes
    });
  }

  saveContacts();
  renderContacts();
  contactForm.reset();
  document.getElementById("contactId").value = "";
});

function editContact(id) {
  const c = contacts.find(x => x.id === id);

  document.getElementById("contactId").value = c.id;
  document.getElementById("name").value = c.name;
  document.getElementById("email").value = c.email;
  document.getElementById("phone").value = c.phone;
  document.getElementById("notes").value = c.notes;
}

function deleteContact(id) {
  contacts = contacts.filter(c => c.id !== id);
  saveContacts();
  renderContacts();
}

searchInput.addEventListener("input", (e) => {
  renderContacts(e.target.value);
});

// Render inicial
renderContacts();
