# Node.js & PostgreSQL 

A simple Node.js module which connects to postgres database, using 'node-postgres' and supports bulk insert.


### Quick Start

 ```
git clone https://github.com/fsefidabi/postgres-node.git

npm i
  ```

### Use

 _Using "-idx" suffix on each command will connect you to the related table with indexed columns._

- **Insert new random rows**

Using these commands will automatically generate new table and insert random rows into created table.

```js
npm run bulk
// or 
npm run bulk-idx
```

- **Query on records**
```js
npm run query
// or 
npm run query-idx
```

- **Drop / delete a table**
```js
npm run drop
// or
npm run drop-idx
```

 In case you want to create column indexes on your own table manually, you can use ```npm run index```.


> Configuration options:
> 
> Table name: -t _my_table_ (default value: _devices_)
> 
> Batch size: --bs _1000_ (default value: _500_)
> 
> Number of inserting rows in each 'npm run bulk' command: -n _1000_ (default value: _1.000.000_)
