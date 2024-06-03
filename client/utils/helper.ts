export const getEntityFromLocalStorage = (entity: string) => {
    let user = null;

    if (typeof localStorage !== 'undefined') {
        const localStorageuser = localStorage.getItem(entity);
        if (localStorageuser !== null) {
            try {
                user = JSON.parse(localStorageuser);
            } catch (error) {
                console.error(`Error while parsing the error`);
            }
        }
    }


    return user
}