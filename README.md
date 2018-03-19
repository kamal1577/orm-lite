# orm-lite
Object-Relational Mapping(ORM) using Sequelize

## The middleware has a function named initialize that:
* Takes in a connection string as a parameter
* Connects to the postgres database
## The middleware has a function named getAll that:
* Takes the name of a table as a parameter, as well as a 'callback' parameter
* Connects to the postgres database and retrieve the contents of that table in an array
* Invokes the callback with the table contents
## The middleware has a function named findById that:
* Behaves similarly to getAll above, except that it additionally accepts an 'id' parameter
* Retrieve the row specified by the id and send it to the callback
