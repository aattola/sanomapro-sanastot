import styled from 'styled-components';

export const Result = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  flex-direction: row;
  justify-content: space-between;
  
  padding: 0px 5px;
  margin-bottom: 2px;

  border-radius: 4px;

  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);

  //:hover {
  //  background-color: #fdfdfd;
  //  transform: translate3d(0px, -1px, 0px);
  //  box-shadow: 0px 2px 5px rgb(0 0 0 / 5%), 0 8px 10px rgb(0 0 0 / 5%);
  //}
  
  margin-bottom: 5px;
`;

export const Paragraph = styled.p`
  margin: 0;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  
  padding: 2px;

  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 4px;
  
  :hover {
    background-color: #fdfdfd;
    transform: translate3d(0px, -1px, 0px);
    box-shadow: 0px 2px 5px rgb(0 0 0 / 5%), 0 8px 10px rgb(0 0 0 / 5%);
  }
  
  :active {
    box-shadow: 0px 1px 2px rgb(0 0 0 / 3%), 0 8px 10px rgb(0 0 0 / 3%);
    transform: translate3d(0px, 0px, 0px);

  }
`
