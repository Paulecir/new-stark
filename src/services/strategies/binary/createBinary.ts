import PrismaLocal from "@/infra/db/prisma"

export const addBinaryStrategy = async ({ userId, priority = 'L' }, Prisma = PrismaLocal) => {

    const check = await Prisma.strategyBinary.findFirst({
        where: {
            user_id: userId
        }
    })

    if (check) throw new Error('Binary has position')

    const strategy = check.strategy;

    const user = await Prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            sponsor: true
        }
    })

    if (!user) {
        throw new Error('User not found')
    }

    let sponsor = await Prisma.user.findUnique({
        where: {
            id: user.sponsor_id
        }
    })

    let rootNode = await Prisma.strategyBinary.findFirst({
        where: {
            user_id: sponsor.id
        },
        orderBy: {
            level: 'desc'
        }
    })


    let parentNode = await Prisma.strategyBinary.findFirst({
        where: {
            user_id: sponsor.id
        },
        orderBy: {
            level: 'desc'
        }
    })

    while (!rootNode) {
        sponsor = await Prisma.user.findUnique({
            where: {
                id: sponsor.sponsor_id
            }
        })

        if (!sponsor) throw new Error("Sponsor not found")

        rootNode = await Prisma.strategyBinary.findFirst({
            where: {
                user_id: sponsor.id
            },
            orderBy: {
                level: 'desc'
            }
        })


        parentNode = await Prisma.strategyBinary.findFirst({
            where: {
                user_id: sponsor.id
            },
            orderBy: {
                level: 'desc'
            }
        })
    }

    if (strategy === "AUTO") {
        priority = parentNode.autoDirection || 'L'
    }

    while (parentNode) {

        if (priority === "R" && parentNode.right_id === null) {
            const binary = await Prisma.strategyBinary.create({
                data: {
                    user_id: user.id,
                    parent_id: parentNode.id,
                    ref: 'R',
                    hier: `${parentNode.hier}R`,
                    level: parentNode.level + 1
                }
            })

            await Prisma.strategyBinary.update({
                where: {
                    id: parentNode.id
                },
                data: {
                    autoDirection: 'R',
                    right_id: binary.id
                }
            })

            await Prisma.strategyBinary.update({
                where: {
                    id: rootNode.id
                },
                data: {
                    autoDirection: priority === 'R' ? 'L' : 'R',
                }
            })
            updateCtBinaryNew(parseInt(binary.id.toString()), Prisma)
            break
        }

        if (priority === "L" && parentNode.left_id === null) {
            const binary = await Prisma.strategyBinary.create({
                data: {
                    user_id: user.id,
                    parent_id: parentNode.id,
                    ref: 'L',
                    hier: `${parentNode.hier}L`,
                    level: parentNode.level + 1
                }
            })

            await Prisma.strategyBinary.update({
                where: {
                    id: parentNode.id
                },
                data: {
                    autoDirection: 'L',
                    left_id: binary.id
                }
            })

            await Prisma.strategyBinary.update({
                where: {
                    id: rootNode.id
                },
                data: {
                    autoDirection: priority === 'L' ? 'R' : 'L',
                }
            })

            updateCtBinaryNew(parseInt(binary.id.toString()), Prisma)
            break;
        }

        parentNode = await Prisma.strategyBinary.findFirst({
            where: {
                hier: {
                    startsWith: `${parentNode.hier}${priority}`,
                    endsWith: priority
                },
                OR: [
                    { left: null },
                    { right: null }
                ]
            },
            orderBy: [{
                level: 'asc',
            }, {
                ref: 'desc'
            }]
        })



        if (!parentNode) break;
    }


}

export const updateCtBinaryNew = async (binaryId, Prisma = PrismaLocal) => {

    let binary = await Prisma.strategyBinary.findFirst({
        where: {
            id: binaryId
        },
        include: {
            user: true,
            parent: {
                include: {
                    user: true
                }
            }
        }
    })


    do {

        if (binary.ref === "R") {
            await Prisma.strategyBinary.update(
                {
                    where: {
                        id: binary.parent.id
                    },
                    data: {
                        right_count: {
                            increment: 1
                        }
                    }
                })
        }

        if (binary.ref === "L") {

            await Prisma.strategyBinary.update(
                {
                    where: {
                        id: binary.parent.id
                    },
                    data: {
                        left_count: {
                            increment: 1
                        }
                    }
                })
        }

        if (!binary.parent) break;

        binary = await Prisma.strategyBinary.findFirst({
            where: {
                id: binary.parent.id
            },
            include: {
                user: true,
                parent: {
                    include: {
                        user: true
                    }
                }
            }
        })


    } while (binary)

}

export const updateCtBinary = async (binaryId, Prisma = PrismaLocal) => {
    let current = await Prisma.strategyBinary.findFirst({
        where: {
            id: binaryId
        },
        include: {
            parent: true
        }
    })

    while (current) {

        if (!current.parent) break;

        if (current.parent.left_id === current.id) {
            await Prisma.strategyBinary.update({
                where: {
                    id: current.parent.id
                },
                data: {
                    left_count: parseInt(current.parent.left_count.toString()) + 1
                }
            })
        }

        if (current.parent.right_id === current.id) {
            await Prisma.strategyBinary.update({
                where: {
                    id: current.parent.id
                },
                data: {
                    right_count: parseInt(current.parent.right_count.toString()) + 1
                }
            })
        }
        current = await Prisma.strategyBinary.findFirst({
            where: {
                id: current.parent.id
            },
            include: {
                parent: true
            }
        })
    }


}

export const updateCtBinaryAll = async (binaryId: number, Prisma = PrismaLocal) => {

    const nodes = await Prisma.strategyBinary.findMany();

    for (const node of nodes) {
        // Função recursiva para contar descendentes
        const countDescendants = async (id: bigint | null, side: "left" | "right"): Promise<number> => {
            if (!id) return 0;

            const child = await Prisma.strategyBinary.findUnique({ where: { id } });
            if (!child) return 0;

            const leftCount = await countDescendants(child.left_id, "left");
            const rightCount = await countDescendants(child.right_id, "right");

            return 1 + leftCount + rightCount; // Conta o nó atual + descendentes
        };

        // Atualizar contagens para o nó atual
        const leftCount = await countDescendants(node.left_id, "left");
        const rightCount = await countDescendants(node.right_id, "right");

        await Prisma.strategyBinary.update({
            where: { id: node.id },
            data: { left_count: leftCount, right_count: rightCount },
        });
    }
}