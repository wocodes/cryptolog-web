let getFromStorage = function(key) {
    return localStorage.getItem(key);
}

let saveToStorage = function(key, value) {
    return localStorage.setItem(key, value);
}

let deleteFromStorage = function(key) {
    return localStorage.removeItem(key);
}

export {getFromStorage, saveToStorage, deleteFromStorage}
