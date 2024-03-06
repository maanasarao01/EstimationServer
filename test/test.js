const request=require('supertest');
const {app, Server, getPORT}=require('../server');
const {expect}=require('chai');

describe('Estimation Logic Test:', ()=>{
  it('should use the value of PORT if set', () => {
    // set Custom port number
    process.env.PORT=5000;
    const port = getPORT();
    expect(port).to.equal(5000);
  });

  it('should default to 2000 if PORT is not set', async () => {
    // Clear PORT environment variable
    delete process.env.PORT;
    const port =getPORT();
    expect(port).to.equal(2000);
  });

  // Checking for server
  it('should start the server on the specified port', async () => {
    const serverStarted = app.get('message');
    console.log(serverStarted);
    expect(serverStarted).to.equal(`Server running on port ${getPORT()}\n`);
  });

  it('should succeed on passing right requests', async ()=>{
    const goodRequest= await request(app).get('/estimate-charging-time')
        .query({
          power: 20,
          batteryCapacity: 40,
          soc: 50,
        });
    expect(goodRequest.body).to.have.property('estimatedTime').to.equal(1.00);
  });

  it('should fail on passing bad requests', async ()=>{
    const badRequest= await request(app).get('/estimate-charging-time')
        .query({
          power: undefined,
          soc: 50,
        });
    expect(badRequest.body).to.have.property('message').to.equal('Invalid Input');
  });

  it('should fail on passing empty requests', async ()=>{
    const emptyRequest= await request(app).get('/estimate-charging-time')
        .query({ });
    expect(emptyRequest.body).to.have.property('message').to.equal('Invalid Input');
  });

  // DISCONNECTION
  after(async () => {
    await Server.close();
    console.log('Disconnected from the server:)');
  });
});
