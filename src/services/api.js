import axios from 'axios';
import {
fetchEmployeesUrl,
fetchEmployeeUrl,
createEmployeeUrl,
updateEmployeeUrl,
} from './urls';

export const request = async (url, action, data = null) => {
    let config = { 'Content-Type': 'application/json' };
    try {
        const response = await axios({
            method: action,
            url,
            data,
            headers: config,
        });
        return response;
    } catch (error) {
        if (error.response.status === 500) {
            error.response = "Server Error. Please reach out to an adminstrator." 
            return error;
        } else if (error.response.statusText === "Unauthorized") {
            error.response["data"] = {
                detail: "You have been logged out automatically. Click the button below to sign in."
            }
            return error;
        } else {
            return error;
        }
    }
};

export const getEmployees = async data => {
    return await request(fetchEmployeesUrl(), 'get', data, true);
};

export const getEmployee = async id => {
    return await request(fetchEmployeeUrl(id), 'get');
};


export const createEmployee = async data => {
    return await request(createEmployeeUrl(), 'post', data, true);
};

export const updateEmployee = async (id, data) => {
  return await request(updateEmployeeUrl(id), 'put', data);
};

export const deleteEmployee = async id => {
  return await request(fetchEmployeeUrl(id), 'delete');
};