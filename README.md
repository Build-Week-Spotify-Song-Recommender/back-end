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
  "allSavedSongs": [
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

## Add to Favorite songs

Make a POST request to:

https://spotify-song-suggester-project.herokuapp.com/api/songs/:id

where :id in the URL is the id of the user.

The POST request must include the following fields in the request body as JSON:

```
{
  "title": "song1",
  "artist": "artist1",
  "album": "album1",
  "album_cover_art": "linkToImage"
}
```

If successful, the POST request will send back the following response, also as JSON:

```
{
  "message": "a new song was added to favorites"
}
```

---

## Delete a song from favorite songs

Make a DELETE request to:

https://spotify-song-suggester-project.herokuapp.com/api/songs/:id

where :id in the URL is the id of the user.

The DELETE request must include the following fields in the request body as JSON:

```
{
  "title": "song1"
}
```

If successful, the DELETE request will send back the following response, also as JSON:

```
{
  "message": `${songTitle} was removed from favorites`
}
```

---

## Get suggestions based on a title and artist on a song

Make a GET request to:

https://spotify-song-suggester-project.herokuapp.com/api/recommendedsongs

This is api can only be used if the user is logged in and have a valid token

The GEt request must include the following fields in the request body as JSON:

```
{
  "title": "justin bieber",
  "artist" "sorry"
}
```

If successful, the GET request will send back six suggested songs as the response, also as JSON:

```
{
    "results": [
        {
            "title": "Straight Through My Heart",
            "artist": "Backstreet Boys",
            "album": "This Is Us",
            "album_cover_art": "https://i.scdn.co/image/ab67616d0000b2731c5da65d09721ebfbc778d15"
        },
        {
            "title": "Lonesome Rider",
            "artist": "Volbeat",
            "album": "Outlaw Gentlemen & Shady Ladies",
            "album_cover_art": "https://i.scdn.co/image/ab67616d0000b27357e78d8652bc2c54332888b7"
        },
        {
            "title": "I Want To Break Free",
            "artist": "Queen",
            "album": "Bohemian Rhapsody (The Original Soundtrack)",
            "album_cover_art": "https://i.scdn.co/image/ab67616d0000b27328581cfe196c266c132a9d62"
        },
        {
            "title": "Son of Robot",
            "artist": "Dance Gavin Dance",
            "album": "Artificial Selection",
            "album_cover_art": "https://i.scdn.co/image/ab67616d0000b2734e58254b9df774aed7401178"
        },
        {
            "title": "You Calling My Name",
            "artist": "GOT7",
            "album": "Call My Name",
            "album_cover_art": "https://i.scdn.co/image/ab67616d0000b273e4d85babdbdecf2c21568ea0"
        },
        {
            "title": "Irony of Dying on Your Birthday",
            "artist": "Senses Fail",
            "album": "Let It Enfold You",
            "album_cover_art": "https://i.scdn.co/image/ab67616d0000b2737ea194192fd7de75a6379813"
        }
    ]
}

```

---

=======

# back-end

Back-end work goe shere

- [Product Vision Document](https://www.notion.so/nburkhal/Product-Vision-Document-for-Spotify-App-7dfcfe55daea496f804b47f2cac62174)
  > > > > > > > master
