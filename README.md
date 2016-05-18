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

*Takes `/api/1/Joe/Todo` and creates `req.tenant = {id: '1' modelId: 'Joe',
modelName: 'Todo'}`*

## Model resolver middleware

Transforms the URL path to a namespaced URL path using the tenant data provided
in the request object (`req.tenant`).

*Changes `/api/1/Joe/Todo` to `/api/1_Joe_Todo`*

## Usage

```
var modelResolver = require('loopback-multitenancy').modelResolver;
app.use(app.get('restApiRoot'), modelResolver);
app.use(app.get('restApiRoot'), loopback.rest());

//a request to /api/1/Joe/Todo comes in
//
//the tenant resolver massages the URL to a tenant object:
//req.tenant = {id: '1', modelId: 'Joe', modelName: Todo};
//
//the model resolver sets modifies the endpoint based on the tenant data
//req.url = '/api/1_Joe_Todo';
```
