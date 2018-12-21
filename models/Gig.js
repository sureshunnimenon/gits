const sequelize = require('sequelize');
const db = require('../config/database');

const Gig = db.define('gig', {
    title: {
        type: sequelize.STRING
    },
    technology: {
        type: sequelize.STRING
    },
    description: {
        type: sequelize.STRING
    },
    budget: {
        type: sequelize.STRING
    },
    contactemail: {
        type: sequelize.STRING
    },
})

module.exports = Gig;
