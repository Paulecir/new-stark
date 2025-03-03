import Prisma from "../../src/infra/db/prisma";
import { decBalance } from "../../src/services/balance/decBalance";

async function arrumar() {
    // Array para armazenar usuários com saldo negativo
    let negativo = []

    // Busca todas as ordens de usuários específicos criadas após uma data específica
    const orders: any = await Prisma.order.findMany({
        where: {
            user_id: {
                in: [5017] // IDs dos usuários a serem considerados
            },
            created_at: {
                gt: new Date('2025-03-01T00:00:00') // Data limite para considerar as ordens
            }
        },
        include: {
            OrderItem: true // Inclui os itens da ordem na busca
        }
    })

    // Itera sobre cada ordem encontrada
    for (const order of orders) {
        await Prisma.$transaction(async (Prisma) => {
            // Itera sobre cada item da ordem
            for (const item of order.OrderItem) {
                // Atualiza o saldo decrementando o valor do item
                await Prisma.balance.updateMany({
                    where: {
                        user_id: order.user_id,
                        wallet: item.wallet
                    },
                    data: {
                        amount: {
                            decrement: item.amount
                        }
                    }
                })

                // Deleta o histórico de saldo relacionado ao item da ordem
                await Prisma.balanceHistory.deleteMany({
                    where: {
                        ref_type: 'orderItem',
                        ref_id: item.id
                    }
                })

                // Deleta o item da ordem
                await Prisma.orderItem.delete({
                    where: {
                        id: item.id
                    }
                })
            }

            // Atualiza o saldo incrementando o valor da ordem
            await Prisma.balance.updateMany({
                where: {
                    user_id: order.user_id,
                    wallet: "MAIN"
                },
                data: {
                    amount: {
                        increment: order.amount
                    }
                }
            })

            // Deleta o histórico de saldo relacionado à ordem
            await Prisma.balanceHistory.deleteMany({
                where: {
                    ref_type: 'order',
                    ref_id: order.id
                }
            })

            // Deleta a ordem
            await Prisma.order.delete({ where: { id: order.id } })
        }, {
            timeout: 1000000, // Tempo máximo de espera para a transação
            maxWait: 1000000 // Tempo máximo de espera para iniciar a transação
        })
    }
}

// Chama a função para arrumar os saldos
arrumar()