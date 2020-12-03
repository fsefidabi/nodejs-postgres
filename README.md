# Node.js & PostgreSQL 

A simple Node.js module which connects to postgres database, using 'node-postgres' and 'pg-copy-streams' which supports bulk insert. You can simply create a new table, generate and insert random data or insert you own records as CSV file by using following scripts.


### Quick Start

1. Clone the repository by entering bellow code in your terminal
 
    ```git clone https://github.com/fsefidabi/postgres-node.git```

2. Install the requirements by typing ```npm i```

3. Start your postgres server. 

The default values for server information are: "username: postgres", "password: postgres", "host: localhost", "port: 5432".
If your database setting is different, please use following flags while working with npm commands.

To change the username, use ```-user``` or ```-u```.
    
To change the password, use ```-password``` or ```-p```.
    
To change the host address, use ```-host``` or ```-h```.
    
To change the port number, use ```-port``` or ```-p```.
    

### Use
- Create new table
```
npm run table 

// The default name for table is "product". 
// You can use "--table" or "-t" flag to create a table with your own selected name.
npm run table -- --table tableName
//or
npm run table -- -t tableName
```

The default value of table name in each of the following commands has been set to 'product'. If you've created a table with a specific name, remember to use ```--table``` or ```-t``` flag to assign your own table name.
- Insert random data in created table
```
npm run insert

// The default amount of rows which are added in each `npm insert` is 3. 
// You can use "--number" or "-n" flag to change the amount of rows.
npm run insert -- --number 100
//or
npm run insert -- -n 100
```

- Generate and insert bulk random data
```
npm run bulk-insert
```

- Insert data from CSV file
```
 // Use '--file' or '-f' flag to specify the CSV file name.
 // The default value has been set on sample
npm run csv-insert -- --file sample
//or
npm run csv-insert -- -f sample
```

- Query on recorded data
```
npm run query
```
