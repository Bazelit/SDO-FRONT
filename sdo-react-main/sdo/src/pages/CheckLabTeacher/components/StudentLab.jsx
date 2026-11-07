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
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();
    const parsedScore = Number(scoreInput);
    const isScoreValid = scoreInput.trim() !== '' &&
        Number.isFinite(parsedScore) &&
        parsedScore >= 0 &&
        parsedScore <= 100;

    const changeMark = async (taskId, userId) => {
        if (!isScoreValid) {
            setSave('Введите балл от 0 до 100');
            return;
        }

        setIsSaving(true);
        try {
            await patchMark(taskId, userId, parsedScore);
            setSave('Сохранено')
        } catch (error) {
            console.error('Ошибка сохранения оценки:', error);
            setSave('Ошибка сохранения');
        } finally {
            setIsSaving(false);
        }
    }


    const DowlandFile = async (task_id, student_id,solution_id) => {
        await dowlandFile(task_id, student_id, solution_id)
    }

    const changeEsp = () => {
        setIsEditingScore((prev) => !prev)
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
                            type="number"
                            min="0"
                            max="100"
                            step="any"
                            value={scoreInput}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                                setScoreInput(e.target.value);
                                setSave('Сохранить');
                            }}
                            onBlur={() => setIsEditingScore(false)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setIsEditingScore(false);
                                }
                            }}
                            placeholder="0-100"
                            autoFocus
                        />
                        {scoreInput !== '' && !isScoreValid && (
                            <S.ScoreError role="alert">
                                Балл должен быть от 0 до 100
                            </S.ScoreError>
                        )}
                        </S.ScoreEditBox>
                    ) : <span onClick={() => changeEsp()} style={{ cursor: 'pointer' }}>
                            {scoreChange()}
                        </span>}
                </S.StudentLabChange>
                <S.BtnSave
                    type="button"
                    disabled={!isScoreValid || isSaving}
                    onClick={() => changeMark(task_id, stud_id)}
                >
                    {save}
                </S.BtnSave>
            </S.StudentLabAction>) : (<S.StudentLabNo><S.StudentLabChange>Не выполнено</S.StudentLabChange></S.StudentLabNo>)
            }
        </S.StudentsLab>

        
    )
}

export default StudentLab