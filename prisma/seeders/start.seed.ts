import { PrismaClient } from '@prisma/client'
const Prisma = new PrismaClient()
import bcrypt from "bcrypt";

async function startSeed() {

    await Prisma.user.create({
        data: {
            "name": "Luis Priscillo",
            "login": "luispriscillo",
            "email": "priscilloluis@gmail.com",
            "phone": "+5544991854666",
            "birthday": "1985-07-12",
            "password": await bcrypt.hash("123456789", 10),
            "profile_photo_path": null,
            "profile": 'admin',
            "is_active": true,
            "bep20_address": null,
            "bep20_public_key": null,
            "bep20_private_key": null,
            "last_login": new Date(), 
            "last_login_ip": '127.0.0.1',
            "country_name": "Brasil",
            "country_code": "BR",
            "sponsor_id": null,
            "binary_parent_id": null,
            "position": null,
        }
    })

}

export default startSeed;