import { useState } from "react"
import * as S from "./SeeResultStudentStyle"
import { dowlandLastCode } from "../../api/file-api"


const SolutionResult = ({id, index, code, testResult, task_id, student_id}) => {

    //функция, которая форматирует выходные данные пользователя при какой то ошибке.
    const formatError = (str) => {
        if (!str) return "-"

        if (str.includes("invalid syntax")){
            return "invalid syntax"
        }
    }

    const [seeDetails, setSeeDetails] = useState(false)
    const [seeCode, setSeeCode] = useState(false)
    const [seeTest, setSeeTest] = useState(false)

    return (
        <>
        <S.SolutionBlock $color={
                testResult?.execution_status === "Success"
                    ? "#E6F4CF"
                    : testResult?.execution_status === "Failed"
                        ? "#F9DFDF8C"
                        : "#d6d6d6"
            }>
            <S.SolutionInfo>
                <S.SolutionBlockText>Решение {index+1}</S.SolutionBlockText>
                <S.DetailsBtn onClick = {() => setSeeDetails(!seeDetails)}>{seeDetails ? "Скрыть" : 'Подробнее'}</S.DetailsBtn>
            </S.SolutionInfo>
            {seeDetails && 
            (<S.SolutionDetails>
                <S.SolutionBlockCode>
                    <S.SolutionBlockCodeBtn onClick={() => setSeeCode(!seeCode)}>{seeCode ? "Скрыть код" : "Показать код"}</S.SolutionBlockCodeBtn>
                    <S.SolutionBlockCodeBtn onClick={() => dowlandLastCode(task_id, student_id, id)}>Скачать</S.SolutionBlockCodeBtn>
                </S.SolutionBlockCode>
                {seeCode && <S.SolutionDetailsCode>{code}</S.SolutionDetailsCode>}
                <S.SolutionDetailsResult>
                    <S.SolutionDetailsBlock>
                        <S.SolutionDetailsResultText>Тестирование</S.SolutionDetailsResultText>
                        <S.SolutionDetailsResultInfo>{testResult?.execution_status ? testResult.execution_status : "Не протестированно"}</S.SolutionDetailsResultInfo>
                        {testResult?.execution_status != null &&
                        <>
                        <span></span>
                        <S.SolutionDetailTestBtn onClick={() => setSeeTest(!seeTest)}>
                            <S.SolutionDetailTestBtnText>Подробнее о тестировании</S.SolutionDetailTestBtnText>
                            <S.SolutionDetailTestBtnTextBtn>{seeTest ? "Скрыть" : "Показать"}</S.SolutionDetailTestBtnTextBtn>
                        </S.SolutionDetailTestBtn>
                        </>}
                    </S.SolutionDetailsBlock>
                    {seeTest && 
                    (testResult?.execution_status === "Success" ?
                    <>
                    <S.SolutionDetailsBlock>
                        <S.SolutionDetailsResultText>Длина кода</S.SolutionDetailsResultText>
                        <S.SolutionDetailsResultInfo>{testResult?.code_length != null ? `Строки: ${testResult.code_length}` : "—"}
                        </S.SolutionDetailsResultInfo>
                    </S.SolutionDetailsBlock>
                    <S.SolutionDetailsBlock>
                        <S.SolutionDetailsResultText>Время выполнения</S.SolutionDetailsResultText>
                        <S.SolutionDetailsResultInfo>{testResult?.execution_time ?? "—"}</S.SolutionDetailsResultInfo>
                    </S.SolutionDetailsBlock>
                    <S.SolutionDetailsBlock>
                        <S.SolutionDetailsResultText>Используемая память</S.SolutionDetailsResultText>
                        <S.SolutionDetailsResultInfo>{testResult?.memory_used_mb ?? "—"}</S.SolutionDetailsResultInfo>
                    </S.SolutionDetailsBlock>
                    <S.SolutionDetailsBlock>
                        <S.SolutionDetailsResultText>Количество переменных</S.SolutionDetailsResultText>
                        <S.SolutionDetailsResultInfo>{testResult?.variables_used?? "0"}</S.SolutionDetailsResultInfo>
                    </S.SolutionDetailsBlock>
                    </> : 
                    <>
                    <S.SolutionDetailsBlock>
                        <S.SolutionDetailsResultText>Ошибка</S.SolutionDetailsResultText>
                        <S.SolutionDetailsResultInfo>{testResult?.code_output}
                        </S.SolutionDetailsResultInfo>
                    </S.SolutionDetailsBlock><S.SolutionDetailsBlock>
                        <S.SolutionDetailsResultText>Входные данные</S.SolutionDetailsResultText>
                        <S.SolutionDetailsResultInfo>{testResult?.input_data}</S.SolutionDetailsResultInfo>
                    </S.SolutionDetailsBlock>
                    <S.SolutionDetailsBlock>
                        <S.SolutionDetailsResultText>Выходные данные</S.SolutionDetailsResultText>
                        <S.SolutionDetailsResultInfo>{testResult?.expected_output}</S.SolutionDetailsResultInfo>
                    </S.SolutionDetailsBlock>
                    <S.SolutionDetailsBlock>
                        <S.SolutionDetailsResultText>Выходные данные пользователя</S.SolutionDetailsResultText>
                        <S.SolutionDetailsResultInfo>{formatError(testResult?.user_output)}</S.SolutionDetailsResultInfo>
                    </S.SolutionDetailsBlock>
                    </>)}
                </S.SolutionDetailsResult>
            </S.SolutionDetails>)}
        </S.SolutionBlock>
        </>
    )
}

export default SolutionResult