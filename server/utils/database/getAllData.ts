import { db } from "@/db"

export const getALlData = async (entity: any, fields?: Object) => {
    if (fields) {
        const result = (await db[entity] as any).findMany({ where: fields });
        return result;
    }

    const result = (await db[entity] as any).findMany();
    return result;
}