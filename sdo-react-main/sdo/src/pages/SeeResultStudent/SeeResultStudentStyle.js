import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1340px;
    margin: 0 auto;
`

export const Description = styled.div`
  background-color: #DDE5F8;
  padding: 32px 32px;
  margin-top: 40px;
  border-radius:4px;
`

export const DescriptionText = styled.p`
font-family: Montserrat;
font-weight: 500;
 font-size: 20px;
`

export const DescriptionTextBold = styled.p`
  font-size: 20px;
  font-weight: bold
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
`
export const SolutionInfo = styled.div`
    display: flex;
    position: relative;
`

export const SolutionBlockText = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0%;
    position: absolute;
    top: 0px
`

export const DetailsBtn = styled.button`
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
    position:absolute;
    right: 0;
    top: 10px;
`
export const SolutionDetails = styled.div`
    margin-left: 30px;
    margin-top: 70px;
    padding-bottom: 20px;
`
export const SolutionDetailsCode = styled.div`
    white-space: pre-wrap;
    background-color: #F0F0F0;
    width: 1195px;
    font-size: 20px;
    padding: 6px
    `

export const SolutionDetailsResult = styled.div`

`
export const SolutionDetailsResultText = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0%;
`

export const SolutionDetailsBlock = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width: 1195px;
    border-radius: 4px;
    padding: 0 5px;
    position: relative;
    margin-top: 10px;
    min-width: 0;

    span{
        width: 100%;
        height: 1px;
        margin: 5px auto;
        background-color: black;
    }
`
export const SolutionDetailsResultInfo = styled.div`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0%;
    position: absolute;
    top: 15px;
    right: 40px;
`

export const ThrowAttemps = styled.button`
    width: 100%;
    height: 40px;
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
`

export const TaskStudentAttemps = styled.div`
    background-color:#F0F0F0;
    padding: 10px;
    border-radius: 4px;
    padding: 10px 32px;
`
export const TaskStudentAttempsName = styled.h1`
    font-family: Montserrat;
    font-weight: 600;
    font-size: 20px;
    leading-trim: NONE;
    line-height: 27px;
    letter-spacing: 0%;
    vertical-align: middle;
`

export const Attemps = styled.h2`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 18px;
    position: relative;

    span{
    position: absolute;
    right: 0px;
    font-weight: 600;
    font-size: 18px;
    }
`

export const LimitBlock = styled.div`
    background-color:#F0F0F0;
    margin-top: 20px;
    padding: 32px 32px;
    border-radius: 4px;
`

export const LimitBlockName = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 24px;
`
export const LimitBlockLi = styled.div`
    display:flex;
    position: relative;
`
export const LimitBlockText = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 18px;
`

export const LimitBlockTextZ = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 18px;
    position: absolute;
    right: 0px;
`

export const AttempsLine = styled.div`
    width: 100%x;
    height: 10px;
    background-color: #D1D5DB;
`

export const AttempsLineProgres = styled.div`
background-color: #bccef7;
         width: ${(props) => props.$width}%;
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
`

export const SolutionDetailTestBtn = styled.div`
    display: flex;
    position: relative;
`

export const SolutionDetailTestBtnText = styled.h1`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px;
`
export const SolutionDetailTestBtnTextBtn = styled.h1`
    position: absolute;
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px;
    right: 40px;
`


export const SolutionBlockCode = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
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
    cursor: pointer
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
    box-sizing: border-box;
    position: absolute;
    top: 15px;
    right: 30px;
    &:focus {
      outline: none;
    }

`

export const Info = styled.div`
    display: flex;
    position: relative;
`