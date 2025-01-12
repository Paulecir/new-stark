import Prisma from "@/infra/db/prisma";
import bcrypt from "bcrypt"
import { Web3Services } from "../web3/Web3Services";

export const registerUser = async (data: any) => {
    try {
        const sponsor = await Prisma.user.findFirst({
            where: {
                login: data.sponsor_login
            }
        })
    
        const web3Services = new Web3Services();
        const wallet = web3Services.createWallet();
    
        const user = await Prisma.user.create({
            data: {
                name: data.name,
                login: data.login,
                email: data.email,
                phone: data.phone,
                country_name: data.country_name,
                country_code: data.country_code,
                sponsor_id: sponsor.id,
                password: await bcrypt.hash(data.password, 10), // Idealmente, você deve hash a senha antes de salvar,
    
                bep20_address: wallet.address?.toString(),
                bep20_public_key: wallet.publicKey?.toString(),
                bep20_private_key: wallet.encryptedPrivateKey?.toString()
    
            },
        });
    
        return user;
    } catch (err) {
        console.log("E", err)
        return null
    }
   
}