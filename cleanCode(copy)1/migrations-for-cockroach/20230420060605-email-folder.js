'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  async up({context:queryInterface}) {
    await queryInterface.sequelize.query(
    `CREATE TABLE email_folder_associations (
      message_id VARCHAR(1000) NOT NULL,
      label_id UUID NOT NULL,
      rowid UUID NOT VISIBLE NOT NULL DEFAULT gen_random_uuid(),
      CONSTRAINT email_folder_associations_pkey PRIMARY KEY (rowid ASC),
      CONSTRAINT email_folder_associations_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.emails(message_id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT email_folder_associations_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.labels(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`
    );
  },
  async down({context:queryInterface}) {
    await queryInterface.dropTable('email_folder_associations');
  }
};
