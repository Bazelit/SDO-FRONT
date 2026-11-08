import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { getStudentById } from '../../api/user-api';
import { getSubjects } from '../../api/subjects-api';
import { getAllStudentsLab } from "../../api/teacher-api";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SectionLab = styled.div`
  width: 100%;
  background-color: #fff;
  font-family: "Montserrat", sans-serif;
  display: flex;
  gap: 100px;
  justify-content: center;
  padding: 50px 20px;
  min-height: 100vh;

  @media (max-width: 1100px) {
    gap: 40px;
  }

  /* планшеты и телефоны: колонки друг под другом */
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding: 32px 16px 48px;
    min-height: 0;
  }

  @media (max-width: 480px) {
    gap: 24px;
    padding: 24px 12px 40px;
  }
`;

const List = styled.div`
  width: 350px;
  max-width: 100%;
  padding: 20px;
  background-color: #BECBEE;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    width: 100%;
    padding: 16px;
  }
`;

const ListSubject = styled.div`
  width: 500px;
  max-width: 100%;
  min-height: 60px;
  padding: 12px 25px;
  background-color: ${props => props.$isCompleted ? "#4CAF50" : "#fff"};
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 900px) {
    width: 100%;
    min-height: 48px;
    padding: 10px 16px;
  }
`;

const BigList = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #E6F4CF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  @media (max-width: 900px) {
    padding: 24px 16px;
    gap: 16px;
  }
`;

const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin: 0; 
  text-align: center;
  color: #000;
`;

const TextDiscipline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  margin: 0;
  text-align: center;
  color: #000;
`;

const InfoText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #000;
`;

const RowBlocks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  min-width: 0;

  @media (max-width: 900px) {
    width: 100%;
    max-width: 600px;
    gap: 16px;
  }
`;

export default function StudentPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [studentInfo, setStudentInfo] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        group: "",
        form_education: ""
    });

    const [subjectsInfo, setSubjectsInfo] = useState([]);
    const [labs, setLabs] = useState([]);
    const [error, setError] = useState("");

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        getStudentById(id)
            .then(res => {
                setStudentInfo(res.data);
            })
            .catch(error => {
                console.error("Ошибка при получении студента:", error.message);
            });

        getSubjects()
            .then(res => {
                setSubjectsInfo(res.data);
            })
            .catch(error => {
                console.error(error.message);
            });

        // Загрузка списка лаб
        const fetchLabs = async () => {
            getAllStudentsLab(id)
                .then(res => {
                    setLabs(res.data);
                })
                .catch(error => {
                    console.error("Ошибка при получении лабораторных работ:", error.message);
                    setError("Не удалось загрузить список лабораторных работ");
                });
        };
        if (id) {
            fetchLabs();
        }
    }, [id, token]);

    const handleLabClick = (labId, labName) => {
        localStorage.setItem("labId", labId);
        localStorage.setItem("labName", labName);
        navigate(`/lab/${labId}`);
    };

    return (
        <SectionLab>
            <RowBlocks>
                <List>
                    <Text>ФИО студента:</Text>
                    <InfoText>
                        {studentInfo.last_name} {studentInfo.first_name} {studentInfo.middle_name}
                    </InfoText>
                </List>
                <List>
                    <Text>Номер группы:</Text>
                    <InfoText>{studentInfo.study_group || "-"}</InfoText>
                </List>
                <List>
                    <Text>Форма обучения:</Text>
                    <InfoText>{studentInfo.form_education || "-"}</InfoText>
                </List>
                <List>
                    <Text>Направление обучения:</Text>
                    <InfoText>{studentInfo.faculty || "-"}</InfoText>
                </List>
            </RowBlocks>
            <RowBlocks>
                <BigList>
                    <Text>Список лабораторных работ студента:</Text>
                    {labs.map(([labId, labName, isCompleted]) => (
                        <ListSubject style={{ color: "black" }}
                            key={labId}
                            $isCompleted={isCompleted}
                            onClick = {() => navigate(`/seeresultstudent/${labId}/${id}`)}
                        >
                            <TextDiscipline>{labName}</TextDiscipline>
                        </ListSubject>
                    ))}
                    {error && <Text style={{ color: "red" }}>{error}</Text>}
                </BigList>
            </RowBlocks>
        </SectionLab>
    );
}