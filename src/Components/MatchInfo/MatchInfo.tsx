import { useEffect, useState } from "react";
import { channelNameExtract, dateConvert, fetchMatches, getFullDate, matchTotal, matchType, MatchType, pointsResult, timeConvert } from "../../utils/matches";
import './matchInfoStyles.css';

function MatchInfo() {
  const [matches, setMatches] = useState<MatchType[]>([]);

  useEffect(() => {
    const getMatches = async () => {
      const latestMatches = await fetchMatches();
      setMatches(latestMatches);
    }

    getMatches();
  }, []);

  return (
    <section className="firstSection">
      <h2 className="matchTitle">PARTIDAS</h2>
      <div className="matchesMainDiv">
        { matches.map((match) => {
            const team1Result = pointsResult(match, match.opponents[0]);
            const team2Result = pointsResult(match, match.opponents[1]);
            const startDate = dateConvert(match.begin_at);
            const startTime = timeConvert(match, match.begin_at);
            const endTime = timeConvert(match, match.end_at);

          return (
          <div className="matchDiv" key={match.id}>
            <div className="matchNameDiv">
              <span className="matchName">
                {`${ match.serie.full_name } ${ match.tournament.name } - ${getFullDate(match.serie.begin_at, match.serie.end_at)}`
                }</span>
            </div>
            <div className="matchContent">
              <div className="matchStatusInfoDiv">
                <span className={`matchStatus ${match.status === "running" ? "running" : "finished"}`}>LIVE</span>
                <span className="matchI">{ matchType(match.match_type, match.number_of_games) }</span>
              </div>
              <div className="matchInfoDiv">
                {match.opponents.length === 0 ? (
                  <div>
                    <h2>A SER DEFINIDO</h2>
                  </div>
                ): (
                <div className="dateTeamsDiv">
                  <div className="teamsResultsDiv">
                    <span className="teamName">{ match.opponents[0].opponent.name }</span>
                    <img className="teamLogo" src={ match.opponents[0].opponent.image_url } />
                    <span className="pointsResult" style={ { color: team1Result.color } }>
                      { team1Result.string }
                      </span>
                    <span className="matchTotal">
                      { matchTotal(match) }
                    </span>
                    <span className="pointsResult" style={ { color: team2Result.color } }>
                      { team2Result.string }
                      </span>
                    <img className="teamLogo" src={ match.opponents[1].opponent.image_url } />
                    <span className="teamName">{ match.opponents[1].opponent.name }</span>
                  </div>
                    <div className="dateTimeDiv">
                      <span className="dateSpan">{ startDate } </span >
                      <span className="timeSpan">{ `${startTime} - ${endTime}` }</span>
                    </div>
                </div>)}
                <div className="liveStreamsDiv">
                  <h2 className="liveStreamTitle">LIVESTREAMS</h2>
                    { match.streams_list
                      .sort((a, b) => channelNameExtract(b.raw_url).length - channelNameExtract(a.raw_url).length)
                      .map((live) => {
                        const channelName = channelNameExtract(live.raw_url);
                        return (
                      <div className="livestreams" key={ live.embed_url }>
                        <a className="liveStreamTag" href={ live.raw_url } target="_blank">
                            <img
                              src={ channelName === 'Youtube' ? '/src/assets/youtube.png' : 'src/assets/twitch.png' }
                              alt=""
                              style={ { height: '15px', width: '15px' } }
                              />
                            <span>{ channelName }</span>
                        </a>
                      </div>
                    )}) }
                </div>
              </div>
            </div>
          </div>
        )}) }
      </div>
    </section>
  )
}

export default MatchInfo;