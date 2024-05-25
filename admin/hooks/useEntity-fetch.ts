import { useEntityQuery } from "@/features/api/userApiSlice";
import { notFound } from "next/navigation";

type entityType =
    {
        data: any,
        isLoading: boolean,
        isSuccess: boolean,
        isError: boolean,
        error: unknown,
        entityName: string
    }

const useEntityFetch = (entityType: string): entityType => {
    const entityName = entityType
    
    const { data, isLoading, isSuccess, isError, error } = useEntityQuery(entityName);

    if (isError) {
        console.log(error);
        
        return notFound()
    }

    return { data, isLoading, isSuccess, isError, error, entityName }
}

export default useEntityFetch;