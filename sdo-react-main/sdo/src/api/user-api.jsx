import { appApiIns } from "./app-api";

export function getUserStatus() {
    return appApiIns.get('/api/user_status');
}

export function getUserData() {
    return appApiIns.get('/api/user_data');
}

export const getStudentById = (id) => {
    return appApiIns.get(`/api/teachers/students/${id}/info`);
};

//export const 