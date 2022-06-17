import styled from "styled-components";
import { Link } from "react-router-dom";

export const AnimalLink = styled(Link)`
  width: 20%;
  min-width: 300px;
  background-color: #263859;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  position: relative;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
`;
