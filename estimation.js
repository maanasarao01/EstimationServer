function getChargingTime(powerInKW, batteryCapacityInKWh, socInPercentage) {
  const estimatedTimeInHours =
  ((batteryCapacityInKWh * (1 - (socInPercentage / 100))) / powerInKW).toFixed(2);
  return isNaN(estimatedTimeInHours)?-1:estimatedTimeInHours;
}

module.exports=getChargingTime;
