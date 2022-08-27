const { expect } = require('chai')
const { find, findById, save, update, deleteOne } = require('../src/modules/users/Users')

describe('Testing function Users (Done)', () => {
  before((done) => {
    // Do something here before test
    done()
  })
  let _id = ''

  it('function find it should have type array', async () => {
    const result = await find()
    expect(result).to.be.an('array')
  })

  it('function save it should have type object', async () => {
    const result = await save({
      name: 'Chai',
      email: 'Chai@gmail.com',
      general: [
        {
          weight: 55,
          height: 150,
          gender: 'ชาย',
        },
      ],
    })
    _id = result._id.toString()
    expect(result).to.be.an('object')
  })

  it('function findById it should have type object', async () => {
    const result = await findById(_id)
    expect(result).to.be.an('object')
  })

  it('function update it should have type object', async () => {
    const result = await update(_id, {
      name: 'Chai2',
      email: 'Chai2@gmail.com',
      general: [
        {
          weight: 50,
          height: 150,
          gender: 'ชาย',
        },
      ],
    })
    expect(result).to.have.property('acknowledged', true)
  })

  it('function deleteOne it should have type object', async () => {
    const result = await deleteOne(_id)
    expect(result).to.have.property('acknowledged', true)
  })
})

describe('Testing function Users (fail)', () => {
  const _id = '630a064fce5c8e0f61d9cceb' // Use with Method PUT, get _id from MongoDB

  it('function findById : id not found is should have status 404', async () => {
    await findById('000000000000000000000000').catch((error) => {
      expect(error).to.have.status('404')
    })
  })

  it('function save : name duplicate is should have status 404', async () => {
    await save({
      name: 'Nathachai',
      email: 'nathachai@gmail.com',
      general: [
        {
          weight: 55,
          height: 165,
          gender: 'หญิง',
        },
      ],
    }).catch((error) => {
      expect(error).to.have.status('404')
    })
  })

  it('function save : if you enter your weight or height in letters is should have type error', async () => {
    await save({
      name: 'Test001',
      email: 'Test001@gmail.com',
      general: [
        {
          weight: 'asd',
          height: 'asd',
          gender: 'หญิง',
        },
      ],
    }).catch((error) => {
      expect(error).to.be.an('error')
    })
  })

  it('function update : id not found is should have status 404', async () => {
    await update('000000000000000000000000', {
      name: 'Armando',
      email: 'nathachai@gmail.com',
      general: [
        {
          weight: 55,
          height: 165,
          gender: 'ชาย',
        },
      ],
    }).catch((error) => {
      expect(error).to.have.status('404')
    })
  })

  it('function update : name duplicate is should have status 404', async () => {
    await update(_id, {
      name: 'Armando',
      email: 'nathachai@gmail.com',
      general: [
        {
          weight: 55,
          height: 165,
          gender: 'ชาย',
        },
      ],
    }).catch((error) => {
      expect(error).to.have.status('404')
    })
  })

  it('function update : if you enter your weight or height in letters is should have type error', async () => {
    // let result = ''
    await update(_id, {
      name: 'Test001',
      email: 'Test001@gmail.com',
      general: [
        {
          weight: 'asd',
          height: 'asd',
          gender: 'หญิง',
        },
      ],
    }).catch((error) => {
      //   result = error
      expect(error).to.be.an('error')
    })
  })

  it('function deleteOne : id not found is should have status 404', async () => {
    await deleteOne('000000000000000000000000').catch((error) => {
      expect(error).to.have.status('404')
    })
  })

  after((done) => {
    // Do sommeting here after test
    done()
  })
})
