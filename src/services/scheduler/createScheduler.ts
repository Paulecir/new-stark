import Prisma from "@/infra/db/prisma";
import moment from "moment";
import { createJob } from "./jobScheduler";

function getNextOccurrence(referenceDate, schedulerType, scheduleData) {
    const ref = moment(referenceDate); // Converte para momento para cálculos
    let nextOccurrence;

    switch (schedulerType) {
        case 'diary': {
            const { hour, minute } = scheduleData;
            nextOccurrence = ref.clone().hour(hour).minute(minute).second(0);
            if (nextOccurrence.isBefore(ref)) {
                nextOccurrence.add(1, 'day');
            }
            break;
        }

        case 'weekly': {
            const { dayIfWeek, hour, minute } = scheduleData; // Domingo: 0, Sábado: 6
            nextOccurrence = ref.clone().hour(hour).minute(minute).second(0).day(dayIfWeek);
            if (nextOccurrence.isBefore(ref)) {
                nextOccurrence.add(1, 'week');
            }
            break;
        }

        case 'monthly': {
            const { day, hour, minute } = scheduleData;
            nextOccurrence = ref.clone().date(day).hour(hour).minute(minute).second(0);
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
export const createScheduler = async () => {

    const amount = 10;
    const category = await Prisma.category.findFirst({
        where: {
            id: 1
        }
    })
    const scheduler = await Prisma.commissionScheduler.findFirst({
        where: {
            category_id: category.id,
            type: "COMMISION"
        },
        orderBy: {
            date: "desc"
        }
    })

    const currentDate = moment(scheduler?.date)

    const info = getNextOccurrence(currentDate, category.commission_yield_type, category.commission_yield_config)

    const schedulerJob = createJob({
        category_id: category.id,
        type: "COMMISION",
        date: moment(info).toDate(),
        amount,
    })
    console.log(schedulerJob)
}