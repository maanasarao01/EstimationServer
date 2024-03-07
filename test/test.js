const request=require('supertest');
const app=require('../server');
const {expect}=require('chai');

describe('Estimation Logic Test:', ()=>{
  // Checking for server
  it('should start the server on the specified port', async () => {
    const serverStarted = app.get('message');
    console.log(serverStarted);
    expect(serverStarted).to.equal(`Server running on port 2001\n`);
  });

  it('should succeed on passing right requests', async ()=>{
    const goodRequest= await request(app).get('/estimate-charging-time')
        .query({
          powerInKW: 20,
          batteryCapacityInKWh: 40,
          socInPercentage: 50,
        });
    expect(goodRequest.body).to.have.property('estimatedTimeInHours').to.equal(1.00);
  });

  it('should fail on passing bad requests', async ()=>{
    const badRequest= await request(app).get('/estimate-charging-time')
        .query({
          powerInKW: undefined,
          socInPercentage: 50,
        });
    expect(badRequest.body).to.have.property('message').to.equal('Invalid Input');
  });

  it('should fail on passing empty requests', async ()=>{
    const emptyRequest= await request(app).get('/estimate-charging-time')
        .query({ });
    expect(emptyRequest.body).to.have.property('message').to.equal('Invalid Input');
  });
});
