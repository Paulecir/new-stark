import { PrismaClient } from '@prisma/client'
const Prisma = new PrismaClient()
import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';
import { addBinaryStrategy } from "../../src/services/strategies/binary/createBinary"

async function firstLevelBinary() {

    for (let i = 0; i < 10; i++) {
        const user = await Prisma.user.create({
            data: {
                "name": faker.person.fullName(),
                "login": faker.internet.username(),
                "email": faker.internet.email(),
                "phone": faker.phone.number(),
                "password": await bcrypt.hash("123456789", 10),
                "country_name": "Brasil",
                "country_code": "BR",
                "sponsor_id": 1
            }
        })
    
        await addBinaryStrategy(parseInt(user.id.toString()), "LEFT", "R")
    }
    

}

export default firstLevelBinary;