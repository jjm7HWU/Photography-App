# Using the /interact API

All user interactions - such as hearting, following, commenting, etc. - will be facilitated by the api at /api/interact. The mobile application will send JSON objects to this API with attributes defining the interaction the user wishes to make. This document specifies the formats to be used for each interaction and any other information relating to usage of the API.

## Formats

### Heart

``` javascript
{
  action: "heart",
  sourceUser: string,     // username of user hearting photo
  photoRef: string        // reference number of photo to heart
}
```

### Follow

``` javascript
{
  action: "follow",
  sourceUser: string,     // username of user performing follow
  username: string,       // username of user to be followed
}
```

### Comment

``` javascript
{
  action: "comment",
  sourceUser: string,   // username of user leaving the comment
  photoRef: string,     // reference number of photo to leave comment on
  comment: string       // contents of comment
}
```

## Response

The API will respond with an object containing a `success` attribute. This attribute equals true if the interaction was performed successfully and false otherwise.
