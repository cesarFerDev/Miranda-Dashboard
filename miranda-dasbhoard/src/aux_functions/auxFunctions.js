
export const addDelay = (data, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });    
};

export const discount = (price, percentage) => {
    let result = price - ((price*percentage)/100);
    return result.toString();
};

export const createID = () => {
    return Math.floor((Math.random() * 100000) + (Math.random() * 10000) + (Math.random() * 1000) + (Math.random() * 100) + (Math.random() * 10));
};

export const sortByProperty = (array, property) => {
    const aux = [...array];
    return aux.sort((a,b) => a[property] - b[property]);
}