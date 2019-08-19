import styled from "styled-components";
import { easyMove } from "../../style-constants";

const MarkerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: white;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s;
  animation: ${easyMove} 0.3s;
  &:hover {
    transform: scale(1.2);
  }
`;

export default MarkerStyled;
