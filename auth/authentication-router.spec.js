const request = require("supertest");

const server = require("../api/server.js");
const db = require("../data/db-config.js");

describe("POST /api/auth", function () {
  describe("/register", function () {
    beforeEach(async () => {
      await db("users").truncate(); // empty the table and reset the id back to 1
    });

    it("should return 201", function () {
      // make a POST request to /register endpoint on the server
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Brian", password: "No", emailAddress: "emailAddr" })
        .then((res) => {
          // assert that the HTTP status code is 201
          expect(res.status).toBe(201);
          expect(res.body.message).toBe("a new user was added");
        });
    });
  });

  describe("POST /api/login", function () {
    it("/api/auth/login should return 401 if wrong credentials were submitted", function () {
      // make a POST request to /login endpoint on the server
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "Liza",
          password: "No",
          emailAddress: "emailAddremail",
        })
        .then((res) => {
          expect(res.status).toBe(201);
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Liza", password: "NoN" })
            .then((loginRes) => {
              // assert that the HTTP status code is 401
              expect(loginRes.status).toBe(401);
              expect(loginRes.body.message).toBe("Invalid Credentials");
            });
        });
    });

    it("/api/auth/login should return 200 if right credentials were submitted", function () {
      // make a POST request to /login endpoint on the server
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "Cori",
          password: "Hi",
          emailAddress: "emailAddremailAdds",
        })
        .then((res) => {
          expect(res.status).toBe(201);
          expect(res.body.message).toBe("a new user was added");
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Cori", password: "Hi" })
            .then((loginRes) => {
              // assert that the HTTP status code is 200
              expect(loginRes.status).toBe(200);
              expect(loginRes.body.message).toBe("Welcome Cori!");
            });
        });
    });
  });
});
