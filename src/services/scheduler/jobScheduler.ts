import Prisma from "@/infra/db/prisma";
import moment from "moment";
import schedule from 'node-schedule'
// Registro de jobs
const jobRegistry = {};

// Função para criar um job
export const createJob = async (data) => {

    const commissionScheduler = await Prisma.commissionScheduler.upsert({
        where: {
            type_category_id_date: {
                type: data.type,
                category_id: data.category_id,
                date: data.date
            }
        },
        create: data,
        update: data
    })

    await cancelJob(commissionScheduler.id)
    if (commissionScheduler.status === "SCHEDULER") await startJob(commissionScheduler.id, commissionScheduler.date)

    return commissionScheduler;
}

export const startJob = async (id, date) => {
    const a = await Prisma.commissionScheduler.update({
        where: {
            id: Number(id)
        },
        data: {
            status: "SCHEDULER"
        }
    })
    const job = schedule.scheduleJob(date, async (job) => {
        const _job = getJob(id.toString());
        _job.cancel()

        await Prisma.commissionScheduler.update({
            where: {
                id: Number(id)
            },
            data: {
                status: "DONE"
            }
        })
    });
    jobRegistry[id.toString()] = job;
}

// Função para obter um job
export const getJob = (id) => {
    return jobRegistry[id.toString()] || null;
}

// Função para cancelar um job
export const cancelJob = async (id) => {
    const job = getJob(id.toString());
    if (job) {
        job.cancel();
        delete jobRegistry[id];

        await Prisma.commissionScheduler.update({
            where: {
                id: Number(id)
            },
            data: {
                status: "CANCEL"
            }
        })
        console.log(`Job Cancel ${id} cancelado.`);
    } else {
        console.log(`Job Cancel ${id} não encontrado.`);
    }
}

// Função para atualizar um job
export const updateJob = async (id, data) => {
    cancelJob(id);

    const commissionScheduler = await Prisma.commissionScheduler.update({
        where: {
            id: Number(id)
        },
        data
    })

    if (commissionScheduler.status === "SCHEDULER") startJob(commissionScheduler.id, commissionScheduler.date)
    console.log(`Job ${commissionScheduler.id} criado para ${data.date}`);

    return commissionScheduler;
}
