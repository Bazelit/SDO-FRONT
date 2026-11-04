import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { getTasks } from "../../api/tasks-api";

const SectionLab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 25px 0px 20px;
  box-sizing: border-box;
  width: 100%;

  .section__lab-blockSearch {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    max-width: 1270px;
    padding: 0;
    box-sizing: border-box;
  }

  .section__lab-btn {
    flex: 1;
    min-width: 0;
    padding: 10px;
    font-size: 16px;
    text-align: center;
    color: #000;
    font-family: Montserrat;
    line-height: 27px;
    text-decoration: none;
    background: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: border-box;
    white-space: nowrap;
    transition: all 0.3s ease;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .section__lab-btn:hover {
    background: #d9d9d9;
    transition: 0.3s;
  }

  .section__lab-btn.active {
    background: #becbee;
    color: #fff;
  }

  @media (max-width: 1300px) {
    .section__lab-blockSearch {
      padding: 0 20px;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 0px 16px;
    gap: 12px;

    .section__lab-blockSearch {
      padding: 0 16px;
      gap: 8px;
    }

    .section__lab-btn {
      font-size: 14px;
      padding: 8px;
    }
  }

  @media (max-width: 570px) {
    padding: 16px 0px 12px;
    gap: 10px;

    .section__lab-blockSearch {
      flex-direction: column;
      align-items: stretch;
      padding: 0 12px;
    }

    .section__lab-btn {
      width: 100%;
      max-width: 100%;
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    padding: 12px 0px 10px;
    gap: 8px;

    .section__lab-blockSearch {
      padding: 0 10px;
      gap: 6px;
    }

    .section__lab-btn {
      font-size: 12px;
      padding: 8px 6px;
    }
  }
`;

const SubjectSelectWrapper = styled.div`
  width: 100%;
  max-width: 1270px;
  padding: 0;
  box-sizing: border-box;

  @media (max-width: 1300px) {
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  @media (max-width: 570px) {
    padding: 0 12px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const SubjectSelect = styled.select`
  width: 100%;
  height: 47px;
  font-family: "Montserrat";
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  padding: 0 40px 0 15px;
  font-size: 16px;
  color: #000;
  cursor: pointer;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;

  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    height: 42px;
  }
`;

const NameLab = styled.p`
  color: #000;
  font-family: "Montserrat";
  font-size: 19px;
  margin: 0;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-width: 0;

  @media (max-width: 768px) {
    font-size: 17px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const ListLab = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 1270px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    gap: 12px;
  }

  @media (max-width: 570px) {
    padding: 0 12px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
    gap: 10px;
  }
`;

const LabItem = styled.li`
  width: 100%;
  padding: 40px;
  font-size: 18px;
  font-family: Montserrat;
  background: ${(props) => {
    if (props.$status === "success" || props.$status === "passed") return "#E6F4CF";
    if (props.$status === "failed") return "#FFC7C7";      
    return "#f0f0f0";                                       
  }};
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  gap: 15px;

  @media (max-width: 768px) {
    padding: 24px 20px;
    font-size: 16px;
    gap: 12px;
  }

  @media (max-width: 570px) {
    flex-direction: column;
    align-items: stretch;
    padding: 20px 16px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
    font-size: 15px;
    gap: 10px;
    border-radius: 6px;
  }
`;

const TaskButton = styled.button`
  width: 161px;
  height: 39px;
  background-color: #becbee;
  font-size: 14px;
  font-family: "Montserrat";
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
  box-sizing: border-box;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: #d9d9d9;
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 36px;
    font-size: 13px;
  }

  @media (max-width: 570px) {
    width: 100%;
    height: 38px;
  }

  @media (max-width: 480px) {
    height: 34px;
    font-size: 12px;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 335px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 335px;
  }

  @media (max-width: 570px) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 47px;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  font-family: "Montserrat";
  color: #000;
  text-align: center;
  padding: 0 40px 0 20px;

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #000;
`;

const StudLaboratory = () => {
  const [labItems, setLabItems] = useState({ isLoading: true, data: [] });
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await getTasks();
        // Новый формат: [{id, name, completed, subject_id, subject_name}, ...]
        setLabItems({ isLoading: false, data: response.data });
      } catch (error) {
        console.error("Failed to fetch labs:", error);
        setLabItems({ isLoading: false, data: [] });
      }
    };

    fetchLabs();
  }, []);

  const uniqueSubjects = useMemo(() => {
    const map = new Map();
    labItems.data.forEach((lab) => {
      if (lab.subject_id && !map.has(lab.subject_id)) {
        map.set(lab.subject_id, {
          id: lab.subject_id,
          name: lab.subject_name,
        });
      }
    });
    return Array.from(map.values());
  }, [labItems.data]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleLabClick = (id) => {
    navigate(`/labaStud/${id}`);
  };

  const filteredLabs = labItems.data
    .filter((lab) =>
      (lab.title || lab.name || "")
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
    )
    .filter((lab) => {
      if (filter === "completed") return lab.completed;
      if (filter === "notCompleted") return !lab.completed;
      return true;
    })
    .filter((lab) => {
      if (!selectedSubject) return true;
      return Number(lab.subject_id) === Number(selectedSubject);
    });

  return (
    <SectionLab>
      <div className="section__lab-blockSearch">
        <SearchInputContainer>
          <SearchInput
            type="text"
            placeholder="Поиск лабораторной..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <SearchIcon />
        </SearchInputContainer>
        <button
          className={`section__lab-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => handleFilterChange("all")}
        >
          Все лабораторные
        </button>
        <button
          className={`section__lab-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => handleFilterChange("completed")}
        >
          Выполнено
        </button>
        <button
          className={`section__lab-btn ${filter === "notCompleted" ? "active" : ""}`}
          onClick={() => handleFilterChange("notCompleted")}
        >
          Не выполнено
        </button>
      </div>

      <SubjectSelectWrapper>
        <SubjectSelect
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Все предметы</option>
          {uniqueSubjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </SubjectSelect>
      </SubjectSelectWrapper>

      <ListLab>
        {labItems.isLoading ? (
          <p>Загрузка...</p>
        ) : filteredLabs.length === 0 ? (
          <p>Лабораторные не найдены</p>
        ) : (
          filteredLabs.map((lab) => (
            <LabItem
              key={lab.id}
              $status={
                lab.completed === false ||
                !["success", "passed"].includes(
                  String(lab.status ?? "").trim().toLowerCase(),
                )
                  ? "failed"
                  : String(lab.status || "").toLowerCase()
              }
            >
              <NameLab>{lab.name}</NameLab>
              <TaskButton onClick={() => handleLabClick(lab.id)}>
                Перейти
              </TaskButton>
            </LabItem>
          ))
        )}
      </ListLab>
    </SectionLab>
  );
};

export default StudLaboratory;