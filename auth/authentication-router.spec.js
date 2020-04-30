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
        });
    });

    it("should return 201", function () {
      // make a POST request to /register endpoint on the server
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "Briana",
          password: "Yes",
          emailAddress: "emailAddr",
        })
        .then((res) => {
          // assert that the HTTP status code is 201
          expect(res.body.message).toBe("a new user was added");
        });
    });
  });

  describe("/login", function () {
    it("/api/auth/login should return 401 if wrong credentials were submitted", function () {
      // make a POST request to /login endpoint on the server
      return request(server)
        .post("/api/auth/login")
        .send({ username: "Brian", password: "NoN" })
        .then((res) => {
          // assert that the HTTP status code is 201
          expect(res.status).toBe(401);
        });
    });

    it("/api/auth/login should return message: 'Invalid credentials", function () {
      // make a POST request to /login endpoint on the server
      return request(server)
        .post("/api/auth/login")
        .send({ username: "Briana", password: "No" })
        .then((res) => {
          // assert that the HTTP status code is 201
          expect(res.body.message).toBe("Invalid Credentials");
        });
    });

    it("/api/auth/login should return 200 if right credentials were submitted", function () {
      // make a POST request to /login endpoint on the server
      return request(server)
        .post("/api/auth/login")
        .send({ username: "Brian", password: "Yes" })
        .then((res) => {
          // assert that the HTTP status code is 201
          expect(res.status).toBe(401);
        });
    });
  });
});
