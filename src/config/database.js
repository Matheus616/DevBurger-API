const { underscoredIf } = require("sequelize/lib/utils");

module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database:'DevBurger',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};