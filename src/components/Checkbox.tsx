import styled, { css } from "styled-components";

const Container = styled.div<{ isSelected: boolean }>`
  ${({ isSelected }) => css`
    display: inline-flex;
    text-align: center;
    align-items: center;
    padding: 2px 8px;
    background-color: ${isSelected ? "red" : "#e2e7f2"};
    font-weight: 500;
    font-size: 14px;
    font-family: sans-serif;
    border-radius: 20px;
    cursor: pointer;
    user-select: none;
  `}
`;

interface Props {
  label: string;
  checked: boolean;
  onClick(): void;
}

export default function Checkbox({ label, checked = false, onClick }: Props) {
  return (
    <Container isSelected={checked} onClick={() => onClick()}>
      {label}
    </Container>
  );
}
