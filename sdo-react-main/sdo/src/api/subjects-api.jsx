import { appApiIns } from "./app-api";

export function getSubjects() {
    return appApiIns.get('/api/subjects');
}

export function getTasks(subject_identifier) {
    return appApiIns.get(`/api/tasks/${subject_identifier}`);
}