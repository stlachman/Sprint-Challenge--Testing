const server = require("./server");
const request = require("supertest");

describe("Game Routes", () => {
  describe("GET /games", () => {
    it("should return status 200 ok", () => {
      return request(server)
        .get("/games")
        .expect(200);
    });

    it("should return a list of games", () => {
      return request(server)
        .get("/games")
        .then(res => {
          expect(res.body).toEqual({ games: [] });
        });
    });
  });
});
