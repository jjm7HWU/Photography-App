# Custom User APIs

All user-specific APIs - e.g. user feed, account settings, etc. - can be found in the [/api/api_custom.js](https://github.com/jjm7HWU/Photography-App/blob/main/api/api_custom.js) module. All API calls require the client to specify the user as well as their key to verify their identity. This document contains usage information for each API.

The `postMethodFetch` function can be used to call all of these APIs. Examples of this function being used can be found at [/public/scripts/search.js](https://github.com/jjm7HWU/Photography-App/blob/main/public/scripts/search.js) and [/public/scripts/register.js](https://github.com/jjm7HWU/Photography-App/blob/main/public/scripts/register.js).

In this document, the **Fetch Body Format** subsections specify the format of the object to be passed as the first parameter to the `postMethodFetch` function. The name of the API, found in the header (for example `/api_custom/feed`), is passed as the second argument to `postMethodFetch`. The **Response Format** subsections in this document specify the format of the response. This response is passed to the function in the third parameter of `postMethodFetch`. Example responses are provided in the **Response Format** subsections.

## /api_custom/feed

The `/api_custom/feed` API returns the requesting user's feed. This currently includes posts posted by users they follow and posts shared by those users.

#### Fetch Body Format

``` javascript
{
  sourceUser: string,   // username of user making request
  userKey: string       // user's key
}
```

#### Response Format

``` javascript
{
  success: true,
  feed: array           // list of feed items (examples below)
}
```

#### Response Example

The following response contains two feed items.
The first is a new post from the user Mitch55 with reference number 327.
The second is a post with reference number 164 that has been shared by the user Alfonso.

``` javascript
{
  success: true,
  feed: [
    { type: "post", username: "Mitch55", ref: 327 },
    { type: "share", username: "Alfonso", ref: 164 },
  ]
}
```
