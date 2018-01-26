var fs        = require('fs');
const Sequelize = require('sequelize');
// const sequelize = new Sequelize('postgres://postgres:jannat15@localhost/orm');



class User{
constructor(tableName, connString){
 this.tableName = tableName;
 this.sequelize = this.initiate(connString);
 this.model = this.createModel(this.tableName);


}
 initiate(connstring){
  console.log(' Sequelize Go!');
  return new Sequelize(connstring);
}
createModel(tableName){
    return this.sequelize.define('test_user', {
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
      },
      lastName: {
        type: Sequelize.STRING
      }
    }, {
      freezeTableName: true // Model tableName will be the same as the model name
    });
}

// User.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'Jakson',
//     lastName: 'Pallock'
//   });
// });
// }
  getAll(cb)
  {
    this.model.sync();
    this.model.findAll().then(function(rows) {
       var data = [];
       for(var i = 0; i < rows.length; i++) {
         data.push(rows[i].dataValues);
       }
       console.log(data);
       return cb(data);
    });
  }

  insertIntoTable(values, callback){
  var tableRef = this.model;
  this.model.sync().then(function(){
    tableRef.create(values);
    callback();
  });
}



findById(id, cb)
{
  this.model.findAll({
    where: {
      id: id
    }
  }).then(function(rows) {
     var data = [];
     for(var i = 0; i < rows.length; i++) {
       data.push(rows[i].dataValues);
     }
     return cb(data);
  });
}

}



// export user class

module.exports = User;
