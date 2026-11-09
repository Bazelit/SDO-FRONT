import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import FileUploader from './FileUploader';
import { uploadByTaskId, testingTask, getTaskById } from '../../api/file-api';
import { deleteSolution, hiddenSolution } from '../../api/tasks-api';

const Container = styled.div`
  width: 100%;
  max-width: 1320px;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  font-family: "Montserrat", sans-serif;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const TitleText = styled.p`
  font-size: 20px;
  text-align: left;
  min-width: 0;

  @media (max-width: 480px) {
    font-size: 17px;
    margin: 4px 0;
  }
`;

const StatusMarker = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ status }) => (status === 'Success' ? '#4CAF50' : '#F44336')};
  color: white;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
  white-space: nowrap;
`;

const BlockTest = styled.div`
  width: 100%;
  background-color: #F0F0F0;
  border-radius: 7px;
  padding: 15px;
`;

const BlockDescription = styled.div`
  width: 100%;
  background-color: #E0E0E0;
  border-radius: 7px;
  padding: 15px;

  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;

const BlockLimits = styled.div`
  width: 100%;
  background-color: #F5F0E6;
  border-radius: 7px;
  padding: 15px;

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const LimitsTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 10px;
`;

const SolutionMetaText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 0 10px;
`;

const BlockTask = styled.div`
  width: 100%;
  background-color: #D9D9D9;
  padding: 10px;
  border-radius: 7px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-left: 10px;
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.5;
  margin-left: 10px;
  font-family: Montserrat;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0%;

  span{
  font-weight:600
  }
`;

const SolutionContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #FFFFFF;
  border-radius: 7px;

  @media (max-width: 480px) {
    margin-top: 12px;
    padding: 10px;
  }
`;

const SolutionCode = styled.pre`
  font-size: 14px;
  background-color: #F0F0F0;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ToggleButton = styled.button`
  background-color: #FFFFFF;
  border: none;
  padding: 5px 10px;
  font-family: "Montserrat";
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #E0E0E0;
  }
