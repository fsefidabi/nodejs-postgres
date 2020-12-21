# PostgreSQL $ ClickHouse database 

Simple Node.js modules that connect to postgres or clickhouse database, using 'node-postgres' and '@apla/clickhouse' packages.

## Quick Start

 ```
git clone https://github.com/fsefidabi/postgres-clickhouse.git

npm i
  ```

## Use

### Connect to postgres database

 _1. Using "-idx" suffix on each command will connect you to the related table with indexed columns._ Example: for insert batch data into indexed table: `npm run pg-bulk-idx`

 _2. Using these commands will automatically generate a new table and insert random rows into created table._

- Insert new random rows `npm run pg-bulk`

- Query on records `npm run query`

- Drop / delete a table `npm run pg-drop`

---

### Connect to clickhouse database

- Create a new table ``` npm run ch-table```

- Insert new random rows `npm run ch-bulk`

- Drop / delete a table `npm run ch-drop`


> Configuration options in both postgres and clickhouse databases:
> 
> Table name: -t _my_table_ (default value: _devices_)
> 
> Batch size: --bs _1000_ (default value: _10000_)
