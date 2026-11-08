import { useEffect, useState } from 'react'
import *  as S from './SeeResultStudentStyle.js'
import { useParams } from "react-router"
import { getTaskById, getResultLabStudent } from '../../api/file-api';
import SolutionResult from './SolutionResult.jsx';
import {resetAttempts} from '../../api/tasks-api.jsx'
import {getStudentById} from '../../api/user-api.jsx'
import { use } from 'react';


const SeeResultStudent = () => {

    const {task_id, student_id} = useParams()

    const [task, setTask] = useState()
    const [solutions, setSolutions] = useState([])
    const [user, setUsers] = useState({})
    const [studAttemps, setStudentAttemps] = useState({})
    const [filter, setFilter] = useState('all')

    const getTask = (id) => {
        getTaskById(id).then((res) => {
                setTask(res.data)
            }).catch(err => console.log(err))
        }

    const getSolutionStudent = async (task_id, student_id) => {
        try{
            const res = await getResultLabStudent(task_id, student_id)
            setSolutions(res.data.solutions); 
            setStudentAttemps(res.data.attempts)
        }
        catch (error){
            console.log(error)
        }   
    }

    const getInfoStudent = (id) => {
        getStudentById(id).then(res => setUsers(res.data)).catch(res => console.log(res))
    }

    const resetAttempt = async (task_id, student_id) => {
        try{ 
            const res = await resetAttempts(task_id, student_id)
            alert(res.data.message)
            await getSolutionStudent(task_id, student_id)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getTask(task_id)
    }, [task_id])

    useEffect(() => {
        getSolutionStudent(task_id, student_id)
        getInfoStudent(student_id)
    }, [student_id])

    




    return(
        <S.Container>
            <S.Description>
                <S.DescriptionText>
                    {task?.description?.replace(/\\n/g, '\n')}
                </S.DescriptionText>
                <S.DescriptionTest>
                    <S.DescriptionTextBold>Тестовый пример:</S.DescriptionTextBold>
                    <S.DescriptionTextBold>Формат вводных данных</S.DescriptionTextBold>
                    <S.DescriptionText>{task?.first_test_case?.inp}</S.DescriptionText>
                    <S.DescriptionTextBold>Формат выводных данных</S.DescriptionTextBold>
                    <S.DescriptionText>{task?.first_test_case?.out}</S.DescriptionText>
                </S.DescriptionTest>
            </S.Description>
            <S.LimitBlock>
                <S.LimitBlockName>Ограничения задачи</S.LimitBlockName>
                <S.LimitBlockLi>
                    <S.LimitBlockText>Количество переменных:</S.LimitBlockText>
                    <S.LimitBlockTextZ>{task?.max_variables || "-"}</S.LimitBlockTextZ>
                </S.LimitBlockLi>
                <S.LimitBlockLi>
                    <S.LimitBlockText>Длина кода:</S.LimitBlockText>
                    <S.LimitBlockTextZ>{task?.max_code_length ? (task?.max_code_length + ' строк') : "-"}</S.LimitBlockTextZ>
                </S.LimitBlockLi>
                <S.LimitBlockLi>
                    <S.LimitBlockText>Объем памяти:</S.LimitBlockText>
                    <S.LimitBlockTextZ>{task?.max_memory_mb ? (task?.max_memory_mb + ' кб') : "-"}</S.LimitBlockTextZ>
                </S.LimitBlockLi>
                <S.LimitBlockLi>
                    <S.LimitBlockText>Время выполнения:</S.LimitBlockText>
                    <S.LimitBlockTextZ>{task?.max_execution_time_sec ? (task?.max_execution_time_sec + ' сек') : "-"}</S.LimitBlockTextZ>
                </S.LimitBlockLi>
                <S.LimitBlockLi>
                    <S.LimitBlockText>Количество попыток:</S.LimitBlockText>
                    <S.LimitBlockTextZ>{(task?.max_attempts || "-") + " попыток"}</S.LimitBlockTextZ>
                </S.LimitBlockLi>
            </S.LimitBlock>
            <S.Info>
                <S.StudentInfo>{"Студент: " + user?.last_name + " " + user?.first_name + " " + user?.middle_name}</S.StudentInfo>
                <S.Filter value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">Все решения</option>
                    <option value="Success">Успешные</option>
                    <option value="Failed">С ошибками</option>
                    <option value="unknown">Не проверенные</option>
                </S.Filter>
            </S.Info>
            <S.TaskStudentAttemps>
                <S.TaskStudentAttempsName>Статистика попыток</S.TaskStudentAttempsName>
                <S.Attemps>Использовано попыток <span>{studAttemps?.attempt_used + " из " + task?.max_attempts}</span></S.Attemps>
                <S.AttempsLine>
                    <S.AttempsLineProgres $width ={(studAttemps?.attempt_used/task?.max_attempts) * 100}></S.AttempsLineProgres>
                </S.AttempsLine>
                <S.Attemps>Всего отправок решения <span>{studAttemps?.attempt_all}</span></S.Attemps>
                <S.ThrowAttemps onClick={() => {resetAttempt(task_id, student_id)}}>Сбросить попытки</S.ThrowAttemps>
            </S.TaskStudentAttemps> 
            <S.SolutionsBlock>
                {solutions.length !== 0 ? 
                solutions
                .filter(solution => filter === 'all' || solution.status === filter)
                .map((solution, index) => <SolutionResult key={solution.id} id={solution.id} index = {index} code={solution.code} testResult={solution.test_result} task_id={task_id} student_id={student_id}/>) 
                : <span>Решений не предоставленно</span>}
            </S.SolutionsBlock>
        </S.Container>
    )
}

export default SeeResultStudent