`;

const Button = styled.button`
  padding: 10px;
  width: 100%;
  height: 91px;
  background-color: #fff;
  border-style: none;
  border-radius: 7px;
  font-family: "Montserrat";
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;

  &:hover {
    background: #D9D9D9;
    color: #000;
    transition: 0.3s;
  }

  @media (max-width: 600px) {
    height: 56px;
    margin: 0;
    background-color: #DDE5F8;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const UploadTitle = styled.div`
  background-color: #D9D9D9;
  padding: 10px;
  margin: 0;
`;

const UploadContainer = styled.div`
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 0 0 7px 7px;
`;

const FileText = styled.h1`
  font-size: 16px;
  padding: 0;
`;

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px;
  background-color: ${({ success }) => (success ? '#4CAF50' : '#F44336')};
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-family: "Montserrat";
  font-size: 16px;
  max-width: 300px;
  z-index: 1000;
  opacity: 0;
  transform: translateY(20px);
  animation: ${({ isExiting }) => (isExiting ? 'fadeOut' : 'fadeIn')} 0.3s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

const ErrorNotification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: 15px;
  background-color: #F44336;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-family: "Montserrat";
  font-size: 14px;
  max-width: 400px;
  z-index: 1000;
  opacity: 0;
  transform: translateY(20px);
  animation: ${({ isExiting }) => (isExiting ? 'fadeOut' : 'fadeIn')} 0.3s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #F44336;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: #D32F2F;
  }
`;

const SolutionItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #E0E0E0;
  &:last-child {
    border-bottom: none;
  }
`;

const SolutionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 32px;
`;

const SolutionTitle = styled.h2`
  font-size: 16px;
  font-family: "Montserrat";
  margin: 0;
`;

const SolutionCodeBtn = styled.span`
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 10px solid #333;
    cursor: pointer;

    transform: rotate(${props => props.$isOpen ? '180deg' : '0deg'});
    transition: transform 0.2s ease;
`
const ErrorTestCase = styled.div`
  margin-left: 10px
`

const InputValue = styled.div`
  margin: 5px;
  font-family: Montserrat;
  font-weight: 400;
  font-style: Regular;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0%;
`

const ExpectedOutput = styled.div`
  margin: 5px;
  color: #4CAF50;
  font-family: Montserrat;
  font-weight: 400;
  font-style: Regular;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0%;
`
const UserOutput = styled.div`
  margin: 5px;
  color:  #F44336;
  font-family: Montserrat;
  font-weight: 400;
  font-style: Regular;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0%;
`

const ErrorTestBtn = styled.span`
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 10px solid #333;
    cursor: pointer;
    margin-left: 10px;

    transform: rotate(${props => props.$isOpen ? '180deg' : '0deg'});
    transition: transform 0.2s ease;
`

const BlockAttempts = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-self: flex-start;
    max-width: 100%;
    align-items: center;
    gap: 6px;
    min-height: 49px;
    background-color: #F0F0F0;
    padding: 0 8px;
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;

    /* телефон: каждая строка статистики отдельно, без разделителей */
    @media (max-width: 600px) {
        align-self: stretch;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        padding: 8px 12px;
        font-size: 16px;
    }
`

const Divider = styled.div`
  margin: 0 8px;
  width: 2px;
  height: 30px;
  background-color: #000000;

  @media (max-width: 600px) {
    display: none;
  }
`


const LabaStud = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [file, setFile] = useState(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isNotificationExiting, setIsNotificationExiting] = useState(false);
  const [errorNotification, setErrorNotification] = useState(null);
  const [isErrorNotificationExiting, setIsErrorNotificationExiting] = useState(false);
  const [showSolutionsCode, setShowSolutionsCode] = useState({})
  const [showErrorTestCase, setShowErrorTestCase] = useState({})
  const [isLoad, setIsLoad] = useState()
  const [lastSolutionId, setLastSolutionId] = useState()

  const loadTask = async () => {
    console.log('Загрузка задачи с ID:', taskId);
    return getTaskById(taskId)
      .then((res) => {
        setTask(res.data);
        setLastSolutionId((res.data.solutions[res.data.solutions.length-1].id).toString())
      })
      .catch((error) => {
        console.error('Ошибка загрузки задачи:', error.message);
      });
  }

  useEffect(() => {
    loadTask()
  }, [taskId]);

  const showNotification = (success, message) => {
    if (notification) {
      setIsNotificationExiting(true);
      setTimeout(() => {
        setNotification({ success, message });
        setIsNotificationExiting(false);
      }, 300);
    } else {
      setTimeout(() => {
        setNotification({ success, message });
        setIsNotificationExiting(false);
      }, 300)
    }
    setTimeout(() => {
      setIsNotificationExiting(true);
      setTimeout(() => setNotification(null), 300);
    }, 5000);
  };

  const closeErrorNotification = () => {
    setIsErrorNotificationExiting(true);
    setTimeout(() => setErrorNotification(null), 300);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      uploadByTaskId(taskId, formData)
        .then(() => {
          showNotification(true, 'Файл успешно загружен!');
          loadTask();
        })
        .catch((error) => {
          showNotification(false, 'Ошибка при загрузке файла!');
          console.error('Ошибка при загрузке файла:', error);
        });
    } else {
      alert('Пожалуйста, выберите файл для загрузки.');
    }
  };

  const handleTest = async () => {
    if (task.max_attempts - task.attempts_user.attempt_used === 0){
      alert("Вы привысили лимит попыток, обратитесь к преподавателю")
      return
    }
    setIsLoad(true)
    testingTask(taskId)
      .then((res) => {
        const testResult = res.data;
        showNotification(
          testResult.status === 'Success',
          testResult.status === 'Success'
            ? 'Тестирование успешно!'
            : 'Тестирование завершено с ошибкой'
        );
        setIsLoad()
        loadTask();
      })
      .catch((error) => {
        const errorData = error.response?.data || {};
        showNotification(false, 'Тестирование завершено с ошибкой');
        setIsLoad()
        loadTask();
      });
  };

  const handleHiddenSolution = async (solutionId) => {
    try {
        await hiddenSolution(solutionId);
        await loadTask();
        console.log(1)
    } catch (error) {
      console.log(error)
    }
};

  if (!task) {
    return <Container>Загрузка...</Container>;
  }

  const hasVariablesLimit = task.max_variables != null;
  const hasCodeLengthLimit = task.max_code_length != null;
  const hasSpeedLimit = task.max_execution_time_sec != null;
  const hasMemoryLimit = task.max_memory_mb != null;
  const hasLimits = hasVariablesLimit || hasCodeLengthLimit || hasSpeedLimit || hasMemoryLimit;

  return (
    <Container>
      <HeaderContainer>
        <TitleText>{task.name}</TitleText>
        <StatusMarker status={task.status}>
          {task.status === 'Success' ? 'Сдано' : 'Не сдано'}
        </StatusMarker>
      </HeaderContainer>
      <BlockDescription>
        <Text>{task.description.replace(/\\n/g, '\n')}</Text>
        <Text><span>Тестовый пример:</span></Text>
        <Text><span>Входные данные</span></Text>
        <Text>{task?.first_test_case?.inp}</Text>
        <Text><span>Выходные данные</span></Text>
        <Text>{task?.first_test_case?.out}</Text>
      </BlockDescription>

      {hasLimits && (
        <BlockLimits>
          <LimitsTitle>Ограничения проверки:</LimitsTitle>
          {hasVariablesLimit && (
            <SolutionMetaText>
              <strong>Количество переменных:</strong> не более {task.max_variables}
            </SolutionMetaText>
          )}
          {hasCodeLengthLimit && (
            <SolutionMetaText>
              <strong>Длина кода:</strong> не более {task.max_code_length} строк
            </SolutionMetaText>
          )}
          {hasSpeedLimit && (
            <SolutionMetaText>
              <strong>Скорость работы:</strong> не более {task.max_execution_time_sec} сек
            </SolutionMetaText>
          )}
          {hasMemoryLimit && (
            <SolutionMetaText>
              <strong>Используемая память:</strong> не более {task.max_memory_mb} МБ
            </SolutionMetaText>
          )}
        </BlockLimits>
      )}

      <BlockTask>
        <BlockAttempts>
          <span>
            Ваши попытки:
            <strong>{" " + task.attempts_user.attempt_used}</strong>
          </span>
          <Divider></Divider>
          <span>
            Всего ваших попыток:
            Всего ваших попыток:
            <strong>{" " + task.attempts_user.attempt_all}</strong>
          </span>
          <Divider></Divider>
          <span>
            Осталось попыток:
            <strong>{" " + task.max_attempts - task.attempts_user.attempt_used}</strong>
          </span>
        </BlockAttempts>
        {task.solutions.length > 0 && (
          <SolutionContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Title>Ваши решения:</Title>
              <ToggleButton onClick={() => setShowSolutions(!showSolutions)}>
                {showSolutions ? 'Скрыть' : 'Показать'}
              </ToggleButton>
            </div>
            {showSolutions && task.solutions
            .filter(solution => solution.status === 'Success' || !solution.is_hidden)
            .map((solution, index) => (
              <SolutionItem key={index}>
                <SolutionHeader>
                  <SolutionTitle>Решение {index + 1}</SolutionTitle>
                  <SolutionCodeBtn
                  $isOpen={!!showSolutionsCode[solution.id]}
                  onClick = {() => {
                    setShowSolutionsCode((prev) => ({
                      ...prev,
                      [solution.id]: !prev[solution.id]
                    }))
                  }}></SolutionCodeBtn>
                  {solution.status !== 'Success' && <DeleteButton onClick={() => handleHiddenSolution(solution.id)}>
                    ✕
                  </DeleteButton>}
                </SolutionHeader>
                {showSolutionsCode[solution.id]  && (<SolutionCode>{solution.code}</SolutionCode>)}
                <Text><strong>Статус решения:</strong> {(isLoad && solution.id == lastSolutionId) ? "Идет тестирование" : (solution.status === 'unknown' ? "Не протестировано" : solution.status)}
                {solution.status === 'Failed' && <ErrorTestBtn
                $isOpen={showErrorTestCase[solution.id]}
                onClick = {() => {
                  setShowErrorTestCase((prev) => ({
                    ...prev,
                    [solution.id]: !prev[solution.id]
                  }))
                }}
                ></ErrorTestBtn>}
                </Text>
                {showErrorTestCase[solution.id] && <ErrorTestCase>
                  {(solution.test_result?.code_output ||
                    solution.test_result?.error ||
                    solution.test_result?.message ||
                    solution.error_message) && (
                    <>
                      <strong>Ошибка тестов</strong>
                      <UserOutput>
                        {solution.test_result?.code_output ||
                          solution.test_result?.error ||
                          solution.test_result?.message ||
                          solution.error_message}
                      </UserOutput>
                    </>
                  )}
                  <strong>Входящие данные</strong>
                  <InputValue>{solution.test_result?.input_data ?? "—"}</InputValue>
                  <strong>Выходные данные</strong>
                  <ExpectedOutput>{solution.test_result?.expected_output ?? "—"}</ExpectedOutput>
                  <strong>Выходные данные пользователя</strong>
                  <UserOutput>{solution.test_result?.user_output ?? "—"}</UserOutput>
                  </ErrorTestCase>}
              </SolutionItem>
            ))}
          </SolutionContainer>
        )}

        <UploadTitle>
          <FileText>Ответ в виде файла:</FileText>
        </UploadTitle>
        <UploadContainer>
          <FileUploader file={file} setFile={setFile} />
        </UploadContainer>
      </BlockTask>

      <ButtonContainer>
        <Button onClick={handleUpload}>Загрузить</Button>
        <Button onClick={handleTest}>Тестировать</Button>
      </ButtonContainer>

      {notification && (
        <Notification
          className="app-toast"
          success={notification.success}
          isExiting={isNotificationExiting}
        >
          {notification.message}
        </Notification>
      )}

    </Container>
  );
};

export default LabaStud;
