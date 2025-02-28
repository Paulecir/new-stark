import Prisma from "../../src/infra/db/prisma";
import { decBalance } from "../../src/services/balance/decBalance";
import { addBalance } from "../../src/services/balance/addBalance";
async function arrumar() {

    const bals = [
        // {
        //     id: 2268,
        //     amount: 20
        // },
        // {
        //     id: 6807,
        //     amount: 4.5
        // },
        // {
        //     id: 2263,
        //     amount: 172.5
        // },
        // {
        //     id: 4551,
        //     amount: 20
        // },
        // {
        //     id: 3116,
        //     amount: 161.5
        // },
        // {
        //     id: 2291,
        //     amount: 63.5
        // },
        // {
        //     id: 5196,
        //     amount: 1.5
        // },
        // {
        //     id: 4589,
        //     amount: 30.5
        // },

        {
            id: 5342,
            amount: 3
        },
        {
            id: 5775,
            amount: 1.5
        }
    ]

    for (const bal of bals) {
        await addBalance({
            name: "Conceito corrección de binario"
            , wallet: "MAIN"
            , user_id: bal.id
            , amount: bal.amount
            , ref_type: 'correcion'
            , ref_id: 0
            , extra_info: {
                ...bal
            }
        }, Prisma)
    }


}


arrumar()