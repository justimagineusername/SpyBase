const express = require('express');
require('dotenv').config();

const app = express();

const agentsRoutes = require('./routes/agents');
const missionsRoutes = require('./routes/missions');


app.use(express.json());


app.use('/agents', agentsRoutes);
app.use('/missions', missionsRoutes);


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
