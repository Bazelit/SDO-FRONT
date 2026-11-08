// Общие стили формы лабораторной работы.
// Используются страницами LaboratoryAdd (создание) и PrepodRedLab (редактирование).
// На десктопе (>1300px) выглядят как прежде; ниже — резиновая вёрстка.
import styled from "styled-components";

export const Section = styled.form`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

export const BigBlock = styled.div`
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
    flex: 0 1 540px;
    min-width: 0;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    position: relative;
    right: 2%;
  }

  .block__one {
    flex: 0 1 700px;
    min-width: 0;
    margin-top: 5px;
    position: relative;
    top: 4%;
    overflow-y: auto;
    max-height: 480px;
  }

  @media (max-width: 1100px) {
    gap: 32px;
    padding-right: 20px;

    .block__test {
      right: 0;
    }
  }

  /* планшет/телефон: список тестов и форма добавления друг под другом */
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 8px;
    min-height: 0;
    max-height: none;
    padding: 16px;

    .block__one,
    .block__test {
      flex: 1 1 auto;
      width: 100%;
      top: 0;
      right: 0;
      margin-top: 0;
    }

    .block__one {
      max-height: 420px;
    }
  }
`;

export const MinBlock = styled.li`
  width: 100%;
  max-width: 592px;
  min-height: 102px;
  height: auto;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px 36px 10px 10px;
  list-style-type: none;
  position: relative;
  .icon {
    position: absolute;
    top: 2px;
    right: 4px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  @media (max-width: 900px) {
    max-width: none;
  }
`;

export const UlMinBlock = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 5px 10px 0 0;
  margin: 0 0 10px 0;
  list-style: none;

  @media (max-width: 900px) {
    gap: 12px;
    padding: 0;
  }
`;

export const UlList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 25px;
  padding: 0;
  margin: ${({ $Margin }) => $Margin || "16px auto"};
  width: 100%;
  max-width: 1248px;

  .editing__block-Two {
    width: 100%;
    padding: 0px 30px 30px 20px;
  }
  .editing__block-text {
    color: #000;
    font-family: "Montserrat";
    font-size: 16px;
  }
  .editing__block-input {
    width: 100%;
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
    padding: 10px 15px;
  }
  .editing__block-name {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 8px;
  }
  .some-input {
    flex: 1 1 140px;
    min-width: 0;
    border: none;
    border-bottom: 1px solid #000;
    background-color: transparent;
    color: inherit;
    outline: none;
    margin-left: 5px;
    font-family: "Montserrat";
  }
  .selects-row {
    display: flex;
    gap: 16px;
    width: 100%;

    > * {
      flex: 1;
      min-width: 0;
    }
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
    width: 100%;
    min-height: 117px;
    padding: 16px;
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
    text-align: center;
    width: 100%;
  }

  @media (max-width: 768px) {
    gap: 16px;

    .editing__block-Two {
      padding: 0 4px 20px;
    }
    .block__end {
      min-height: 72px;
    }
  }

  @media (max-width: 480px) {
    gap: 12px;

    .selects-row {
      flex-direction: column;
      gap: 0;
    }
  }
`;

export const List = styled.li`
  width: 100%;
  min-height: ${({ $Block }) => ($Block ? "120px" : "260px")};
  background-color: ${({ $Back }) => ($Back ? "#E2EDD0" : "#D5DEF6")};
  border-radius: 7px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  list-style-type: none;
  padding: 0 16px;

  @media (max-width: 768px) {
    min-height: ${({ $Block }) => ($Block ? "88px" : "0")};
    padding: ${({ $Block }) => ($Block ? "0 12px" : "4px 12px 0")};
  }
`;

export const TitleInput = styled.input`
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

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 14px;
  }
`;

export const TestsIOBlock = styled.div`
  width: 100%;
  background-color: #d5def6;
  border-radius: 10px;
  min-height: 450px;
  padding-bottom: 20px;
  .tests-input-title {
    font-size: 19px;
    font-family: "Montserrat";
    font-weight: 500;
    margin: 16px 20px 15px;
    padding-top: 1px;
  }
  .tests-input {
    margin: 0 20px 15px;
  }
  .hint {
    font-size: 14px;
    font-family: "Montserrat";
    color: #555;
    margin: 5px 0;
    overflow-wrap: anywhere;
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
    width: 100%;
    height: 150px;
    border-radius: 7px;
    border: none;
    padding: 10px;
    font-family: "Montserrat";
    font-size: 14px;
    outline: none;
    resize: vertical;
  }

  @media (max-width: 768px) {
    min-height: 0;
    padding-bottom: 16px;

    .tests-input-title {
      font-size: 17px;
      margin: 14px 14px 10px;
    }
    .tests-input {
      margin: 0 14px 12px;
    }
  }
`;

export const RestrictionsBlock = styled.div`
  width: 100%;
  background-color: #e2edd0;
  border-radius: 10px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 600px) {
    padding: 14px;
    gap: 12px;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const RestrictionRoom = styled.div`
  min-width: 0;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  .room-title {
    font-size: 16px;
    font-family: "Montserrat";
    font-weight: 500;
    margin: 0;
  }
  .room-input {
    width: 100%;
    min-width: 0;
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

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

export const TitleBlock = styled.h3`
  color: #000;
  font-family: "Montserrat";
  font-size: ${({ $FontSize }) => ($FontSize ? "16px" : "19px")};
  font-weight: ${({ $FontWeight }) => ($FontWeight ? "400" : "500")};
  line-height: ${({ $LineHeight }) => ($LineHeight ? "45px" : "27px")};
  padding-left: ${({ $Padding }) => ($Padding ? "45px" : "0px")};
  margin: ${({ $Margin }) => ($Margin ? "0px" : "none")};

  @media (max-width: 900px) {
    padding-left: 0;
  }
  @media (max-width: 768px) {
    font-size: ${({ $FontSize }) => ($FontSize ? "15px" : "17px")};
  }
`;

export const ButtonAdd = styled.button`
  font-family: "Montserrat";
  width: ${({ $ButtonAddW }) => ($ButtonAddW ? "400px" : "274px")};
  max-width: calc(100% - 20px);
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

  @media (max-width: 900px) {
    margin-top: 12px;
  }
  @media (max-width: 768px) {
    height: 44px;
    margin-left: ${({ $ButtonAddW }) => ($ButtonAddW ? "0" : "14px")};
    max-width: ${({ $ButtonAddW }) => ($ButtonAddW ? "100%" : "calc(100% - 28px)")};
  }
  @media (max-width: 600px) {
    width: ${({ $ButtonAddW }) => ($ButtonAddW ? "100%" : "calc(100% - 28px)")};
  }
`;

export const FormSelect = styled.select`
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
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;
  text-overflow: ellipsis;
  &:focus {
    outline: none;
  }
`;

export const Notification = styled.div`
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
  z-index: 1001;
`;

export const TwoColumnRow = styled.div`
  display: flex;
  gap: 25px;
  width: 100%;
  > * {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 16px;

    > * {
      flex: none;
    }
  }
  @media (max-width: 768px) {
    gap: 12px;
  }
`;
