import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const ImageMap = styled.img`
  height: 100vh;
  width: 100vw;
  object-fit: cover;
`;

export const Label = styled.div`
  position: absolute;
  top: calc(${({ $y }) => $y} - 2px);
  left: calc(${({ $x }) => $x} + 16px);
  color: white;
  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
`;
