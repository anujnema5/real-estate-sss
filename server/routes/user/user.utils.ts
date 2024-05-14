import { db } from "@/db"

export const isUserExist = async (id: string)=> {
    const existedUser = await db.user.findUnique({where: {id}});

    if(!existedUser) {
        
    }
}