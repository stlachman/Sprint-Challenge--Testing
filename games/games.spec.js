const server = require("../api/server");
const db = require("../data/dbConfig");
const Games = require("./games-model");
const request = require("supertest");

describe("Game Routes", () => {
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  beforeEach(async () => {
    await db("games").truncate();
  });

  describe("POST /games", () => {
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

    it("sends the correct body type", () => {
      const game = {
        id: 1,
        title: "Zoom",
        genre: "Blaster",
        release_year: 1992
      };
      return request(server)
        .post("/games")
        .send(game)
        .then(res => {
          let newGame = res.body;
          expect(newGame).toEqual(game);
        })
        .catch(err => {
          console.log(err);
        });
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

    it("inserts provided game into db", async () => {
      let game = {
        id: 1,
        title: "Zoom",
        genre: "Blaster",
        release_year: 1992
      };
      let inserted = await Games.insert(game);

      expect(inserted.title).toBe(game.title);
    });
  });

  describe("GET /games", () => {
    it("responds with status of 200 when successful", async () => {
      await request(server)
        .get("/games")
        .expect(200);
    });

    it("should return an array of games", async () => {
      let games = await db("games");
      Games.insert({ title: "Zoom", genre: "Blaster", release_year: 1992 });
      Games.insert({ title: "Halo", genre: "Shooter", release_year: 2002 });
      games = await db("games");

      expect(games).toEqual([
        { id: 1, title: "Zoom", genre: "Blaster", release_year: 1992 },
        { id: 2, title: "Halo", genre: "Shooter", release_year: 2002 }
      ]);
    });

    it("should return empty array if no games are found", async () => {
      const games = await db("games");
      expect(Array.isArray(games)).toBe(true);
    });
  });
});
