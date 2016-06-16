# URL scheme

An example demonstrating tenant information being provided as part of the URL
scheme (ie. `/api/One/Joe/Todo` -> `/api/One_Joe_Todos`).

## Usage

```shell
npm start

curl localhost:3000/api/One/Joe/Todos
# returns [{"content":"a","id":1},{"content":"b","id":2},{"content":"c","id":3}]

curl localhost:3000/api/Two/Bob/Todos
# returns [{"content":"d","id":1},{"content":"e","id":2},{"content":"f","id":3}]
```
