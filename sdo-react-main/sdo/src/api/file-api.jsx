import { appApiIns } from "./app-api";

export function getTaskById(taskId) {
    return appApiIns.get(`/api/task/${taskId}`);
}

export function getResultLabStudent(task_id, student_id){
    return appApiIns.get(`/api/task/${task_id}/student/${student_id}`)
}

export function getStudentResultLabId(taskId) {
    return appApiIns.get(`/api/teachers/tasks/${taskId}/students`);
}

export function uploadByTaskId(taskId, formData) {
    return appApiIns.post(`/api/upload/${taskId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
}

export function testingTask(taskId) {
    return appApiIns.post(`/api/test/${taskId}`);
}

export function getTask(task_id){
    return appApiIns.get(`/api/task/${task_id}`);
}

export async function dowlandFile(task_id, student_id, solutionId){
    const response = await appApiIns.get(`/api/task/${task_id}/download/${student_id}`, {
        responseType: 'blob', // Обязательно для скачивания файлов!
    });
    const blob = new Blob([response.data], {
        type: response.headers['content-type'] || 'text/plain',
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `lab_${task_id}_student_${student_id}.py`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
}

export async function dowlandLastCode(task_id, student_id, solution_id){
const response = await appApiIns.get(`/api/task/${task_id}/download/${student_id}/${solution_id}`, {
        responseType: 'blob', // Обязательно для скачивания файлов!
    });
    const blob = new Blob([response.data], {
        type: response.headers['content-type'] || 'text/plain',
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `lab_${task_id}_student_${student_id}.py`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
}