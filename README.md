# Node.js & PostgreSQL

Simple Node.js module that connects to postgres database, using 'node-postgres' and package and supports bulk insert.

## Quick Start

 ```
git clone https://github.com/fsefidabi/nodejs-postgres.git

npm i
  ```

## Use

### Connect to postgres database

 _1. Using these commands will automatically generate a new table and insert random rows into created table._

 _2. Using "-idx" suffix on each command will connect you to the related table with indexed columns._

- Insert new random rows `npm run bulk` or `npm run bulk-idx`

- Query on records `npm run query` or `npm run query-idx`

- Drop / delete a table `npm run drop` or `npm run drop-idx`

---


> Configuration options in both postgres and clickhouse databases:
> 
> Table name: -t _my_table_ (default value: _devices_)
> 
> Batch size: --bs _1000_ (default value: _10000_)
