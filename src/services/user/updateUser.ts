import Prisma from "@/infra/db/prisma";

export const updateUser = async (id: number, data: any) => {
    try {
        const sponsor = await Prisma.user.findFirst({
            where: {
                login: data.sponsor_login
            }
        })
    
    
        const user = await Prisma.user.update({
            where: {
                id
            },
            data
        });
    
        return user;
    } catch (err) {
        console.log("E", err)
        return null
    }
   
}