import Prisma from "@/infra/db/prisma"
import moment from "moment"

export const dashboardRanking = async ({ user }: any) => {
  const startOfDay = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss")
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss")

  const cadastroPorPais: any = await Prisma.$queryRaw`
        SELECT 
            country_code,
            country_name,
            count(1) as qtd
        FROM 
            users
        WHERE created_at > ${moment().startOf("month").startOf("day").format("YYYY-MM-DDTHH:mm:ss")}
        GROUP BY country_code
        ORDER BY qtd desc
        LIMIT 10
    `
  const vendasPorPais: any = await Prisma.$queryRaw`
        SELECT
            country_code,
            country_name,
            sum(order_item.amount * order_item.quantity) amount
        FROM 
            order_item 
        INNER JOIN \`order\` o ON o.id = order_item.order_id
        INNER JOIN products p ON p.id = order_item.product_id
        INNER JOIN users u ON u.id = o.user_id
        WHERE o.status = "done" and o.created_at > ${moment().startOf("month").startOf("day").format("YYYY-MM-DDTHH:mm:ss")}
        GROUP BY country_code
        ORDER BY amount desc
        LIMIT 10
    `

  return {
    cadastroPorPais,
    vendasPorPais
  }
}
