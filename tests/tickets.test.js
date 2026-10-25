
const request = require("supertest");
const app = require("../src/app");

describe("Support-Ticket-Anwendung", () => {
  test("zeigt die Ticketübersicht an", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Ticketübersicht");
  });

  test("liefert einen erfolgreichen Health-Check", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("weist unbekannte Tickets zurück", async () => {
    const response = await request(app).get("/tickets/999999");

    expect(response.status).toBe(404);
  });

  test("weist ungültige Ticketdaten zurück", async () => {
    const response = await request(app)
      .post("/tickets")
      .send({
        title: "",
        description: "",
        priority: "Unbekannt"
      });

    expect(response.status).toBe(400);
  });
});
