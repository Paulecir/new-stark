import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import { addBalance } from "../../src/services/balance/addBalance";
import { run } from '../../src/services/seed/run';
const Prisma = new PrismaClient()

async function firstLevelBinary() {
    console.log("?????", process.argv)
    let max = process.argv[2] ? parseInt(process.argv[2]) : 10
    for (let i = 0; i < max; i++) {
        const rnd = i < 4 ? 1 : parseInt(((Math.random() * (i + 1))).toString())
        console.log("i", rnd)
        const sponsor: any = await Prisma.$queryRaw`SELECT * FROM users ORDER BY rand() LIMIT 1`
        const user = await Prisma.user.create({
            data: {
                "name": faker.person.fullName(),
                "login": faker.internet.username(),
                "email": faker.internet.email(),
                "phone": faker.phone.number(),
                "password": await bcrypt.hash("123456789", 12),
                "country_name": "Brasil",
                "country_code": "BR",
                "sponsor_id": sponsor[0].id,
                "is_active": true
            }
        })

        await addBalance({
            name: "Initial Balance"
            , wallet: "MAIN"
            , user_id: user.id
            , amount: 10
            , ref_type: 'user'
            , ref_id: user.id
            , extra_info: {
            }
        })
        await run(user)


        // await addBinaryStrategy(parseInt(user.id.toString()), "LEFT", "R")
    }


}

export default firstLevelBinary;