const request = require("supertest");

const server = require("../api/server.js");
const db = require("../data/db-config.js");

describe("Testing for /api/songs", function () {
  describe("api/songs/:id", function () {
    beforeEach(async () => {
      await db("users").truncate(); // empty the table and reset the id back to 1
    });

    it("/api/songs/:id should return 200 if right credentials were submitted (Johnnny)", function () {
      // make a POST request to /login endpoint on the server

      return request(server)
        .post("/api/auth/register")
        .send({
          username: "Johnny",
          password: "Yes",
          emailAddress: "sdfsdf@gmail.com",
        })
        .then((res) => {
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Johnny", password: "Yes" })
            .then((logicRes) => {
              // assert that the HTTP status code is 200
              expect(logicRes.body.id).toBe(2);
              expect(logicRes.status).toBe(200);
              expect(logicRes.body.message).toBe(`Welcome Johnny!`);

              return request(server)
                .get("/api/songs/2")
                .then((getRes) => {
                  expect(getRes.status).toBe(200);
                });
            });
        });
    });
  });
});
