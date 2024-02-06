'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  async up({context:queryInterface}) {
    await queryInterface.sequelize.query(
      `CREATE TABLE labels (
        id UUID NOT NULL DEFAULT gen_random_uuid(),
        label_name VARCHAR(2000) NULL,
        user_id UUID NOT NULL,
        synced_folder_id VARCHAR(2000) NOT NULL,
        priority INTEGER NOT NULL,
        fetch_status BOOL NOT NULL DEFAULT FALSE,
        next_page_token VARCHAR NULL,
        CONSTRAINT labels_pkey PRIMARY KEY (id ASC),
        CONSTRAINT labels_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FAMILY customlabel(label_name,user_id)
      )`

    );
  },
  async down({context:queryInterface}) {
    await queryInterface.dropTable('labels');
  }
};
