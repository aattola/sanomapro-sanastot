import styled from 'styled-components';

const MaterialGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;

  margin-bottom: 10px;
`

const MaterialCard = styled.button<{image: string}>`
  border-radius: 4px;
  background-image: url(${(props) => props.image});
  width: 100%;

  min-height: 120px;
  background-position: center;
  background-size: cover;
  cursor: pointer;

  outline: 0px solid black;
  border: 0px solid black;
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, box-shadow;

  :active {
    box-shadow: 0px 4px 28px rgb(0 0 0 / 10%), 0px 4px 10px rgb(0 0 0 / 11%) !important;
    transform: translate3d(0px, 0px, 0px) !important;
  }

  :hover {
    transform: translate3d(0px, -3px, 0px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2), 0 8px 10px rgba(0, 0, 0, 0.2);
  }

  :focus {
    transform: translate3d(0px, -3px, 0px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2), 0 8px 10px rgba(0, 0, 0, 0.2);
    /* border-bottom: 4px solid #86a1ff; */
  }
`

export { MaterialCard, MaterialGrid }
