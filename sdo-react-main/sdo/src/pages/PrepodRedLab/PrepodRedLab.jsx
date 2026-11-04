import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
import { IoFolderOpenOutline, IoCloudUploadOutline } from "react-icons/io5";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/teachers`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const Section = styled.form`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
`;

const BigBlock = styled.div`
  max-width: 1248px;
  width: 100%;
  min-height: ${({ $BigHeight }) => ($BigHeight ? "530px" : "400px")};
  max-height: 530px;
  background-color: ${({ $BigFon }) => ($BigFon ? "#E2EDD0" : "#D5DEF6")};
  border-radius: 10px;
  display: flex;
  gap: ${({ $GapForm }) => ($GapForm ? "75px" : "0px")};
  overflow: hidden;

  .block__test {
    width: 540px;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    position: relative;
    right: 2%;
  }
  .block__one {
    margin-top: 5px;
    width: 700px;
    position: relative;
    top: 4%;
    overflow-y: auto;
    max-height: 480px;
  }
`;

const MinBlock = styled.li`
  width: 592px;
  min-height: 102px;
  height: auto;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
  list-style-type: none;
  position: relative;
  .icon {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
  }
`;

const UlMinBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 5px;
  padding-right: 10px;
  margin: 0 0 10px 0;
  list-style: none;
`;

