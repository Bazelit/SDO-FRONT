import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";

export const container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  color: black;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`

export const Description = styled.div`
  width: 100%;
  max-width: 1253px;
  background-color: #DDE5F8;
  padding: 32px 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
  @media (max-width: 480px) {
    padding: 16px;
  }
`

export const DescriptionText = styled.p`
font-family: Montserrat;
font-weight: 500;
 font-size: 20px;

  @media (max-width: 768px) {
    font-size: 17px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
  }
`

export const DescriptionTextBold = styled.p`
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 17px;
    margin-bottom: 4px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
  }
`

export const DescriptionTest = styled.div`
  margin-top: 21px;

`

export const StudentList = styled.div`
   width: 100%;
   max-width: 1252px;
`
export const StudentListUp = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
`

export const StudentListH1 = styled.h1`
   font-family: Montserrat;
  font-weight: 500;
  font-style: Medium;
  font-size: 20px;
  leading-trim: NONE;
  line-height: 27px;
  letter-spacing: 0%;
  margin-left: 32px;

  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 18px;
  }
`

export const SearchInputContainer = styled.div`
  position: relative;
  flex: 0 1 395px;
  min-width: 240px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    min-width: 0;
  }
`
export const SearchInput = styled.input`
  padding: 0 40px;
  width: 100%;
  font-family: "Montserrat";
  height: 47px;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  color: #000;
  text-align: center;
  &:focus {
    outline: none;
  }
`

export const Sort = styled.div`
  margin-left: auto;
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 900px) {
    margin-left: 0;
    flex: 1 1 100%;
    gap: 12px;

    select {
      flex: 1 1 0;
      min-width: 0;
    }
  }
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;

    select {
      flex: 0 0 auto;
      width: 100%;
    }
  }
`

export const Select = styled.select`
width: 231px;
    text-overflow: ellipsis;
    font-family: "Montserrat";
    cursor: pointer;
    height: 47px;
    border: none;
    background-color: #f0f0f0;
    padding: 0 10px;
    font-size: 16px;
    color: #000;
    text-align: center;
    border-radius: 8px;
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
`
export const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 15px;
  font-family: "Montserrat";
  top: 50%;
  transform: translateY(-50%);
  color: #000;
  cursor: pointer;
  pointer-events: none;
`

export const StudentsLab = styled.div`
  width: 100%;
  background: ${(props) => props.$color};
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-right: 10px;
  margin-top: 16px;
  position: relative;

  /* имя сверху, кнопки — строкой ниже */
  @media (max-width: 1200px) {
    flex-wrap: wrap;
    padding: 12px 16px;
    gap: 10px;
  }
  @media (max-width: 480px) {
    padding: 12px;
  }
`

export const StudentsLabText = styled.h1`
font-family: Montserrat;
font-weight: 500;
font-size: 20px;
line-height: 27px;
letter-spacing: 0%;
margin-left: 27px;
flex: 1 1 auto;
min-width: 0;

  @media (max-width: 1200px) {
    margin: 0;
    flex-basis: 100%;
  }
  @media (max-width: 480px) {
    font-size: 17px;
    line-height: 24px;
  }
`

export const StudentsLabtn = styled.button`
  background-color: #D9D9D9;
  border-radius: 4px;
  border: none;
  outline: none;
  padding-top: 5px;
  padding-right: 12px;
  padding-bottom: 5px;
  padding-left: 12px;
  opacity: 1;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0%;
  text-align: center;
  cursor: pointer;

  @media (max-width: 600px) {
    flex: 1 1 100%;
  }
`

export const StudentLabResult = styled.div`
  background-color: #D9D9D9;
  color: ${(props) => props.$color};
  font-family: Montserrat;
  font-weight: 600;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  padding-top: 5px;
  padding-right: 12px;
  padding-bottom: 5px;
  padding-left: 12px;
  border-radius: 4px;
`

export const StudentLabDowland = styled.button`
position:relative;
width:39px;
height:39px;
flex-shrink: 0;
display: flex;
align-items: center;
justify-content: center;
border-radius: 4px;
opacity: 1;
border: none;
outline: none;
padding: 0;
background-color: #D9D9D9;
cursor:pointer;
`

export const StudentLabChange = styled.div`
  width: 260px;
  max-width: 100%;
  min-height: 39px;
  padding: 0 8px;
  border-radius: 4px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
  text-align: center;
  background-color: #BECBEE;
  cursor: pointer;

  /* вложенный блок «Оценка изменена» не должен раздувать родителя */
  & & {
    width: auto;
    background: none;
    padding: 0;
  }

  @media (max-width: 600px) {
    flex: 1 1 200px;
    width: auto;
    font-size: 16px;
  }
`

export const BtnSave = styled.button`
  min-height: 39px;
  padding: 0 16px;
  opacity: 1;
  border-radius: 4px;
  border: none;
  background-color: #D9D9D9;
  font-family: Montserrat;
  font-weight: 400;
  font-style: Regular;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 600px) {
    flex: 1 1 auto;
  }
`


export const StudentLabAction = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: auto;
  gap: 10px;

  @media (max-width: 1200px) {
    margin-left: 0;
    width: 100%;
    gap: 8px;
  }
`

export const StudentLabNo = styled.div`
  display: flex;
  margin-left: auto;

  @media (max-width: 1200px) {
    margin-left: 0;
  }
  `

export const ScoreEditBox = styled.div`
  input{
    width: 35px;
    margin-left: 10px;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
    }
`

export const ScoreError = styled.div`
  color: #c62828;
  font-size: 12px;
  line-height: 1.2;
  margin-top: 4px;
`

export const Notification = styled.div`
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

export const ErrorNotification = styled.div`
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

export const LimitBlock = styled.div`
    background-color:#F0F0F0;
    margin-top: 20px;
    padding: 32px 32px;
    border-radius: 4px;
    width: 100%;
    max-width: 1253px;

    @media (max-width: 768px) {
        padding: 20px;
    }
    @media (max-width: 480px) {
        padding: 16px;
    }
`

export const LimitBlockName = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 24px;

    @media (max-width: 768px) {
        font-size: 20px;
        margin-top: 0;
    }
`
export const LimitBlockLi = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    position: relative;

    @media (max-width: 768px) {
        h1 {
            font-size: 16px;
            margin: 8px 0;
        }
    }
`
export const LimitBlockText = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 18px;
    min-width: 0;
`

export const LimitBlockTextZ = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 18px;
    text-align: right;
    flex-shrink: 0;
`
