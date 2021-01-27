'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'user_auth',
      'password_recovery_token',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('user_auth', 'password_recovery_token');
  }
};