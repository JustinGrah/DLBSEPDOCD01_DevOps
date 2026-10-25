
const tickets = [
  {
    id: 1,
    title: "Drucker funktioniert nicht",
    description: "Der Netzwerkdrucker reagiert nicht.",
    priority: "Hoch",
    status: "Offen"
  },
  {
    id: 2,
    title: "Zugriff auf Testsystem",
    description: "Zugriff auf die Testumgebung wird benötigt.",
    priority: "Mittel",
    status: "In Bearbeitung"
  }
];

let nextId = 3;

function getAll() {
  return tickets;
}

function getById(id) {
  return tickets.find(ticket => ticket.id === Number(id));
}

function create(data) {
  const ticket = {
    id: nextId++,
    title: data.title.trim(),
    description: data.description.trim(),
    priority: data.priority,
    status: "Offen"
  };

  tickets.push(ticket);
  return ticket;
}

function close(id) {
  const ticket = getById(id);

  if (!ticket) return false;

  ticket.status = "Geschlossen";
  return true;
}

module.exports = { getAll, getById, create, close };
