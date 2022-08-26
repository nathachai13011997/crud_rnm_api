const chai = require('chai')
const chaiHttp = require('chai-http')
const { after, before, describe, it } = require('mocha')
const server = require('../src/index')

chai.use(chaiHttp)
chai.should()

describe('Testing unit 1', () => {
  before((done) => {
    // Do something here before test
    done()
  })

  describe('GET /', () => {
    it('it should have status 200', (done) => {
      chai
        .request(server)
        .get('/api/users')
        .end((e, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('POST /', () => {
    it('is should have status 200', (done) => {
      chai
        .request(server)
        .post('/api/users')
        .set('content-type', 'application/json')
        .send({
          name: 'Test',
          email: 'C001',
          general: {
            weight: '55',
            height: '165',
            gender: 'หญิง',
          },
        })
        .end((e, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('PUT /', () => {
    it('is should hava status 200', (done) => {
      chai
        .request(server)
        .put('/api/users/3')
        .set('content-type', 'application/json')
        .send({
          name: 'Cosmo',
          email: 'cosmo@gmail.com',
          general: {
            weight: '55',
            height: '165',
            gender: 'หญิง',
          },
        })
        .end((e, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('DELETE /', () => {
    it('is should hava status 200', (done) => {
      chai
        .request(server)
        .delete('/api/users/3')
        .end((e, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
  after((done) => {
    // Do sommeting here after test
    done()
  })
})
