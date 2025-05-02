import { useEffect, useState } from "react";
import { dateConvert, fetchMatches, matchType, MatchType } from "../../utils/matches";
import './matchInfoStyles.css';

function MatchInfo() {
  const [matches, setMatches] = useState<MatchType[]>([]);

  useEffect(() => {
    const getMatches = async () => {
      const latestMatches = await fetchMatches();

      setMatches(latestMatches);
    }

    getMatches();
  }, [])

  return (
    <section className="firstSection">
      <h2 className="matchTitle">PARTIDAS</h2>
      <div className="matchesMainDiv">
        { matches.map((match) => (
          <div className="matchDiv" key={match.id}>
            <div className="matchNameDiv">
              <span className="matchName">{ match.tournament.name }</span>
            </div>
            <div className="matchStatusInfoDiv">
              <span className={`matchStatus ${match.status === "running" ? "running" : "finished"}`}>LIVE</span>
              <span className="matchI">{ matchType(match.match_type, match.number_of_games) }</span>
            </div>
            <div className="matchInfoDiv">
              <div className="teamsResultsDiv">
                <span className="teamName">{ match.opponents[0].opponent.name }</span>
                <img className="teamLogo" src={ match.opponents[0].opponent.image_url } />
                <span className="pointsResult">To be done</span>
                <span className="matchTotal">Also to be done</span>
                <span className="pointsResult">To be done</span>
                <img className="teamLogo" src={ match.opponents[1].opponent.image_url } />
                <span className="teamName">{ match.opponents[1].opponent.name }</span>
              </div>
              <div className="timeDiv">
                <span className="timeSpan">{ `INÍCIO: ${ dateConvert(match.begin_at) }` }</span >
                <span className="timeSpan">{ `FIM: ${ dateConvert(match.end_at) }` }</span >
              </div>
              <div className="liveStreamsDiv">
                <h2 className="liveStreamTitle">LIVESTREAMS</h2>
                  { match.streams_list.map((live) => (
                    <div className="livestreams" key={ live.embed_url }>
                      <a className="liveStreamTag" href={ live.raw_url } target="_blank">
                        LIVE
                      </a>
                    </div>
                  )) }
              </div>
            </div>
          </div>
        )) }
      </div>
    </section>
  )
}

export default MatchInfo;