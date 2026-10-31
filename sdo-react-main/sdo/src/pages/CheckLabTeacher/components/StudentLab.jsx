import * as S from '../CheckLabTeacher.styles'
import { ReactComponent as VectorIcon} from '../../../img/Vector.svg'
import { useState } from 'react';
import {dowlandFile} from '../../../api/file-api'
import { patchMark } from '../../../api/tasks-api';
import { useNavigate } from "react-router-dom";



const StudentLab = ({name, isSubmitted, score, task_id, stud_id}) => {

    const [isEditingScore, setIsEditingScore] = useState(false)
    const [scoreInput, setScoreInput] = useState('')
    const [save, setSave] = useState('Сохранить')
    const navigate = useNavigate();

    const changeMark = (taskId, userId, newMark) => {
        const responce = patchMark(taskId, userId, newMark)
        responce.then((data)=>{
            console.log(data.data)
            setSave('Сохранено')
        }).catch(error => {
            console.log(error)
        })
    }


    const DowlandFile = async (task_id, student_id,solution_id) => {
        await dowlandFile(task_id, student_id, solution_id)
    }

    const changeEsp = () => {
        setIsEditingScore((prev) => !prev)
    }

    const handleSaveScore = () => {
        if (!isNaN(Number(scoreInput)) && Number(scoreInput) >= 0 && Number(scoreInput) <= 100) {
            setScoreInput(scoreInput)
        }
    }

    const scoreChange = () => {
        if (scoreInput === ''){
            return <>Изменить оценку</>
        }
        return <S.StudentLabChange>Оценка изменена <span style={{fontWeight: '600', marginLeft: '10px', color: scoreInput > 75 ? '#21B200' : '#FF7070' }}>{scoreInput}/100</span></S.StudentLabChange>
    }

    return (
        <S.StudentsLab $color={isSubmitted ? (score > 60 ? "#E6F4CF" : "#F9DFDF8C") : "#F0F0F0"}>
            <S.StudentsLabText>
                {name}
            </S.StudentsLabText>
            {isSubmitted ? (
            <S.StudentLabAction>
                <S.StudentsLabtn onClick={() => navigate(`/seeresultstudent/${task_id}/${stud_id}`)}>Просмотр результатов</S.StudentsLabtn>
                <S.StudentLabResult $color={score > 75 ? "#21B200" : "#FF7070"}>{score}/100</S.StudentLabResult>
                <S.StudentLabDowland onClick = {() => DowlandFile(task_id, stud_id)}><VectorIcon/></S.StudentLabDowland>
                <S.StudentLabChange>
                    {isEditingScore ? (
                        <S.ScoreEditBox>
                            Введите оценку
                        <input
                            type="text"
                            value={scoreInput}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {if ( 0 <= Number(e.target.value) && Number(e.target.value) <= 100) setScoreInput(e.target.value)}}
                            onBlur={() => {
                                handleSaveScore(); 
                                setIsEditingScore(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                handleSaveScore();
                                setIsEditingScore(false);
                                }
                            }}
                            placeholder="0-100"
                            autoFocus
                        />
                        </S.ScoreEditBox>
                    ) : <span onClick={() => changeEsp()} style={{ cursor: 'pointer' }}>
                            {scoreChange()}
                        </span>}
                </S.StudentLabChange>
                <S.BtnSave onClick = {() => {changeMark(task_id, stud_id, scoreInput)}}>
                    {save}
                </S.BtnSave>
            </S.StudentLabAction>) : (<S.StudentLabNo><S.StudentLabChange>Не выполнено</S.StudentLabChange></S.StudentLabNo>)
            }
        </S.StudentsLab>

        
    )
}

export default StudentLab