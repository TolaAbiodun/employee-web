const ROOT_URL = process.env.REACT_APP_BASE_BACKEND_URL;

export const fetchEmployeesUrl = () => {
    return `${ROOT_URL}/api/v1/employee/employees/`;
};

export const fetchEmployeeUrl = id => {
    return `${ROOT_URL}/api/v1/employee/employees/${id}/`;
};

export const createEmployeeUrl = () => {
    return `${ROOT_URL}/api/v1/employee/employees/`;
};
export const updateEmployeeUrl = id => {
    return `${ROOT_URL}/api/v1/employee/employees/${id}/`;
};
export const deleteEmployeeUrl = id => {
    return `${ROOT_URL}/api/v1/employee/employees/${id}/`;
};
