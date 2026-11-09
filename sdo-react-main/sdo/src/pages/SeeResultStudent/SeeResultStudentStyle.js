import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1340px;
    margin: 0 auto;
    padding: 0 20px 40px;

    @media (max-width: 768px) {
        padding: 0 16px 32px;
    }
    @media (max-width: 480px) {
        padding: 0 12px 24px;
    }
`

export const Description = styled.div`
  background-color: #DDE5F8;
  padding: 32px 32px;
  margin-top: 40px;
  border-radius:4px;

  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 24px;
  }
  @media (max-width: 480px) {
    padding: 16px;
    margin-top: 16px;
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


export const SolutionBlock = styled.div`
    min-height: 50px;
    background-color: ${(props) => props.$color};
    align-items: center;
    border-radius:4px;
    padding: 0 32px;

    @media (max-width: 768px) {
        padding: 0 16px;
    }
    @media (max-width: 480px) {
        padding: 0 12px;
    }
`
export const SolutionInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 50px;
    position: relative;
`

export const SolutionBlockText = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0%;
    margin: 0;

    @media (max-width: 480px) {
        font-size: 17px;
    }
`

export const DetailsBtn = styled.button`
    width: 181px;
    height: 30px;
    flex-shrink: 0;
    background-color: #BECBEE;
    color: white;
    font-family: Montserrat;
    font-weight: 500;
    font-size: 16px;
    line-height: 27px;
    letter-spacing: 0%;
    text-align: center;
    border-radius:4px;
    border:none;
    cursor: pointer;

    @media (max-width: 480px) {
        width: auto;
        height: 36px;
        padding: 0 14px;
    }
`
export const SolutionDetails = styled.div`
    margin-left: 30px;
    margin-top: 10px;
    padding-bottom: 20px;

    @media (max-width: 768px) {
        margin-left: 0;
        padding-bottom: 16px;
    }
`
export const SolutionDetailsCode = styled.div`
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    background-color: #F0F0F0;
    width: 100%;
    max-width: 1195px;
    font-size: 20px;
    padding: 6px;
    overflow-x: auto;

    @media (max-width: 768px) {
        font-size: 15px;
        padding: 10px;
    }
    @media (max-width: 480px) {
        font-size: 13px;
    }
    `

export const SolutionDetailsResult = styled.div`

`
export const SolutionDetailsResultText = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0%;
    min-width: 0;

    @media (max-width: 768px) {
        font-size: 17px;
        margin: 10px 0 4px;
    }
`

/* Заголовок слева, значение справа; на телефоне — значение под заголовком */
export const SolutionDetailsBlock = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
    align-items: baseline;
    column-gap: 16px;
    border: 1px solid black;
    width: 100%;
    max-width: 1195px;
    border-radius: 4px;
    padding: 0 5px;
    position: relative;
    margin-top: 10px;
    min-width: 0;

    span{
        grid-column: 1 / -1;
        width: 100%;
        height: 1px;
        margin: 5px auto;
        background-color: black;
    }

    @media (max-width: 600px) {
        grid-template-columns: minmax(0, 1fr);
        padding: 0 10px 10px;
    }
`
export const SolutionDetailsResultInfo = styled.div`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0%;
    padding-right: 35px;
    text-align: right;
    overflow-wrap: anywhere;

    @media (max-width: 768px) {
        font-size: 16px;
        padding-right: 10px;
    }
    @media (max-width: 600px) {
        text-align: left;
        padding-right: 0;
    }
`

export const ThrowAttemps = styled.button`
    width: 100%;
    min-height: 40px;
    border-radius: 8px;
    opacity: 1;
    background-color: #dfe8d1;
    font-family: Montserrat;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0%;
    text-align: center;
    border: none;
    cursor: pointer;
    margin-bottom: 10px;

    @media (max-width: 480px) {
        font-size: 16px;
        min-height: 44px;
    }
`

export const StudentInfo = styled.h1`
font-family: Montserrat;
font-weight: 600;
font-size: 20px;
leading-trim: NONE;
line-height: 27px;
letter-spacing: 0%;
vertical-align: middle;
margin-left: 32px;
min-width: 0;

    @media (max-width: 768px) {
        margin-left: 0;
        font-size: 18px;
    }
`

export const TaskStudentAttemps = styled.div`
    background-color:#F0F0F0;
    border-radius: 4px;
    padding: 10px 32px;

    @media (max-width: 768px) {
        padding: 10px 16px;
    }
`
export const TaskStudentAttempsName = styled.h1`
    font-family: Montserrat;
    font-weight: 600;
    font-size: 20px;
    leading-trim: NONE;
    line-height: 27px;
    letter-spacing: 0%;
    vertical-align: middle;

    @media (max-width: 768px) {
        font-size: 18px;
    }
`

export const Attemps = styled.h2`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;

    span{
    font-weight: 600;
    font-size: 18px;
    flex-shrink: 0;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        span { font-size: 16px; }
    }
`

export const LimitBlock = styled.div`
    background-color:#F0F0F0;
    margin-top: 20px;
    padding: 32px 32px;
    border-radius: 4px;

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

export const AttempsLine = styled.div`
    width: 100%;
    height: 10px;
    background-color: #D1D5DB;
`

export const AttempsLineProgres = styled.div`
background-color: #bccef7;
         width: ${(props) => props.$width}%;
         max-width: 100%;
         height: 100%
`

export const SolutionsBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    gap: 20px;

    span{
    font-family: Montserrat;
    font-weight: 500;
    font-size: 18px;
    margin: 0 auto;
    }

    @media (max-width: 768px) {
        gap: 12px;
    }
`

export const SolutionDetailTestBtn = styled.div`
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    padding-right: 35px;
    cursor: pointer;

    @media (max-width: 600px) {
        padding-right: 0;
    }
`

export const SolutionDetailTestBtnText = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px;
`
export const SolutionDetailTestBtnTextBtn = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px;
    flex-shrink: 0;
`


export const SolutionBlockCode = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 10px;

    @media (max-width: 480px) {
        gap: 8px;
    }
`

export const SolutionBlockCodeBtn = styled.button`
   width: 181px;
    height: 30px;
    background-color: #BECBEE;
    color: white;
    font-family: Montserrat;
    font-weight: 500;
    font-size: 16px;
    line-height: 27px;
    letter-spacing: 0%;
    text-align: center;
    border-radius:4px;
    border:none;
    cursor: pointer;

    @media (max-width: 480px) {
        flex: 1 1 0;
        width: auto;
        height: 38px;
    }
`
export const Filter = styled.select`
    width: 231px;
    font-family: "Montserrat";
    cursor: pointer;
    height: 30px;
    border: none;
    background-color: #f0f0f0;
    padding: 0 10px;
    font-size: 16px;
    color: #000;
    text-align: center;
    border-radius: 8px;
    margin-right: 30px;
    flex-shrink: 0;
    &:focus {
      outline: none;
    }

    @media (max-width: 768px) {
        margin-right: 0;
        height: 40px;
    }
    @media (max-width: 600px) {
        width: 100%;
        margin-bottom: 16px;
    }

`

export const Info = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    column-gap: 16px;
    position: relative;
`
