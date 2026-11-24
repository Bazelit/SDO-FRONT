import * as S from './CheckLabTeacher.styles'
import { useParams } from 'react-router-dom';
import { getTaskById, getStudentResultLabId } from '../../api/file-api';
import React, { useState, useEffect } from 'react';
import { getGroups } from '../../api/teacher-api';
import StudentLab from './components/StudentLab';


const CheckLabTeacher = () => {
    const [searchValue, setSearchValue] = useState("");
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('')
    const [selectedSort, setSelectedSort] = useState('')
    const [studentsData, setStudentData] = useState([])
    const [task, setTask] = useState('')

    const { task_id } = useParams();
    useEffect(() => {
        console.log('Загрузка задачи с ID:', task_id);
        getTaskById(task_id)
          .then((res) => {
            setTask(res.data);
          })
          .catch((error) => {
            console.error('Ошибка загрузки задачи:', error.message);
          });
        getStudentResultLabId(task_id)
        .then((res)=>{
            setStudentData(res.data)
        }).catch(error => 
            console.error('Ошибка загрузки задачи:', error.message)
        )
      }, [task_id]);

    
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

  const handleSelectGroup = (e) => {
    setSelectedGroup(e.target.value); 
  };
  const handleSelectSort = (e) => {
    setSelectedSort(e.target.value); 
  };

  const handleSearch = () => {
    console.log("Поиск запущен!");
  };

    const fetchGroups = async () => {
        try{
            const response = await getGroups()
            setGroups(response.data)
        }catch(error){
            console.error("Ошибка при загрузке групп:", error.message);
            setGroups([]);
        }}
        
    useEffect(()=>{
        fetchGroups()
    }, [])



    const sorts = [
            { id: '1', name: 'По фамилии (А-Я)' },
            { id: '2', name: 'По убыванию оценки' },
            { id: '3', name: 'По возрастанию оценки' },
        ]

    const displayedStudents = studentsData
        .filter((student) => searchValue === '' || student.fullName.toLowerCase().includes(searchValue.toLowerCase()))
        .filter((student) => selectedGroup === '' || student.group === selectedGroup)
        .slice()
        .sort((a, b) => {
            const groupOrder = (a.group || '').localeCompare(b.group || '', 'ru');
            if (groupOrder !== 0) {
                return groupOrder;
            }
            if (selectedSort === "По фамилии (А-Я)") {
                return a.fullName.localeCompare(b.fullName, 'ru');
            }
            if (selectedSort === "По убыванию оценки") {
                return b.score - a.score;
            }
            if (selectedSort === "По возрастанию оценки") {
                return a.score - b.score;
            }
            return 0;
        });

    const groupedStudents = displayedStudents.reduce((result, student) => {
        const groupName = student.group || '';
        const currentGroup = result[result.length - 1];
        if (!currentGroup || currentGroup.name !== groupName) {
            result.push({ name: groupName, students: [student] });
        } else {
            currentGroup.students.push(student);
        }
        return result;
    }, []);

    return (
        <S.container>
            <S.TaskTitle>{task?.name}</S.TaskTitle>
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
            <S.StudentList>
                <S.StudentListH1>Список студентов:</S.StudentListH1>
                <S.StudentListUp>
                <S.SearchInputContainer>
                    <S.SearchInput
                    type="text"
                    placeholder="Поиск студента"
                    value={searchValue}
                    onChange={handleSearchChange}
                    />
                    <S.SearchIcon onClick={() => handleSearch()} />
                </S.SearchInputContainer>
                <S.Sort>
                <S.Select value={selectedSort} onChange={handleSelectSort}>
                    <option value="">Сортировать по...</option>
                    {(
                    sorts.map((sort) => (
                        <option key={sort.id} value={sort.name}>
                        {sort.name}
                        </option>
                    ))
                    )}
                </S.Select>

                <S.Select value={selectedGroup} onChange={handleSelectGroup}>
                    <option value="">Группа</option>
                    {groups.map((group) => (
                    <option key={group.id} value={group.name}>
                        {group.name}
                    </option>
                    ))}
                </S.Select>
                </S.Sort>
                </S.StudentListUp>
                {groupedStudents.map(({ name, students }) => (
                    <React.Fragment key={name || 'ungrouped'}>
                        {name && <S.GroupTitle>{name}</S.GroupTitle>}
                        {students.map((student) => (
                            <StudentLab
                                key={student.id}
                                name={student.fullName}
                                isSubmitted={student.isSubmitted}
                                score={student.score ?? 0}
                                task_id={task_id}
                                stud_id={student.id}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </S.StudentList>
        </S.container>
    )
}

export default CheckLabTeacher