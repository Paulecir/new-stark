import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import { addBalance } from "../../src/services/balance/addBalance";
import { run } from '../../src/services/seed/run';
const Prisma = new PrismaClient()

async function firstLevelBinary() {

    for (let i = 0; i < 10; i++) {
        const user = await Prisma.user.create({
            data: {
                "name": faker.person.fullName(),
                "login": faker.internet.username(),
                "email": faker.internet.email(),
                "phone": faker.phone.number(),
                "password": await bcrypt.hash("123456789", 12),
                "country_name": "Brasil",
                "country_code": "BR",
                "sponsor_id": 1,
                "is_active": true
            }
        })

        await addBalance({
            name: "Initial Balance"
            , wallet: "MAIN"
            , user_id: user.id
            , amount: 10000
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