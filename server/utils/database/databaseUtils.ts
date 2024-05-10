import { db } from "@/db"
import NodeCache from 'node-cache';
const cache = new NodeCache();

export const getUserByEmail = async (email: string, { includePassword = false }: { includePassword?: boolean } = {}) => {
    return await getEntityByField('user', 'email', email, includePassword)
}

export const getUserByPhoneNumber = async (phoneNumber: string, { includePassword }: { includePassword: boolean }) => {
    return await getEntityByField('user', 'phoneNumber', phoneNumber, includePassword);
}

export const getUserById = async (id: string, { includePassword = false }: { includePassword?: boolean } = {}) => {
    const user = await getEntityByField('user', 'id', id, includePassword);
    return user;
}

export const getvendorById = async (id: string,) => {
    return await db.vendor.findUnique({ where: { id } });
}

export const getVendorByUserId = async (userId: string) => {
    return await db.vendor.findUnique({ where: { userId } });
}


export const getvendorByEmail = async (email: string, { password }: { password: boolean }) => {
    return await getEntityByField('vendor', 'email', email, true);
}

export const getEntityByField = async (entity: 'user' | 'vendor', fields: any, value: any, includePassword = false) => {
    const result = (await db[entity].findUnique as any)({
        where: ({
            [fields]: value
        } as any)
    }) as any

    if (includePassword) {
        return result
    }

    result.password = null;
    return result
}

export const getAnyByField = async (any: any, field: any, value: any, include?: any) => {
    const result = (await (db[any] as any).findUnique as any)({
        where: ({
            [field]: value
        } as any)
    }) as any

    return result

}