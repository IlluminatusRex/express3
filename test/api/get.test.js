const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({
      _id: '5d9f1140f10a81216cfd4508',
      performer: 'John Doe',
      genre: 'Rock',
      price: 24,
      day: 1,
      image: '../../client/build/img/uploads/1fsd324fsdg.jpg',
    });
    await testConOne.save();
    const testConTwo = new Concert({
      _id: '5d9f1140f40a81216cfd4508',
      performer: 'Rebekah Parke',
      genre: 'R&B',
      price: 34,
      day: 1,
      image: '../../client/build/img/uploads/2f342s4fsdg.jpg',
    });
    await testConTwo.save();
    const testConThree = new Concert({
      _id: '5d9f1140f10a81116cfd4508',
      performer: 'Maybell Haley',
      genre: 'Pop',
      price: 44,
      day: 1,
      image: '../../client/build/img/uploads/hdfh42sd213.jpg',
    });
    await testConThree.save();
    const testConFour = new Concert({
      _id: '5d9f1140f10a51216cfd4508',
      performer: 'John Doe',
      genre: 'Rock',
      price: 20,
      day: 2,
      image: '../../client/build/img/uploads/1fsd324fsdg.jpg',
    });
    await testConFour.save();
  });

  it('/:performer should return concerts by :performer', async () => {
    const res = await request(server).get('/api/concerts/performer/John Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    expect(res.body[0].performer).to.be.equal('John Doe');
  });

  it('/:genre should return concerts by :genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(2);
    expect(res.body).to.be.an('array');
    expect(res.body[0].genre).to.be.equal('Rock');
  });

  it('/:price_min/:price_max should return concerts between min and max price', async () => {
    const res = await request(server).get('/api/concerts/price/19/30');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    expect(res.body[0].price).to.be.equal(24);
  });

  it('/:day should return concerts  on the same day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
    expect(res.body[0].day).to.be.equal(1);
  });

  after(async () => {
    await Concert.deleteMany();
  });
});