# Node.js & PostgreSQL 

This is a Node.js module which connects to postgres database, using 'node-postgres'. You can simply create a new table, generate random data and query on entered records by using following scripts. 

#### Quick Start

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
    

#### Use
 ```js
 // To create new table 
npm run table 

// The default name for table is "product". 
// You can use "--table" or "-t" flag to create a table with your own selected name.
npm run table -- --table sample
//or
npm run table -- -t sample
```


```js
 // To insert random data in created table
npm run insert

// The default amount of rows which are added in each `npm insert` is 3. 
// You can use "--number" or "-n" flag to change the amount of rows.
npm run insert -- --number 100
//or
npm run insert -- -n 100
```

```js
 // To query on recorder data 
npm run query

// This command will query on product table by default. 
// If you've changed the table name, take care to use table flags here too.
npm run query -- -t sample
```