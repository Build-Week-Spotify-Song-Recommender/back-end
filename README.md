<<<<<<< HEAD
# Welcome to the spotify song suggester backend documentation!

### More endpoints will be added to this document as they become available.

---

## User Registration

Make a POST request to:

https://spotify-song-suggester-project.herokuapp.com/api/auth/register

The registration request must include the following fields in the request body as JSON:

```
{
  "username": "adamuser",
  "password": "password",
  "emailAddress": "emailAddress"
}
```

If successful, the registration request will get the following response, also as JSON:

```
{
  "message": 'a new user was added'
}
```

---

## User Login

Make a POST request to:

https://spotify-song-suggester-project.herokuapp.com/api/auth/login

The login request must include the following fields in the request body as JSON:

```
{
  "username": "adamuser",
  "password": "password"
}
```

If successful, the login request will get the following response, also as JSON:

```
{
  "message": `Welcome ${user.username}!`,
  "id": "2"
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pbmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTU4MzE2Nzg4NywiZXhwIjoxNTgzMjU0Mjg3fQ.v6rRltdEr30KAzXbpPkVv1DFXa7t5lBRXRquHMvzmic"
}
```

---

## Favorite songs

Make a GET request to:

https://spotify-song-suggester-project.herokuapp.com/api/songs/:id

where :id in the URL is the id of the user.

If successful, the GET request will send back the following response, also as JSON:

```
{
  allSavedSongs: [
    {
      "title": "try1",
      "artist": "firsttry",
      "album": "firstalbum",
      "album_cover_art": "fdsdf"
    },
    {
      "title": "try2",
      "artist": "secondtry",
      "album": "secondalbum",
      "album_cover_art": "fdsdf"
    },
  ]
}
```

---
=======
# back-end
Back-end work goe shere

 - [Product Vision Document](https://www.notion.so/nburkhal/Product-Vision-Document-for-Spotify-App-7dfcfe55daea496f804b47f2cac62174)
>>>>>>> master
