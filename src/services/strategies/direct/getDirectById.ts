import PrismaLocal from "@/infra/db/prisma";

export const getDirectById = async ({ id, level = 2, user }: any, Prisma = PrismaLocal) => {
    const first: any = await Prisma.user.findFirst({
        where: {
            id: parseInt(id.toString())
        }
    })

    const users = await Prisma.user.findMany({
        where: {
            sponsor_id: first.id
        },
        include: {
            Order: {
                select: {
                    total: true
                },
                where: {
                    status: "done"
                }
            },
            User: {
                select: {
                    id: true
                }
            }
        }

    })

    if (id === user.id) {
        users.unshift({ ...first, level: 1 })
    }

    // Mapeando os dados para o formato necessário
    const formattedData = users.map((node: any) => ({
        id: node.id,
        level: node.level || parseInt(level.toString()),
        name: node.name, // Nome do usuário
        email: node.email,
        phone: node.phone,
        buyVolume: node.Order.reduce((acc: any, curr) => acc + curr.total.toNumber(), 0),
        directs: node.User.length,
        avatar: "", // Caso tenha avatar, pode ser adicionado
        points: 0, // Substitua por um cálculo real se necessário
        parentId: node.sponsor_id,
    }));

    return formattedData;
}