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
// Single insertion (using "pg" package):
npm run single

// Batch insertion (using "pg-promise" package):
npm run bulk
```

- Query on records
```js
npm run query
```