'use strict';
const { Sequelize } = require('sequelize');

module.exports={ 
   async  up({context: queryInterface}) {
    await queryInterface.sequelize.query(
      `CREATE TABLE users (
        id UUID NOT NULL DEFAULT gen_random_uuid(),
        username VARCHAR(255) NOT NULL,
        email_id VARCHAR(255) NOT NULL,
        access_token VARCHAR(255) NOT NULL,
        refresh_token VARCHAR(255) NOT NULL,
        expires_in INT8 NOT NULL,
        CONSTRAINT users_pkey PRIMARY KEY (id ASC),
        FAMILY details(username,email_id),
        FAMILY tokens(access_token,refresh_token,expires_in) )`
    )
  },
  
  async  down({context:queryInterface}) {
    await queryInterface.dropTable('users');
  }


}
