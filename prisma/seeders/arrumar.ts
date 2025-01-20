import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const users = await Prisma.user.findMany({
        where: {
            ancestry: null,
            sponsor_id: {
                not: null
            }
        },
    })

    console.log("U", users)
    for (const user of users) {

        let ancestry: any = []
        let sponsor: any = null
        do {
            if (!user.sponsor_id) break;
            sponsor = await Prisma.user.findFirst({
                where: {
                    id: user.sponsor_id
                }
            })

            if (!sponsor) break;

            ancestry.push(`#${sponsor.id}#`)
            user.sponsor_id = sponsor.sponsor_id

        } while (sponsor)

        await Prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                ancestry: ancestry.reverse().join('')
            }
        })
    }



}


arrumar()