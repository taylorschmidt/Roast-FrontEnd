//get items from local storage
export const getItem = (key) => {
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key))
    }
    return null;
}

//set items from local storage
export const setItem = (key, data) => {
    return localStorage.setItem(key, JSON.stringify(data))
}

//remove items from local Storage
export const removeItem = (key) => {
    return localStorage.removeItem(key)
}