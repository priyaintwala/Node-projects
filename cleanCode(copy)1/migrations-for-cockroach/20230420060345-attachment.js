'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  async up({context:queryInterface}) {
    await queryInterface.sequelize.query(
      `CREATE TABLE attachments (
        id UUID NOT NULL DEFAULT gen_random_uuid(),
        file_path VARCHAR(100000) NULL,
        file_name VARCHAR(100000) NULL,
        file_size VARCHAR NULL,
        file_type VARCHAR(200) NULL,
        message_id VARCHAR(1000) NOT NULL,
        CONSTRAINT attachments_pkey PRIMARY KEY (id ASC),
        CONSTRAINT attachments_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.emails(message_id) ON DELETE CASCADE ON UPDATE CASCADE
      )`
    );
  },
  async down({context:queryInterface}) {
    await queryInterface.dropTable('attachments');
  }
};
