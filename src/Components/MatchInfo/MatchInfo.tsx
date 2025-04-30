import { useEffect, useState } from "react";
import { fetchMatches, MatchType } from "../../utils/matches";
import { MatchDiv, MatchesMainDiv, MatchI, MatchLogo, MatchName, MatchNameDiv, MatchStatus, MatchStatusInfoDiv } from "./MatchInfoStyles";

function MatchInfo() {
  const [matches, setMatches] = useState<MatchType[]>([]);

  useEffect(() => {
    const getMatches = async () => {
      const latestMatches = await fetchMatches();
      console.log(latestMatches);
      

      setMatches(latestMatches);
    }

    getMatches();
  }, [])
  
  const dateConvert = (date: string) => {
    const typedDate = new Date(date);

    const day = String(typedDate.getDate()).padStart(2, '0');
    const month = String(typedDate.getMonth() + 1).padStart(2, '0');
    const year = typedDate.getFullYear();
    const hours = String(typedDate.getHours()).padStart(2, '0');
    const minutes = String(typedDate.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} às ${hours}:${minutes}`;
    return formattedDate;
  }

  const matchType = (type: string, numberOfGames: number): string => {
    if (type === 'best_of') {
      return `BO${numberOfGames}`;
    } else if (type === 'first_to') {
      return `FT${numberOfGames}`;
    }
    return `RBHG${numberOfGames}`
  }

  return (
    <MatchesMainDiv>
      { matches.map((match) => (
        <MatchDiv key={ match.id }>
          <MatchNameDiv>
            <MatchLogo />
            <MatchName>{ match.serie.name }</MatchName>
          </MatchNameDiv>
          <MatchStatusInfoDiv>
            <MatchStatus status={ match.status }>LIVE</MatchStatus>
            <MatchI>{ matchType(match.match_type, match.number_of_games) }</MatchI>
          </MatchStatusInfoDiv>
        </MatchDiv>
      )) }
    </MatchesMainDiv>
  )
}

export default MatchInfo;