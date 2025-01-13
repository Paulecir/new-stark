import { PrismaClient } from '@prisma/client'
const Prisma = new PrismaClient()
import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';
import { addBinaryStrategy } from "../../src/services/strategies/binary/createBinary"

async function secondLevelBinary() {

    for (let i = 0; i < 0; i++) {
        const user = await Prisma.user.create({
            data: {
                "name": faker.person.fullName(),
                "login": faker.internet.username(),
                "email": faker.internet.email(),
                "phone": faker.phone.number(),
                "password": await bcrypt.hash("123456789", 10),
                "country_name": "Brasil",
                "country_code": "BR",
                "sponsor_id": 3
            }
        })
    
        await addBinaryStrategy(parseInt(user.id.toString()))
    }
    

}

export default secondLevelBinary;