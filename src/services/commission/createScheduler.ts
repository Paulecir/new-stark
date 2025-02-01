import PrismaLocal from "@/infra/db/prisma";
import { CommissionScheduler, SchedulerCommisionStatus, SchedulerCommisionType } from "@prisma/client";
import moment from "moment";


export const createScheduler = async ({ category_id, type }: { category_id: bigint, type: SchedulerCommisionType }, Prisma = PrismaLocal) => {

    const category = await Prisma.category.findFirst({
        where: {
            id: Number(category_id)
        }
    })

    const currentDate = moment().add(1, "seconds")

    const info = getNextOccurrence(currentDate, category.commission_yield_type, category.commission_yield_config, type)

    const data = {
        category_id: category.id,
        type,
        date: moment(info).toDate(),
        amount: 0
    }

    const commissionScheduler = await Prisma.commissionScheduler.upsert({
        where: {
            type_category_id_date: {
                type,
                category_id: category.id,
                date: moment(info).toDate()
            }
        },
        create: data,
        update: data
    })

    return commissionScheduler;
}

function getNextOccurrence(referenceDate, schedulerType, scheduleData, type: SchedulerCommisionType) {
    const ref = moment(referenceDate); // Converte para momento para cálculos
    let nextOccurrence;

    if (type === "RESIDUAL") {
        schedulerType = "diary"
        ref.add(1, "hours")
    }

    switch (schedulerType) {
        case 'diary': {
            // const { hour, minute } = scheduleData;
            nextOccurrence = ref.clone().startOf("day");
            if (nextOccurrence.isBefore(ref)) {
                nextOccurrence.add(1, 'day');
            }
            break;
        }

        case 'weekly': {
            // const { dayIfWeek, hour, minute } = scheduleData; // Domingo: 0, Sábado: 6
            nextOccurrence = ref.clone().startOf("day");
            if (nextOccurrence.isBefore(ref)) {
                nextOccurrence.add(1, 'week');
            }
            break;
        }

        case 'monthly': {
            // const { day, hour, minute } = scheduleData;
            nextOccurrence = ref.clone().date(0).startOf("day");
            if (nextOccurrence.isBefore(ref)) {
                nextOccurrence.add(1, 'month');
            }
            break;
        }

        case 'semiannual': {
            const { date1, date2 } = scheduleData;
            const firstDate = moment(date1, 'YYYY-MM-DD');
            const secondDate = moment(date2, 'YYYY-MM-DD');

            const firstOccurrence = firstDate.isAfter(ref) ? firstDate : null;
            const secondOccurrence = secondDate.isAfter(ref) ? secondDate : null;

            if (firstOccurrence && secondOccurrence) {
                nextOccurrence = firstOccurrence.isBefore(secondOccurrence) ? firstOccurrence : secondOccurrence;
            } else {
                nextOccurrence = firstOccurrence || secondOccurrence;
            }

            // Se ambas datas já passaram, incrementa para o próximo ano
            if (!nextOccurrence) {
                nextOccurrence = firstDate.add(1, 'year');
            }
            break;
        }

        case 'annual': {
            const { date } = scheduleData;
            const yearlyDate = moment(date, 'YYYY-MM-DD');
            nextOccurrence = yearlyDate.isAfter(ref) ? yearlyDate : yearlyDate.add(1, 'year');
            break;
        }

        default:
            throw new Error('Tipo de scheduler inválido');
    }

    return nextOccurrence.format('YYYY-MM-DD HH:mm:ss');
}