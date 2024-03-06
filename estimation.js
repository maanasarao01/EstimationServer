function getChargingTime(power, batteryCapacity, soc) {
  const estimatedTime = ((batteryCapacity * (1 - (soc / 100))) / power).toFixed(2);
  return isNaN(estimatedTime)?-1:estimatedTime;
}

module.exports=getChargingTime;
