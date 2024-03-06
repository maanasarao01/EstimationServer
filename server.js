const express = require('express');
const app = express();
const getEstimatedTime=require('./estimation');
app.use(express.json());

// set PORT
function getPORT() {
  const PORT = parseInt(process.env.PORT, 10) || 2000;
  return PORT;
}

const Server=app.listen(getPORT(), () => {
  app.set('message', `Server running on port ${getPORT()}\n`);
});

app.get('/estimate-charging-time', (req, res) => {
  const {power, batteryCapacity, soc} = req.query;
  // estimation calculation
  const estimatedTime=getEstimatedTime(power, batteryCapacity, soc);
    estimatedTime==-1?res.status(404).json({message: 'Invalid Input'}):
    res.status(200).json({estimatedTime: Number(estimatedTime)});
});

module.exports={app, Server, getPORT};
