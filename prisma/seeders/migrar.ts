import { PrismaClient, Prisma as PrismaDefault } from '@prisma/client';


(async () => {
    const PrismaOld = new PrismaClient({
        datasourceUrl: 'mysql://root:123456@localhost/newdb?connection_limit=50'
    })


    const a = await PrismaOld.$queryRaw`SELECT * FROM users LIMIT 10`


    console.log("A")

})()