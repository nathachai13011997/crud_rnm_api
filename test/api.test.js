const chai = require('chai')
const chaiHttp = require('chai-http')
const { after, before, describe, it } = require('mocha')
const server = require('../src/main')

chai.use(chaiHttp)
chai.should()

// --- Doun ---
describe('Testing API Users (Done) ', () => {
  before((done) => {
    // Do something here before test
    done()
  })

  let id = ''

  it('get all it should have status 200', (done) => {
    chai
      .request(server)
      .get('/api/users')
      .end((e, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('save is should have status 200', (done) => {
    chai
      .request(server)
      .post('/api/users')
      .set('content-type', 'application/json')
      .send({
        name: 'Nat',
        email: 'Nay@gmail.com',
        general: [
          {
            weight: 60,
            height: 160,
            gender: 'ชาย',
          },
        ],
      })
      .end((e, res) => {
        id = res.body._id
        res.should.have.status(200)
        done()
      })
  })

  it('get by id it should have status 200', (done) => {
    chai
      .request(server)
      .get(`/api/users/${id}`)
      .end((e, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('update is should hava status 200', (done) => {
    chai
      .request(server)
      .put(`/api/users/${id}`)
      .set('content-type', 'application/json')
      .send({
        name: 'Cosmo',
        email: 'cosmo@gmail.com',
        general: [
          {
            weight: 55,
            height: 165,
            gender: 'หญิง',
          },
        ],
      })
      .end((e, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('delete is should hava status 200', (done) => {
    chai
      .request(server)
      .delete(`/api/users/${id}`)
      .end((e, res) => {
        res.should.have.status(200)
        done()
      })
  })

  after((done) => {
    // Do sommeting here after test
    done()
  })
})
//  --- End Doun ---

// --- Fail ---
describe('Testing API Users (fail) ', () => {
  before((done) => {
    // Do something here before test
    done()
  })
  const id = '630a064fce5c8e0f61d9cceb' // Use with Method PUT, get _id from MongoDB

  // --- GET ---
  describe('GET / ', () => {
    it('id not found is should have status 404', (done) => {
      chai
        .request(server)
        .get(`/api/users/000000000000000000000000`)
        .end((e, res) => {
          res.should.have.status(404)
          res.body.error.should.have.property('message').eql('id not found')
          done()
        })
    })
  })
  // --- End GET ---

  // --- POST ---
  describe('POST / ', () => {
    it('name duplicate is should have status 404', (done) => {
      chai
        .request(server)
        .post('/api/users')
        .set('content-type', 'application/json')
        .send({
          name: 'Nathachai',
          email: 'nathachai@gmail.com',
          general: [
            {
              weight: 55,
              height: 165,
              gender: 'หญิง',
            },
          ],
        })
        .end((e, res) => {
          res.should.have.status(404)
          res.body.error.should.have.property('message').eql('name duplicate')
          done()
        })
    })

    it('if not enter your name email is should have status 422', (done) => {
      chai
        .request(server)
        .post('/api/users')
        .set('content-type', 'application/json')
        .send({
          name: '',
          email: '',
          general: [
            {
              weight: 55,
              height: 165,
              gender: 'หญิง',
            },
          ],
        })
        .end((e, res) => {
          res.should.have.status(422)
          done()
        })
    })

    it('if the email format is entered incorrectly is should have status 422', (done) => {
      chai
        .request(server)
        .post('/api/users')
        .set('content-type', 'application/json')
        .send({
          name: 'Test001',
          email: 'Test001',
          general: [
            {
              weight: 55,
              height: 165,
              gender: 'หญิง',
            },
          ],
        })
        .end((e, res) => {
          res.should.have.status(422)
          res.body.error.should.have.property('message').eql('email: must be email')
          done()
        })
    })

    it('if you enter your weight or height in letters is should have status 500', (done) => {
      chai
        .request(server)
        .post('/api/users')
        .set('content-type', 'application/json')
        .send({
          name: 'Test001',
          email: 'Test001@gmail.com',
          general: [
            {
              weight: 'asd',
              height: 'asd',
              gender: 'หญิง',
            },
          ],
        })
        .end((e, res) => {
          res.should.have.status(500)
          done()
        })
    })
  })
  // --- End POST ---

  // --- PUT ---
  describe('PUT / ', () => {
    it('id not found is should have status 404', (done) => {
      chai
        .request(server)
        .put(`/api/users/000000000000000000000000`)
        .set('content-type', 'application/json')
        .send({
          name: 'Armando',
          email: 'nathachai@gmail.com',
          general: [
            {
              weight: 55,
              height: 165,
              gender: 'ชาย',
            },
          ],
        })
        .end((e, res) => {
          res.should.have.status(404)
          res.body.error.should.have.property('message').eql('id not found')
          done()
        })
    })

    it('name duplicate is should have status 404', (done) => {
      chai
        .request(server)
        .put(`/api/users/${id}`)
        .set('content-type', 'application/json')
        .send({
          name: 'Armando',
          email: 'nathachai@gmail.com',
          general: [
            {
              weight: 55,
              height: 165,
              gender: 'ชาย',
            },
          ],
        })
        .end((e, res) => {
          res.should.have.status(404)
          res.body.error.should.have.property('message').eql('name duplicate')
          done()
        })
    })

    it('if not enter your name email is should have status 422', (done) => {
      chai
        .request(server)
        .put(`/api/users/${id}`)
        .set('content-type', 'application/json')
        .send({
          name: '1234',
          email: '',
          general: [
            {
              weight: 55,
              height: 165,
              gender: 'หญิง',
            },
          ],
        })
        .end((e, res) => {
          res.should.have.status(422)
          done()
        })
    })

    it('if the email format is entered incorrectly is should have status 422', (done) => {
      chai
        .request(server)
        .put(`/api/users/${id}`)
        .set('content-type', 'application/json')
        .send({
          name: 'Test001',
          email: 'Test001',
          general: [
            {
              weight: 55,
              height: 165,
              gender: 'หญิง',
            },
          ],
        })
        .end((e, res) => {
          res.should.have.status(422)
          res.body.error.should.have.property('message').eql('email: must be email')
          done()
        })
    })

    it('if you enter your weight or height in letters is should have status 500', (done) => {
      chai
        .request(server)
        .put(`/api/users/${id}`)
        .set('content-type', 'application/json')
        .send({
          name: 'Test001',
          email: 'Test001@gmail.com',
          general: [
            {
              weight: 'asd',
              height: 'asd',
              gender: 'หญิง',
            },
          ],
        })
        .end((e, res) => {
          res.should.have.status(500)
          done()
        })
    })
  })
  //  --- End PUT ---

  // --- DELETE ---
  describe('DELETE / ', () => {
    it('id not found is should have status 404', (done) => {
      chai
        .request(server)
        .delete(`/api/users/000000000000000000000000`)
        .end((e, res) => {
          res.should.have.status(404)
          res.body.error.should.have.property('message').eql('id not found')
          done()
        })
    })
  })
  // --- End DELETE ---
  after((done) => {
    // Do sommeting here after test
    done()
  })
})
//  --- End Fail ---
