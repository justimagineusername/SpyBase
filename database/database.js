const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = async (text, data = []) => {
    try {
        const result = await pool.query(text, data);
        return result;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

module.exports = db;
