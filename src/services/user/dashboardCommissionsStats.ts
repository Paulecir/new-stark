import Prisma from "@/infra/db/prisma"
import moment from "moment"

export const dashboardCommissionsStats = async ({ user }: any) => {

  let target = moment().date(5)
  if (moment().isAfter(target, 'day')) {
    target = target.add(1, 'month')
  }

 const tokenTeen = await Prisma.$queryRaw`
    SELECT 
        sum((oi.amount * oi.quantity) / (IF(DATEDIFF(${target.format("YYYY-MM-DDT03:00:00")}, o.created_at) < 30, 30 - DATEDIFF(${target.format("YYYY-MM-DDT03:00:00")}, o.created_at), 1))) * 0.15 sum
    FROM 
        order_item oi
    INNER JOIN \`order\` o ON o.id = oi.order_id
    INNER JOIN products p ON p.id = oi.product_id
    WHERE o.status = "DONE" and p.category_id = 3`

const tokenOne = await Prisma.$queryRaw`
    SELECT 
        sum((oi.amount * oi.quantity) / (IF(DATEDIFF(${target.format("YYYY-MM-DDT03:00:00")}, o.created_at) < 30, 30 - DATEDIFF(${target.format("YYYY-MM-DDT03:00:00")}, o.created_at), 1))) * 0.15 sum
    FROM 
        order_item oi
    INNER JOIN \`order\` o ON o.id = oi.order_id
    INNER JOIN products p ON p.id = oi.product_id
    WHERE o.status = "DONE" and p.category_id = 2`

  return {
    winwin: {
      month: 0,
      total: 0,
      day: 0
    },
    tokenWay: {
      month: 0,
      total: 0,
      day: 0
    },
    tokenTeen: {
      month: tokenTeen[0].sum || 0,
      total: tokenTeen[0].sum || 0
    },
    tokenOne: {
      month: tokenTeen[0].sum || 0,
      total: tokenOne[0].sum || 0
    }
  }
}
