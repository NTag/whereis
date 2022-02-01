import * as React from "react";

import "./index.css";
import * as S from "./styles";

const Home = ({ pageContext }) => {
  console.log(pageContext);
  const { svg, point } = pageContext;

  return (
    <S.Container>
      <S.ImageMap src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} />
      <S.Label $x={point.x} $y={point.y}>
        Il est là ☺️
      </S.Label>
    </S.Container>
  );
};

export default Home;
