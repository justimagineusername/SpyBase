const express = require('express');
const { encrypt } = require('../alg/encdec.js');
const { createAgent, getAllAgents } = require('../models/agentsModels.js');
const agentsRoutes = express.Router();

agentsRoutes.post('/', async (req, res) => {
    //create a new agent.Encryp 'real_name' before saving
    const { codename, real_name, clearance_level } = req.body;

    if (!codename || !real_name || !clearance_level) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const enc_real_name = encrypt(real_name); 
        const retRow = await createAgent({codename, enc_real_name, clearance_level});
        res.status(201).json({message: 'new agent created successfuly.', agent: retRow});
    } catch (err) {
        console.log('Erroe creating agent:',err.message);
        res.status(500).json({message: 'Something went wrong'});
    } 
});

agentsRoutes.get('/', async (req,res) => {
    // GET /agents — List all agents, decrypting real_name before returning.
    try {
        const agentsList = await getAllAgents();
        res.status(200).json({ message: 'Agents retrieved successfully', agents: agentsList });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: 'Something went wrong'});
    }
});

module.exports = agentsRoutes;
