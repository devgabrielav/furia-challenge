import styled from "styled-components";

export const MatchesMainDiv = styled.div`
  background: linear-gradient(90deg, #2D2D2D 0%, #3F3F3F 100%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 837px;
  width: 514px;
`;

export const MatchDiv = styled.div`
  display: flex;
`;

export const MatchNameDiv = styled.div`
  display: flex;
`;

export const MatchLogo = styled.img`
  height: 10px;
  width: 10px;
`;
export const MatchName = styled.span``;

export const MatchStatusInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

type MatchStatusProps = {
  status: string;
}

export const MatchStatus = styled.span<MatchStatusProps>`
  background-color: ${(props) => props.status === "running" ? "#8C0507" : "#4C4B4B"};
  color: #FFFFFF;
`;

export const MatchI = styled.span``;

