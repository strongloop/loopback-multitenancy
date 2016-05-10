# loopback-multitenancy

Multitenancy components for LoopBack.

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
