import Prisma from "../../src/infra/db/prisma";
import moment from 'moment';
import { approvePayBinary } from "../../src/services/strategies/binary/approvePayBinary"

async function arrumar() {
    const date = moment("2025-02-25T00:00:00")


    await Prisma.strategyBinaryPay.updateMany({
        where: {
            status: "ERROR"
        },
        data: {
            status: "PENDING"
        }
    })

    do {
        console.log("DATE", date.format("YYYY-MM-DD"))
        await approvePayBinary({ date: date.format("YYYY-MM-DD")})
        date.add("1", "days")
    } while(date.isBefore(moment()))

}


arrumar()
