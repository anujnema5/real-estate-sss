export const getEntityFromLocalStorage = (entity: string) => {
    let admin = null;

    if (typeof localStorage !== 'undefined') {
        const localStorageAdmin = localStorage.getItem(entity);

        if (localStorageAdmin !== null) {
            try {
                admin = JSON.parse(localStorageAdmin);
            } catch (error) {
                console.error(`Error while parsing the error`);
            }
        }
    }

    return admin
}


export const prettyDate = (isoDate: string) => {

    // Convert to Date object
    const date = new Date(isoDate);

    // Format the date to desired output
    const simpleDate = date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2) + ' ' +
        ('0' + date.getHours()).slice(-2) + ':' +
        ('0' + date.getMinutes()).slice(-2) + ':' +
        ('0' + date.getSeconds()).slice(-2);

    return simpleDate;

}
