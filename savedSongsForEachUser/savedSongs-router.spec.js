const request = require("supertest");

const server = require("../api/server.js");
const db = require("../data/db-config.js");

describe("Testing for /api/songs", function () {
  describe("POST and GET for api/songs/:id", function () {
    beforeEach(async () => {
      await db("users").truncate(); // empty the table and reset the id back to 1
      await db("songs").truncate();
      await db("savedSongs").truncate();
    });

    it("/api/songs/:id should return 200 if the song was added to (Johnnny)`s list", function () {
      // make a POST request to /login endpoint on the server

      //register a new user
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "Johnny",
          password: "Yes",
          emailAddress: "sdfsdf@gmail.com",
        })
        .then((res) => {
          //log in
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Johnny", password: "Yes" })
            .then((loginRes) => {
              // assert that the HTTP status code is 200
              expect(loginRes.body.id).toBe(1);
              expect(loginRes.status).toBe(200);
              expect(loginRes.body.message).toBe(`Welcome Johnny!`);

              //save the token
              const token = loginRes.body.token;

              //initialize a song as it would be in the real app
              const songObj = {
                title: "never say never",
                artist: "justin bieber",
                album: "IDM",
                album_cover_art:
                  "https://i.scdn.co/image/ab67616d0000b273aa6b03f85a0f2cb16e88ec0c",
              };

              //here we make a post request to add songObj to favorite songs of
              //the user with ID 1
              return request(server)
                .post("/api/songs/1")
                .set("Authorization", token)
                .send(songObj)
                .then((postRes) => {
                  expect(postRes.status).toBe(201);
                  expect(postRes.body.message).toBe(
                    "a new song was added to favorites"
                  );

                  //here we make a get request to see that songObj
                  //is one  of favorite songs of the user with ID 1
                  return request(server)
                    .get("/api/songs/1")
                    .set("Authorization", token)
                    .then((getRes) => {
                      expect(getRes.status).toBe(200);
                      expect(getRes.body.allSavedSongs).toHaveLength(1);

                      const songTitle = songObj.title;

                      //here we make a delete request to remove songObj
                      //from favorite songs of the user with ID 1
                      return request(server)
                        .delete("/api/songs/1")
                        .set("Authorization", token)
                        .send(songTitle)
                        .then((deleteRes) => {
                          expect(deleteRes.status).toBe(200);
                          expect(deleteRes.body.message).toBe(
                            `${songTitle}removed from favorites`
                          );
                        });
                    });
                });
            });
        });
    });
  });
});
