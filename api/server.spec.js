const request = require("supertest");

const server = require("./server.js");

describe("Testing for running server", function () {
  describe(".GET '/", function () {
    it("should return status 200 and message that SERVER is up", function () {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.message).toBe("Server is up and running");
        });
    });
  });
});
