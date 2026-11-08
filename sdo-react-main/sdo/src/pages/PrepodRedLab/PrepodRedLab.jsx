import React, { useState, useEffect, useRef } from "react";
import {
  Section,
  BigBlock,
  MinBlock,
  UlMinBlock,
  UlList,
  List,
  TitleInput,
  TestsIOBlock,
  RestrictionsBlock,
  RestrictionRoom,
  TitleBlock,
  ButtonAdd,
  FormSelect,
  Notification,
  TwoColumnRow,
} from "../../styles/labFormStyles";
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
        <UlList $Margin="40px auto">
          <List $Block>
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
                <div className="selects-row">
                  <div>
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
                  <div>
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
            <ButtonAdd type="button" onClick={importTestsFromText}>Импортировать тесты</ButtonAdd>
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
        <Notification className="app-toast" $isSuccess={isSuccess} $visible={showNotification}>
          {responseMessage}
        </Notification>
      )}
    </>
  );
};

export default PrepodRedLab;