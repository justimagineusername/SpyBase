const { decrypt } = require('../alg/encdec');
const db = require('../database/database');

// Create a new agent
const createAgent = async (agentInfo) => {
  const { codename, enc_real_name, clearance_level } = agentInfo;

  if (!codename || !enc_real_name || !clearance_level) {
    throw new Error('Missing required agent information');
  }

  try {
    const result = await db(
      `INSERT INTO agents (codename, real_name, clearance_level)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [codename, enc_real_name, clearance_level]
    );
    return result.rows[0]; // return the created agent (optional)
  } catch (err) {
    console.error('Error inserting agent:', err);
    throw err;
  }
};


const getAllAgents = async () => {
  try {
    const result = await db(`SELECT * FROM agents`);
    return result.rows.map((row) => ({
      ...row,
      real_name: decrypt(row.real_name),
    }));
  } catch (err) {
    console.error('Error fetching agents:', err);
    throw err;
  }
};

module.exports = {
  createAgent,
  getAllAgents,
};