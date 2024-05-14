import { db } from "@/db";
import { CustomError } from "@/utils/responses/api.error";

export const checkExistingProperty = async (propertyId: string) => {
    const existingProperty = await db.property.findUnique({ where: { id: propertyId } })

    if (!existingProperty) {
        throw new CustomError(401, 'Property does not exist');
    }

    return existingProperty;
}