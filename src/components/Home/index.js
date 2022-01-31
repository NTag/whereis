import * as React from "react";

import "./index.css";
import * as S from "./styles";

const Home = ({ pageContext }) => {
  return (
    <S.Container>
      <S.ImageMap
        src={`data:image/svg+xml;utf8,${encodeURIComponent(pageContext.svg)}`}
      />
    </S.Container>
  );
};

export default Home;
