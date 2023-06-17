import fetch from 'cross-fetch';
import { errorToastify } from './toastifyMessages';

export const addDelay = (data: any, delay: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });    
};

export const discount = (price: number, percentage: number) => {
    let result = (price - ((price*percentage)/100)).toFixed(2);
    return result.toString();
};

export const createID = () => {
    return Math.floor((Math.random() * 100000) + (Math.random() * 10000) + (Math.random() * 1000) + (Math.random() * 100) + (Math.random() * 10));
};

export const sortByProperty = (array: any[], property: string) => {
    const aux = [...array];
    return aux.sort((a,b) => a[property] - b[property]);
}

//const url = "http://localhost:3001"

export const useFetch = async(endpoint: string, method: string, body: any) => {
    try {
        const url = process.env.REACT_APP_API_URL;
        const token = JSON.parse(localStorage.getItem("login")!).token;
        const response = await fetch(`${url}${endpoint}`, {
            method: method,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",  
            },
            body: JSON.stringify(body)
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } 
        else {
            //errorToastify(response.statusText)
            throw new Error(response.statusText)   
        }
    } catch (error) {
        console.log(error);
        //errorToastify("An error ocurred")
    }
}