const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const config=require('./config/development')

const sequelize = new Sequelize(
    config.development.database,
    config.development.username, 
    config.development.password, {
        dialect: 'postgres',
        port: config.development.port,
        host: config.development.host, 
        dialectOptions: config.development.dialectOptions,
        omitNull: false,
    });
const umzug = new Umzug({
  migrations: { glob: 'migrations-for-cockroach/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  await umzug.up();
})();