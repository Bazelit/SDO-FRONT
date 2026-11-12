import styled from "styled-components";

export const Page = styled.section`
  width: calc(100% - 48px);
  max-width: 1248px;
  margin: 0 auto;
  padding: 28px 0 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: "Montserrat", sans-serif;
  color: var(--text, #000);
  @media (max-width: 600px) { padding: 12px 0 32px; }
`;

export const PageTitle = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

export const GroupList = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 18px;
  list-style: none;
  margin: 0;
  padding: 0;
  li { min-width: 0; }
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 1fr;
    gap: 12px;
  }
`;

export const StudentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
  @media (max-width: 600px) { gap: 24px; }
`;
