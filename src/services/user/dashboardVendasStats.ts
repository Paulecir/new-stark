import Prisma from "@/infra/db/prisma"
import moment from "moment"

export const dashboardVendasStats = async ({ user }: any) => {
  const startOfDay = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss")
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss")

  const days: any = await Prisma.$queryRaw`
        SELECT
            o.payment_method,
            sum(oi.amount * oi.quantity) as amount,
            count(oi.quantity) as qtd
        FROM 
            \`order\` o
        INNER JOIN order_item oi ON oi.order_id = o.id
        WHERE 
            o.status = "DONE" and o.created_at > ${startOfDay}
        GROUP BY o.payment_method;
    `

  const months: any = await Prisma.$queryRaw`
        SELECT
            o.payment_method,
            sum(oi.amount * oi.quantity) as amount,
            count(oi.quantity) as qtd
        FROM 
            \`order\` o
        INNER JOIN order_item oi ON oi.order_id = o.id
        WHERE 
            o.status = "DONE" and o.created_at > ${startOfMonth}
        GROUP BY o.payment_method;
    `

  const totals: any = await Prisma.$queryRaw`
        SELECT
            o.payment_method,
            sum(oi.amount * oi.quantity) as amount,
            count(oi.quantity) as qtd
        FROM 
            \`order\` o
        INNER JOIN order_item oi ON oi.order_id = o.id
        WHERE 
            o.status = "DONE"
        GROUP BY o.payment_method;
    `

  let valuesDefault = {
    total: {
      amount: 0,
      qtd: 0
    },
    UNKNOWN: {
      payment_method: "UNKNOWN",
      amount: 0,
      qtd: 0
    },
    BALANCE: {
      payment_method: "BALANCE",
      amount: 0,
      qtd: 0
    },
    PLISIO: {
      payment_method: "PLISIO",
      amount: 0,
      qtd: 0
    }
  }

  let retDay = structuredClone(valuesDefault)

  for (const day of days) {
    retDay[day.payment_method] = day
    retDay.total.amount += day.amount
    retDay.total.qtd += Number(day.qtd)
  }

  let retMonth = structuredClone(valuesDefault)

  for (const month of months) {
    retMonth[month.payment_method] = month
    retMonth.total.amount += month.amount
    retMonth.total.qtd += Number(month.qtd)
  }

  let retTotal = structuredClone(valuesDefault)

  for (const total of totals) {
    retTotal[total.payment_method] = total
    retTotal.total.amount += total.amount
    retTotal.total.qtd += Number(total.qtd)
  }

  return {
    day: retDay,
    month: retMonth,
    total: retTotal
  }
}
