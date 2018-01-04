'use strict';
module.exports = (sequelize, DataTypes) => {
  var test_user = sequelize.define('test_user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return test_user;
};
