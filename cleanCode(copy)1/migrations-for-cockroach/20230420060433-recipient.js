'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  async up({context:queryInterface}) {
    await queryInterface.sequelize.query(
     ` CREATE TABLE recipients (
        id UUID NOT NULL DEFAULT gen_random_uuid(),
        message_id VARCHAR(1000) NOT NULL,
        email_address VARCHAR(10000) NULL,
        recipient_type VARCHAR(10000) NULL,
        CONSTRAINT recipients_pkey PRIMARY KEY (id ASC),
        CONSTRAINT recipients_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.emails(message_id) ON DELETE CASCADE ON UPDATE CASCADE
      )`
    );
  },
  async down({context:queryInterface}) {
    await queryInterface.dropTable('recipients');
  }
};
