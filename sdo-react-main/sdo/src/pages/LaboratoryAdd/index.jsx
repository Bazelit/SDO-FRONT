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
import { useNavigate } from "react-router-dom";
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

const LaboratoryAdd = () => {
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

  const [maxVariables, setMaxVariables] = useState("");
  const [codeLength, setCodeLength] = useState("");
  const [attemptsCount, setAttemptsCount] = useState("");
  const [speedLimit, setSpeedLimit] = useState("");
  const [memoryLimit, setMemoryLimit] = useState("");

  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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

  const autoResizeTextarea = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        id: 0,
        name: labTitle,
        description: labDescription || "",
        teacher_formula: "",
        input_variables: "",
        subject_id: Number(subjectId),
        group_id: parseInt(selectedGroup),
        test_cases: tests.map((t, idx) => ({
          id: idx + 1,
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
      await api.post("/lab", payload);
      setResponseMessage("Лабораторная работа создана!");
      setIsSuccess(true);
      setTimeout(() => navigate("/Laboratory"), 1500);
    } catch (err) {
      console.error(err);
      setResponseMessage(err.response?.data?.error || "Ошибка создания");
      setIsSuccess(false);
    }
  };

  return (
    <>
      <Section onSubmit={handleSubmit}>
        <UlList $Margin="16px auto">
          {/* ЭТАЖ 1: Название */}
          <List $Block>
            <TitleInput
              type="text"
              placeholder="Введите название лабораторной работы"
              value={labTitle}
              onChange={(e) => setLabTitle(e.target.value)}
            />
          </List>

          {/* ЭТАЖ 2: Описание + Группа + Предмет */}
          <TwoColumnRow>
            <List>
              <div className="editing__block-Two">
                <TitleBlock>Описание лабораторной</TitleBlock>
                <p className="editing__block-text">Введите описание</p>
                <textarea
                  className="editing__block-input"
                  onChange={(e) => {
                    setLabDescription(e.target.value);
                    autoResizeTextarea(e);
                  }}
                  placeholder="Введите текст"
                  value={labDescription}
                />
              </div>
            </List>
            <List $Back>
              <div className="editing__block-Two" style={{ width: "100%" }}>
                <div className="selects-row">
                  <div>
                    <TitleBlock>Группа</TitleBlock>
                    <p className="editing__block-text">Выберите группу</p>
                    <FormSelect
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                    >
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
                    <FormSelect
                      value={subjectId}
                      onChange={(e) => setSubjectId(e.target.value)}
                    >
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

          {/* ЭТАЖ 3: Тесты */}
          <BigBlock $BigFon $BigHeight $GapForm>
            <div className="block__one">
              <TitleBlock $Padding>Список тестов:</TitleBlock>
              <UlMinBlock>
                {tests.map((test, idx) => (
                  <MinBlock key={test.id}>
                    <TitleBlock $FontSize $FontWeight $Margin>
                      Тест {idx + 1}
                    </TitleBlock>
                    <div className="editing__block-name">
                      <TitleBlock $FontSize $FontWeight $Margin>
                        Входные данные:
                      </TitleBlock>
                      <input type="text" className="some-input" value={test.inp} readOnly />
                    </div>
                    <div className="editing__block-name">
                      <TitleBlock $FontSize $FontWeight $Margin>
                        Вывод:
                      </TitleBlock>
                      <input type="text" className="some-input" value={test.out} readOnly />
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

          {/* ЭТАЖ 4: Импорт тестов */}
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

          {/* ЭТАЖ 5: Ограничения */}
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

          {/* ЭТАЖ 6: Кнопка */}
          <div className="block__button">
            <button className="block__end" type="submit">
              <span className="block__end-link">Завершить редактирование и добавить лабораторную</span>
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

export default LaboratoryAdd;