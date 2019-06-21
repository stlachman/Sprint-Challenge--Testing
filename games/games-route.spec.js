const server = require("../api/server");
const db = require("../data/dbConfig");
const request = require("supertest");

describe("Game Routes", () => {
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  beforeEach(async () => {
    await db("games").truncate();
  });

  it("responds with type json", () => {
    return request(server)
      .post("/games")
      .expect("Content-Type", /json/i);
  });

  it("responds with status of 201 when successful", async () => {
    const game = { title: "Zoom", genre: "Blaster", release_year: 1992 };
    await request(server)
      .post("/games")
      .send(game)
      .expect(201);
  });

  it("responds with status of 422 when missing genre", async () => {
    const game = { title: "Zoom" };
    await request(server)
      .post("/games")
      .send(game)
      .expect(422);
  });

  it("responds with status of 422 when missing title", async () => {
    const game = { genre: "Action" };
    await request(server)
      .post("/games")
      .send(game)
      .expect(422);
  });
});
