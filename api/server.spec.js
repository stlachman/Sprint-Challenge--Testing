const server = require("./server");
const request = require("supertest");

describe("Root Route", () => {
  describe("GET /", () => {
    it("should return status 200 ok", () => {
      return request(server)
        .get("/")
        .expect(200);
    });
  });
});
