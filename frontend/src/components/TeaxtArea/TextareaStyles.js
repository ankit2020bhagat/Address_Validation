import styled, { css } from "styled-components";

export const StyledTextareaWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 2px;
  width: 800px;
  height: 420px;
  margin-left: 250px;
`;

export const sharedStyle = css`
  margin: 0;
  padding: 10px 0;
  height: 400px;
  border-radius: 0;
  resize: none;
  outline: none;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.2;
  &:focus-visible {
    outline: none;
  }
`;

export const StyledTextarea = styled.textarea`
  ${sharedStyle}
  padding-left: 3.5rem;
  width: calc(100% - 3.5rem);

  border: none;
  &::placeholder {
    color: grey;
  }
`;

export const StyledNumbers = styled.div`
  ${sharedStyle}
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  text-align: right;
  box-shadow: none;
  position: absolute;
  color: grey;
  border: none;
  background-color: lightgrey;
  padding: 10px;
  width: 1.5rem;
`;

export const StyledNumber = styled.div`
  color: ${(props) => (props.active ? "blue" : "inherit")};
`;
