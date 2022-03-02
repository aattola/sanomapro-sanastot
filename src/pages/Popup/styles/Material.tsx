import styled from 'styled-components';

export const Result = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  padding: 0px 5px;
  margin-bottom: 2px;

  border-radius: 4px;

  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    background-color: #fdfdfd;
    transform: translate3d(0px, -4px, 0px);
    box-shadow: 0px 2px 5px rgb(0 0 0 / 5%), 0 8px 10px rgb(0 0 0 / 5%);
  }
  
  margin-bottom: 5px;
`;

export const Paragraph = styled.p`
  margin: 0;
  cursor: pointer;
`
