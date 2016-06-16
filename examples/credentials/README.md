# Credentials (header) scheme

Credential schemes provide tenant information as credentials or as part of the
access token (ie. in the HTTP headers or query parameters).

In this example, we provide the credentials using basic access authentication
(AKA basic auth).

## Usage

```shell
npm start

curl -u Joe:doe localhost:3000/api/Joe/Todos
# returns [{"content":"a","id":1},{"content":"b","id":2},{"content":"c","id":3}]

curl -u Bob:doe localhost:3000/api/Bob/Todos
# returns [{"content":"d","id":1},{"content":"e","id":2},{"content":"f","id":3}]
```
