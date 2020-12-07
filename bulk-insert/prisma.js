const { Readable, Writable, pipeline } = require('stream')
const { PrismaClient } = require('@prisma/client')
const batch2 = require('batch2')
const randomData = require('../library/generate-random-data')

const prisma = new PrismaClient()

main()
  .catch(err => console.log(err))
  .finally(async () => {
    await prisma.$disconnect()
  })

async function main () {
  const dataGeneratorStream = new Readable({
    objectMode: true,
    read () {
      const user = randomData()
      this.push(user)
    }
  })

  const writeStreamToTable = new Writable({
    objectMode: true,
    write (chunk, encoding, callback) {
      chunk.forEach(async (data) => {
        // await prisma.users.create({
        //   data: {
        //     data
        //   }
        // })
      })

      callback()
    }
  })

  return new Promise((resolve, reject) => {
    pipeline(
      dataGeneratorStream,
      batch2.obj({ size: 100 }),
      writeStreamToTable,
      err => console.error(err)
    )
  }).catch(err => console.log(err))
}


