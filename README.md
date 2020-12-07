# Node.js & PostgreSQL 

A simple Node.js module which connects to postgres database, using 'node-postgres' and supports both single and batch insert.

The batch insert can be performed either by using "pg-promise" or "pg-format" modules.


### Quick Start

 ```
git clone https://github.com/fsefidabi/postgres-node.git

npm i
  ```

### Use

- Insert new random rows

```js
// Insert single rows:
npm run insert

// Batch insert using 'pg-promise' module:
npm run pg-promise

// Batch insert using 'pg-format' module:
npm run pg-format
```

- Query on records
```js
// Using 'node-postgres' module: 
npm run pg-query

// Using 'pg-promise' module: 
npm run pgp-query

```