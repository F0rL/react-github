import styled from "styled-components";
import dynamic from "next/dynamic";
//import Com from '../components/Com'
const Com = dynamic(import("../components/Com"));

const Title = styled.h1`
  color: red;
  font-size: 32px;
`;

const B = () => (
  <div>
    <Title>this is title</Title>
    b page
    <Com />
  </div>
);
export default B;