const UlList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  padding: 0;
  margin: 40px auto;
  width: 100%;
  max-width: 1248px;

  .editing__block-Two {
    padding: 0px 30px 30px 20px;
  }
  .editing__block-text {
    color: #000;
    font-family: "Montserrat";
    font-size: 16px;
  }
  .editing__block-input {
    width: 555px;
    min-height: 100px;
    border-radius: 7px;
    border-style: none;
    color: #000;
    font-family: "Montserrat";
    font-size: 16px;
    line-height: 27px;
    outline: none;
    resize: none;
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px 15px;
  }
  .editing__block-name {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  .some-input {
    border: none;
    border-bottom: 1px solid #000;
    background-color: transparent;
    color: inherit;
    outline: none;
    margin-left: 5px;
    font-family: "Montserrat";
  }
  .block__button {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .block__end {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: #e2edd0;
    border-radius: 5px;
    width: 1248px;
    height: 117px;
    justify-content: center;
    border-style: none;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #d7ebb5eb;
    }
  }
  .block__end-link {
    color: #000;
    font-size: 16px;
    font-family: "Montserrat";
    line-height: 27px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    width: 1248px;
  }
`;

const List = styled.li`
  width: ${({ $Block }) => ($Block ? "1248px" : "608px")};
  min-height: ${({ $Block }) => ($Block ? "80px" : "260px")};
  background-color: ${({ $Back }) => ($Back ? "#E2EDD0" : "#D5DEF6")};
  border-radius: 7px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  list-style-type: none;
  padding: 0 16px;
  box-sizing: border-box;
`;

const TitleInput = styled.input`
  width: 100%;
  max-width: 100%;
  height: 80px;
  font-size: 18px;
  padding: 0 20px;
  border: none;
  border-radius: 7px;
  outline: none;
  font-family: "Montserrat";
  background-color: #ffffff;
  box-sizing: border-box;
`;

const TestsIOBlock = styled.div`
  width: 1248px;
  background-color: #d5def6;
  border-radius: 10px;
  height: 450px;
  .tests-input-title {
    font-size: 19px;
    font-family: "Montserrat";
    font-weight: 500;
    margin-bottom: 15px;
    margin-left: 20px;
  }
  .tests-input {
    margin-bottom: 15px;
    margin-left: 20px;
  }
  .hint {
    font-size: 14px;
    font-family: "Montserrat";
    color: #555;
    margin: 5px 0;
  }
  .tools {
    display: flex;
    gap: 15px;
    margin: 10px 0;
  }
  .tool-icon {
    font-size: 28px;
    cursor: pointer;
    color: #333;
    &:hover {
      color: #4caf50;
    }
  }
  .textarea {
    width: 96.5%;
    height: 150px;
    border-radius: 7px;
    border: none;
    padding: 10px;
    font-family: "Montserrat";
    font-size: 14px;
    outline: none;
    resize: vertical;
  }
`;

const RestrictionsBlock = styled.div`
  width: 1210px;
  background-color: #e2edd0;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
`;

const RestrictionRoom = styled.div`
  width: calc(20% - 16px);
  min-width: 200px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .room-title {
    font-size: 16px;
    font-family: "Montserrat";
    font-weight: 500;
    margin: 0;
  }
  .room-input {
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 0 10px;
    font-family: "Montserrat";
    font-size: 14px;
    outline: none;
    &:focus {
      border-color: #4caf50;
    }
  }
`;

const TitleBlock = styled.h3`
  color: #000;
  font-family: "Montserrat";
  font-size: ${({ $FontSize }) => ($FontSize ? "16px" : "19px")};
  font-weight: ${({ $FontWeight }) => ($FontWeight ? "400" : "500")};
  line-height: ${({ $LineHeight }) => ($LineHeight ? "45px" : "27px")};
  padding-left: ${({ $Padding }) => ($Padding ? "45px" : "0px")};
  margin: ${({ $Margin }) => ($Margin ? "0px" : "none")};
`;

const ButtonAdd = styled.button`
  font-family: "Montserrat";
  width: ${({ $ButtonAddW }) => ($ButtonAddW ? "400px" : "274px")};
  flex-shrink: 0;
  border-radius: 4px;
  border: none;
  background: #fff;
  height: 42px;
  cursor: pointer;
  margin-left: 20px;
  &:hover {
    background: #c8d5f6;
    color: #fff;
    transition: 0.5s;
  }
`;

const FormSelect = styled.select`
  height: 45px;
  border-radius: 5px;
  background-color: #ffffff;
  border: none;
  outline: none;
  font-size: 16px;
  font-family: "Montserrat";
  padding: 0 35px 0 10px;
  width: 100%;
  margin-bottom: 12px;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 5px;
  color: #fff;
  font-family: "Montserrat";
  font-size: 14px;
  background-color: ${({ $isSuccess }) => ($isSuccess ? "#28a745" : "#dc3545")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.5s ease, transform 0.5s ease;
  z-index: 1000;
`;

const TwoColumnRow = styled.div`
  display: flex;
  gap: 25px;
  width: 1248px;
  > * {
    flex: 1;
  }
`;

const PrepodRedLab = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [labTitle, setLabTitle] = useState("");
  const [labDescription, setLabDescription] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({ inp: "", out: "" });
  const [bulkTestsText, setBulkTestsText] = useState("");
  const fileInputRef = useRef(null);
  const descriptionRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const [maxVariables, setMaxVariables] = useState("");
  const [codeLength, setCodeLength] = useState("");
  const [attemptsCount, setAttemptsCount] = useState("");
  const [speedLimit, setSpeedLimit] = useState("");
  const [memoryLimit, setMemoryLimit] = useState("");

  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const autoResizeTextarea = (element) => {
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await api.get("/groups");
        setGroups(res.data);
      } catch (err) {
        console.error("Ошибка загрузки групп:", err);
      }
    };

    const fetchSubjects = async () => {
      try {
        const res = await api.get("/subjects");
        setSubjects(res.data);
      } catch (err) {
        console.error("Ошибка загрузки предметов:", err);
      }
    };

    fetchGroups();
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const res = await api.get(`/labs/${id}`);
        const lab = res.data;
        setLabTitle(lab.name || "");
        setLabDescription(lab.description || "");
        setTests(lab.test_cases || []);
        setSelectedGroup(lab.group_id || "");
        setSubjectId(lab.subject_id || "");
        setAttemptsCount(lab.max_attempts != null ? String(lab.max_attempts) : "");
        setCodeLength(lab.max_code_length != null ? String(lab.max_code_length) : "");
        setSpeedLimit(lab.max_execution_time_sec != null ? String(lab.max_execution_time_sec) : "");
        setMemoryLimit(lab.max_memory_mb != null ? String(lab.max_memory_mb) : "");
        setMaxVariables(lab.max_variables != null ? String(lab.max_variables) : "");
        setLoading(false);
      } catch (err) {
        console.error(err);
        setResponseMessage("Не удалось загрузить лабораторную");
        setIsSuccess(false);
        setLoading(false);
      }
    };
    if (id) fetchLab();
  }, [id]);

  useEffect(() => {
    autoResizeTextarea(descriptionRef.current);
  }, [labDescription, loading]);

  useEffect(() => {
    if (responseMessage) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setResponseMessage("");
      }, 3000);
    }
  }, [responseMessage]);

  const handleAddTest = () => {
    if (!newTest.inp.trim() && !newTest.out.trim()) {
      setResponseMessage("Заполните хотя бы одно поле теста!");
      setIsSuccess(false);
      return;
    }
    setTests([...tests, { id: Date.now(), inp: newTest.inp, out: newTest.out }]);
    setNewTest({ inp: "", out: "" });
  };

  const handleRemoveTest = (index) => {
    setTests(tests.filter((_, i) => i !== index));
  };

  const handleTestCaseChange = (testId, field, value) => {
    setTests((prev) =>
      prev.map((t) => (t.id === testId ? { ...t, [field]: value } : t))
    );
  };

  const importTestsFromText = () => {
    if (!bulkTestsText.trim()) {
      setResponseMessage("Нет текста для импорта!");
      setIsSuccess(false);
      return;
    }
    const lines = bulkTestsText.split(/\r?\n/);
    const newTests = [];
    for (const line of lines) {
      if (line.includes("->")) {
        const [inp, out] = line.split("->").map((s) => s.trim());
        if (inp && out) {
          newTests.push({ id: Date.now() + Math.random(), inp, out });
        }
      }
    }
    if (newTests.length === 0) {
      setResponseMessage("Не найдено тестов в формате input -> output");
      setIsSuccess(false);
    } else {
      setTests((prev) => [...prev, ...newTests]);
      setBulkTestsText("");
      setResponseMessage(`Импортировано ${newTests.length} тестов`);
      setIsSuccess(true);
    }
  };

  const onPickFile = () => fileInputRef.current?.click();
  const onFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setBulkTestsText(ev.target?.result || "");
    reader.readAsText(file);
  };

  const parseOptionalPositiveInt = (value) => {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) return null;
    const parsed = Number.parseInt(trimmed, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  };

  const parseOptionalPositiveFloat = (value) => {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) return null;
    const parsed = Number.parseFloat(trimmed.replace(",", "."));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  };

  const handleSave = async () => {
    if (!labTitle.trim()) {
      setResponseMessage("Введите название!");
      setIsSuccess(false);
      return;
    }
    if (!selectedGroup) {
      setResponseMessage("Выберите группу!");
      setIsSuccess(false);
      return;
    }
    if (!subjectId) {
      setResponseMessage("Выберите предмет!");
      setIsSuccess(false);
      return;
    }
    if (tests.length === 0) {
      setResponseMessage("Добавьте хотя бы один тест!");
      setIsSuccess(false);
      return;
    }

    const payload = {
      task: {
        id: Number(id),
        name: labTitle,
        description: labDescription || "",
        teacher_formula: "",
        input_variables: "",
        subject_id: Number(subjectId),
        group_id: parseInt(selectedGroup),
        test_cases: tests.map((t, idx) => ({
          id: typeof t.id === "number" ? t.id : idx + 1,
          inp: t.inp,
          out: t.out,
        })),
        max_attempts: parseOptionalPositiveInt(attemptsCount) ?? 100,
        max_code_length: parseOptionalPositiveInt(codeLength),
        max_execution_time_sec: parseOptionalPositiveFloat(speedLimit),
        max_memory_mb: parseOptionalPositiveFloat(memoryLimit),
        max_variables: parseOptionalPositiveInt(maxVariables),
      },
    };

    try {
      await api.put(`/labs/${id}`, payload);
      setResponseMessage("Лабораторная работа обновлена!");
      setIsSuccess(true);
      localStorage.setItem("lastEditedLabId", id);
      setTimeout(() => navigate("/Laboratory"), 1500);
    } catch (err) {
      console.error(err);
      setResponseMessage(err.response?.data?.error || "Ошибка обновления");
      setIsSuccess(false);
    }
  };

  if (loading) return <div style={{ padding: 50, textAlign: "center" }}>Загрузка...</div>;

  return (
    <>
      <Section onSubmit={(e) => e.preventDefault()}>
        <UlList>
          <List $Block style={{ width: "1248px", height: "120px" }}>
            <TitleInput
              type="text"
              placeholder="Введите название лабораторной работы"
              value={labTitle}
              onChange={(e) => setLabTitle(e.target.value)}
            />
          </List>

          <TwoColumnRow>
            <List>
              <div className="editing__block-Two">
                <TitleBlock>Описание лабораторной</TitleBlock>
                <p className="editing__block-text">Введите описание</p>
                <textarea
                  ref={descriptionRef}
                  className="editing__block-input"
                  value={labDescription}
                  onChange={(e) => {
                    setLabDescription(e.target.value);
                    autoResizeTextarea(e.target);
                  }}
                  placeholder="Введите текст"
                />
              </div>
            </List>
            <List $Back>
              <div className="editing__block-Two" style={{ width: "100%" }}>
                <div style={{ display: "flex", gap: "16px", width: "100%" }}>
                  <div style={{ flex: 1 }}>
                    <TitleBlock>Группа</TitleBlock>
                    <p className="editing__block-text">Выберите группу</p>
                    <FormSelect value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                      <option value="">Группа</option>
                      {groups.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                    </FormSelect>
                  </div>
                  <div style={{ flex: 1 }}>
                    <TitleBlock>Предмет</TitleBlock>
                    <p className="editing__block-text">Выберите предмет</p>
                    <FormSelect value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                      <option value="">Предмет</option>
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </FormSelect>
                  </div>
                </div>
              </div>
            </List>
          </TwoColumnRow>

          <BigBlock $BigFon $BigHeight $GapForm>
            <div className="block__one">
              <TitleBlock $Padding>Список тестов:</TitleBlock>
              <UlMinBlock>
                {tests.map((test, idx) => (
                  <MinBlock key={test.id || idx}>
                    <TitleBlock $FontSize $FontWeight $Margin>Тест {idx + 1}</TitleBlock>
                    <div className="editing__block-name">
                      <TitleBlock $FontSize $FontWeight $Margin>Входные данные:</TitleBlock>
                      <input
                        type="text"
                        className="some-input"
                        value={test.inp}
                        onChange={(e) => handleTestCaseChange(test.id, "inp", e.target.value)}
                      />
                    </div>
                    <div className="editing__block-name">
                      <TitleBlock $FontSize $FontWeight $Margin>Вывод:</TitleBlock>
                      <input
                        type="text"
                        className="some-input"
                        value={test.out}
                        onChange={(e) => handleTestCaseChange(test.id, "out", e.target.value)}
                      />
                    </div>
                    <IoIosClose className="icon" onClick={() => handleRemoveTest(idx)} />
                  </MinBlock>
                ))}
              </UlMinBlock>
            </div>
            <div className="block__test">
              <TitleBlock>Добавить новый тест:</TitleBlock>
              <div className="editing__block-name">
                <TitleBlock $FontSize $FontWeight>Входные данные:</TitleBlock>
                <input
                  type="text"
                  className="some-input"
                  value={newTest.inp}
                  onChange={(e) => setNewTest({ ...newTest, inp: e.target.value })}
                />
              </div>
              <div className="editing__block-name">
                <TitleBlock $FontSize $FontWeight>Вывод:</TitleBlock>
                <input
                  type="text"
                  className="some-input"
                  value={newTest.out}
                  onChange={(e) => setNewTest({ ...newTest, out: e.target.value })}
                />
              </div>
              <ButtonAdd $ButtonAddW type="button" onClick={handleAddTest}>
                Добавить тест
              </ButtonAdd>
            </div>
          </BigBlock>

          <TestsIOBlock>
            <p className="tests-input-title">Форма для ввода или загрузки тестов</p>
            <div className="tests-input">
              <TitleBlock $FontWeight>Введите тесты в формате:</TitleBlock>
              <div className="hint">input1 -&gt; expected_output1</div>
              <div className="hint">input2 -&gt; expected_output2</div>
              <div className="tools">
                <IoFolderOpenOutline className="tool-icon" onClick={onPickFile} />
                <IoCloudUploadOutline className="tool-icon" onClick={onPickFile} />
                <input
                  type="file"
                  accept=".txt"
                  ref={fileInputRef}
                  onChange={onFileSelected}
                  style={{ display: "none" }}
                />
              </div>
              <textarea
                className="textarea"
                placeholder="Введите тесты в формате: input -> output"
                value={bulkTestsText}
                onChange={(e) => setBulkTestsText(e.target.value)}
              />
            </div>
            <ButtonAdd onClick={importTestsFromText}>Импортировать тесты</ButtonAdd>
          </TestsIOBlock>

          <RestrictionsBlock>
            <RestrictionRoom>
              <p className="room-title">Количество переменных</p>
              <input
                type="text"
                className="room-input"
                placeholder="Максимум переменных"
                value={maxVariables}
                onChange={(e) => setMaxVariables(e.target.value)}
              />
            </RestrictionRoom>
            <RestrictionRoom>
              <p className="room-title">Длина кода</p>
              <input
                type="text"
                className="room-input"
                placeholder="Максимальная длина кода"
                value={codeLength}
                onChange={(e) => setCodeLength(e.target.value)}
              />
            </RestrictionRoom>
            <RestrictionRoom>
              <p className="room-title">Количество попыток</p>
              <input
                type="text"
                className="room-input"
                placeholder="Максимум попыток"
                value={attemptsCount}
                onChange={(e) => setAttemptsCount(e.target.value)}
              />
            </RestrictionRoom>
            <RestrictionRoom>
              <p className="room-title">Скорость работы</p>
              <input
                type="text"
                className="room-input"
                placeholder="Ограничение по времени (сек)"
                value={speedLimit}
                onChange={(e) => setSpeedLimit(e.target.value)}
              />
            </RestrictionRoom>
            <RestrictionRoom>
              <p className="room-title">Используемая память</p>
              <input
                type="text"
                className="room-input"
                placeholder="Ограничение по памяти (МБ)"
                value={memoryLimit}
                onChange={(e) => setMemoryLimit(e.target.value)}
              />
            </RestrictionRoom>
          </RestrictionsBlock>

          <div className="block__button">
            <button className="block__end" type="button" onClick={handleSave}>
              <span className="block__end-link">Завершить редактирование и сохранить</span>
            </button>
          </div>
        </UlList>
      </Section>
      {showNotification && (
        <Notification $isSuccess={isSuccess} $visible={showNotification}>
          {responseMessage}
        </Notification>
      )}
    </>
  );
};

export default PrepodRedLab;