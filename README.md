# loopback-multitenancy

Multitenancy middleware for LoopBack.

## Tenant resolver middleware

Massages the URL path into an object populated with tenant information.

### Usage

```
var tenantResolver = require('loopback-multitenancy').tenantResolver;
app.use('/api/:tenantId/:modelId/:modelName', tenantResolver);

//req.tenant.id = :tenantId (String)
//req.tenant.modelId = :modelId (String)
//req.tenant.modelName = :modelName (String)
```

*ie. Takes `/api/One/Joe/Todo` and creates `req.tenant = {id: 'One' modelId: 'Joe',
modelName: 'Todo'}`*

## Model resolver middleware

Transforms the URL path to a namespaced URL path using the tenant data provided
in the request object (`req.tenant`).

*ie. Changes `/api/One/Joe/Todo` to `/api/One_Joe_Todo`*

## Usage

```
var modelResolver = require('loopback-multitenancy').modelResolver;
app.use(app.get('restApiRoot'), modelResolver);
app.use(app.get('restApiRoot'), loopback.rest());

//a request to /api/One/Joe/Todo comes in
//
//the tenant resolver massages the URL to a tenant object:
//req.tenant = {id: 'One', modelId: 'Joe', modelName: Todo};
//
//the model resolver sets modifies the endpoint based on the tenant data
//req.url = '/api/One_Joe_Todo';
```
