
const express = require("express");
const tickets = require("../data/tickets");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { tickets: tickets.getAll() });
});

router.get("/tickets/new", (req, res) => {
  res.render("new-ticket");
});

router.post("/tickets", (req, res) => {
  const { title, description, priority } = req.body;

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    !title.trim() ||
    !description.trim() ||
    !["Niedrig", "Mittel", "Hoch"].includes(priority)
  ) {
    return res.status(400).send("Ungültige Ticketdaten.");
  }

  const ticket = tickets.create({ title, description, priority });
  res.redirect(`/tickets/${ticket.id}`);
});

router.get("/tickets/:id", (req, res) => {
  const ticket = tickets.getById(req.params.id);

  if (!ticket) {
    return res.status(404).send("Ticket nicht gefunden.");
  }

  res.render("ticket-detail", { ticket });
});

router.post("/tickets/:id/close", (req, res) => {
  if (!tickets.close(req.params.id)) {
    return res.status(404).send("Ticket nicht gefunden.");
  }

  res.redirect(`/tickets/${req.params.id}`);
});

module.exports = router;
