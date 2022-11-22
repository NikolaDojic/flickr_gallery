import styled from "styled-components";

const StyledError = styled.div`
  background-color: #ffc6d6;
  border: 2px solid red;
  padding: 15px;
`;

type TErrorProps = {
  message?: string | null;
};

export const Error = ({ message }: TErrorProps) =>
  message ? <StyledError>{message}</StyledError> : null;
