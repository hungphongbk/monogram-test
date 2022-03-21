import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const connect = async () => {
  return await prisma.$connect()
}