const express = require('express');
const app = express();
const getEstimatedTime=require('./estimation');
app.use(express.json());

// Start the server
const PORT = 2000;// process.env.PORT || 2000;

const Server=app.listen(PORT, () => {
  app.set('message', `Server running on port ${PORT}\n`);
});

app.get('/estimate-charging-time', (req, res) => {
  const {power, batteryCapacity, soc} = req.query;
  // estimation calculation
  const estimatedTime=getEstimatedTime(power, batteryCapacity, soc);
    estimatedTime==-1?res.status(404).json({message: 'Invalid Input'}):
    res.status(200).json({estimatedTime: Number(estimatedTime)});
});

module.exports={app, Server, PORT};
