import { PrismaClient, Prisma as PrismaDefault } from '@prisma/client';

(async () => {
    const PrismaOld = new PrismaClient({
        datasourceUrl: 'mysql://root:123456@localhost/newdb?connection_limit=50'
    })

    const PrismaNew = new PrismaClient({
        datasourceUrl: 'mysql://root:123456@localhost/stk_inves_db?connection_limit=50'
    })



    const users: any = await PrismaOld.$queryRaw`SELECT
        users.id,
        -- parent.id as sponsor_id,
        users.name,
        users.email,
        users.username as login,
        users.phone,
        users.password,
        users.document_type,
        users.document,
        users.avatar,
        users.country as country_name,
        users.active as is_active
    FROM
        users
    LEFT JOIN users_distributor UO on UO.user_id = users.id
    LEFT JOIN users_distributor UOP on UOP.id = UO.parent
    LEFT JOIN users parent ON UOP.user_id = parent.id
    ORDER BY id asc`


    await PrismaNew.$queryRaw`DELETE FROM users WHERE id > 2`
    let i = 0
    for (const user of users) {

        await PrismaNew.user.create({
            data: {
                ...user,
                is_active: user.is_active === 1
            }
        }).catch(async (err) => {
            if (err.meta?.target === "users_phone_unique") {
                await PrismaNew.user.create({
                    data: {
                        ...user,
                        phone: null,
                        is_active: user.is_active === 1
                    }
                }).catch(async (err) => {
                    i++
                })
                return
            }

            if (err.meta?.target === "users_email_unique") {
                i++
                return
            }
            if (err.meta?.target === "users_login_unique") {
                i++
                return
            }
            i++
        })

    }


    const users2: any = await PrismaOld.$queryRaw`SELECT
    users.id,
    parent.id as sponsor_id,
    users.name,
    users.email,
    users.username as login,
    users.phone,
    users.password,
    users.document_type,
    users.document,
    users.avatar,
    users.country as country_name,
    users.active as is_active
FROM
    users
LEFT JOIN users_distributor UO on UO.user_id = users.id
LEFT JOIN users_distributor UOP on UOP.id = UO.parent
LEFT JOIN users parent ON UOP.user_id = parent.id
ORDER BY id asc`


    for (const user of users2) {
        await PrismaNew.user.updateMany({
            where: {
                id: user.id
            },
            data: {
                sponsor_id: user.sponsor_id
            }
        }).catch(err => { })
    }


    const networks: any = await PrismaOld.$queryRaw`SELECT * FROM network`

    for (const network of networks) {

        await PrismaNew.strategyBinary.create({
            data: {
                hier: '',
                autoDirection: 'L',
                user_id: network.user_id
            }
        })

    }

})()