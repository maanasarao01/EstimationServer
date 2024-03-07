const express = require('express');
const app = express();
const getEstimatedTime=require('./estimation');
app.use(express.json());

app.listen(2001, () => {
  app.set('message', `Server running on port 2001\n`);
});

app.get('/estimate-charging-time', (req, res) => {
  const {powerInKW, batteryCapacityInKWh, socInPercentage} = req.query;
  // estimation calculation
  const estimatedTimeInHours=getEstimatedTime(powerInKW, batteryCapacityInKWh, socInPercentage);
    estimatedTimeInHours==-1?res.status(404).json({message: 'Invalid Input'}):
    res.status(200).json({estimatedTimeInHours: Number(estimatedTimeInHours)});
});

module.exports= app;


