import { useEffect, useState } from "react";
import { fetchMatches, MatchType } from "../../utils/matches";

function FanInfo() {
  const [matches, setMatches] = useState<MatchType[]>([]);

  useEffect(() => {
    const getMatches = async () => {
      const latestMatches = await fetchMatches();

      setMatches(latestMatches);
    }

    getMatches();
  }, [])
  
  const dateConvert = (date: string) => {
    const typedDate = new Date(date);

    const day = String(typedDate.getDate()).padStart(2, '0');
    const month = String(typedDate.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const year = typedDate.getFullYear();
    const hours = String(typedDate.getHours()).padStart(2, '0');
    const minutes = String(typedDate.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} às ${hours}:${minutes}`;
    return formattedDate;
  }

  return (
    <div>
      {matches.map((match) => (
        <div key={ match.id } style={ { display: 'flex', border: '1px solid' } }>
          <h3>{ match.name }</h3>
          {match.opponents.map(({opponent}) => (
            <div key={ opponent.id } >
              <img src={ opponent.image_url } alt="" style={ { width: '20px', height: '20px' } } />
              <p>{ opponent.name }</p>
            </div>
          ))}
          {match.results.map((result) => (
            <div key={result.team_id}>
              <p>{result.score}</p>
              <p>{match.opponents.find((team) => team.opponent.id === result.team_id)?.opponent.name}</p>
            </div>
          ))}
          <div>
            <p>{`Inicio: ${dateConvert(match.begin_at)}`}</p>
            <p>{`Fim: ${dateConvert(match.end_at)}`}</p>
          </div>
        </div>
      ))}
      {/*Referência do Contato Inteligente (Whatsapp: https://wa.me/5511993404466) da FURIA, em closed beta.*/}
    </div>
  )
}

export default FanInfo;