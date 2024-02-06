'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  async up({context:queryInterface}) {
    await queryInterface.sequelize.query(  
      `CREATE TABLE emails (
        message_id VARCHAR(2000) NOT NULL,
        global_message_id VARCHAR(500) NULL,
        subject VARCHAR(500) NULL,
        snippet VARCHAR(255) NULL,
        user_id UUID NOT NULL,
        thread_id VARCHAR(500) NOT NULL,
        html_body VARCHAR(1000000) NULL,
        text_body VARCHAR(1000000) NULL,
        in_reply_body VARCHAR(200) NULL,
        reference VARCHAR(10000) NULL,
        created_at TIMESTAMPTZ NOT NULL,
        CONSTRAINT emails_pkey PRIMARY KEY (message_id ASC),
        CONSTRAINT emails_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`
    )
  },
  async down({context:queryInterface}) {
    await queryInterface.dropTable('emails');
  }
};
