const express = require('express');
const db = require('../database/database');
const { encrypt } = require('../alg/encdec');

const missionsRoutes = express.Router();

missionsRoutes.post('/', async (req, res) => {
  const { title, status, location, agent_id, start_date, end_date } = req.body;

  if (!title || !status || !location || !agent_id || !start_date || !end_date) {
    return res.status(400).json({ message: 'Some fields are incomplete.' });
  }

  try {
    await db(
      `INSERT INTO missions (title, status, location, agent_id, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, status, location, agent_id, start_date, end_date]
    );

    return res.status(201).json({ message: 'Mission created successfully.' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
});

missionsRoutes.post('/:missionId/file', async (req, res ) => {
    const { encrypted_data, uploaded_at } = req.body;
    const { missionId } = req.params;

    if (!missionId || !encrypted_data || !uploaded_at) {
        console.log('some fileds are incomlete');
        return res.status(400).json({message: 'some fields are incomplete'});
    }

    try {
        const encData = encrypt(encrypted_data);

        await db(
            `INSERT INTO mission_file (mission_id, encrypted_data, uploaded_at)
             VALUES ($1, $2, $3)
            `,
            [missionId, encData, uploaded_at]
        );

        return res.status(201).json({message: 'file uploaded successfuly'});
    } catch (err) {
        console.log('Something get wrong from our side.');
        return res.status(500).json({message: 'Server error'});
    }
});

missionsRoutes.get('/:missionId/files', async (req, res) => {
  const { missionId } = req.params;

  if (!missionId) {
    return res.status(400).json({ message: 'Missing mission ID' });
  }

  try {
    const result = await db(
      `SELECT id, mission_id, encrypted_data, uploaded_at
       FROM mission_files
       WHERE mission_id = $1`,
      [missionId]
    );

    const decryptedFiles = result.rows.map((row) => ({
      id: row.id,
      mission_id: row.mission_id,
      data: decrypt(row.encrypted_data),
      uploaded_at: row.uploaded_at,
    }));

    return res.status(200).json({ files: decryptedFiles });
  } catch (err) {
    console.error('Error retrieving files:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = missionsRoutes;
