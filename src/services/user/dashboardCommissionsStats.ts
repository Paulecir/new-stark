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

  const winwinTotal = await Prisma.$queryRaw`SELECT sum(amount) amount FROM balance_history WHERE identify = "WINWIN_BONUS"`;

  const winwin = await Prisma.$queryRaw`
      SELECT 
          sum((order_item.amount * order_item.quantity) * 0.0055) amount_diary,
          sum(((order_item.amount * order_item.quantity) * 0.0055) * 30) amount_month
      FROM 
          order_item 
      INNER JOIN \`order\` o ON o.id = order_item.order_id
      INNER JOIN products p ON p.id = order_item.product_id
      WHERE o.status = "done" and p.category_id = 4`

  const tokenWayTotal = await Prisma.$queryRaw`SELECT sum(amount) amount FROM balance_history WHERE identify = "TOKENWAY_BONUS"`;

  let start = moment().date(27);
  if (moment().isBefore(start, 'day')) {
    start = start.subtract(1, 'month');
  }
  const category = await Prisma.category.findFirst({
    where: {
      id: 1
    }
  })

  let tokenWayMonth = 0
  let tokenWayDay = 0

  do {
    const dt = (category.commission_yield_config as any).calendar.find(f => f.start === start.format("YYYY-MM-DDT03:00:00"));

    if (dt) {
      const check =  await Prisma.$queryRaw`SELECT 
          sum((order_item.amount * order_item.quantity) * ${parseFloat(dt.value) / 100}) amount,
      FROM 
          order_item 
      INNER JOIN \`order\` o ON o.id = order_item.order_id
      INNER JOIN products p ON p.id = order_item.product_id
      WHERE o.status = "done" and p.category_id = 1 and o.created_at < ${start.format("YYYY-MM-DDT03:00:00")};`

      tokenWayMonth += check[0].amount || 0
      tokenWayDay = check[0].amount || 0
    }

    start = start.add(1, 'day');

  } while (start.isBefore(moment()))

  return {
    winwin: {
      month: winwin[0].amount_month || 0,
      total: winwinTotal[0].amount || 0,
      day: winwin[0].amount_diary || 0
    },
    tokenWay: {
      month: tokenWayMonth,
      total: tokenWayTotal[0].amount || 0,
      day: tokenWayDay
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
