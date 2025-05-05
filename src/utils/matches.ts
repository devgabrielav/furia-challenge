import { MatchType, OpponentType, PointsType } from "./Types";

export const fetchMatches = async (): Promise<MatchType[]> => {
  const response = await fetch('http://localhost:3001/matches');
  const matches: MatchType[] = await response.json();

  return matches.slice(0, 10);
}

export const dateConvert = (date: string): string => {
  const typedDate = new Date(date);
  const day = String(typedDate.getDate()).padStart(2, '0');
  const month = String(typedDate.getMonth()).padStart(2, '0');

  return `${day}/${month}`;
}

export const timeConvert = (match: MatchType, date: string, type: 'begin' | 'end'): string => {
  const typedDate = new Date(date);
  const hours = String(typedDate.getHours()).padStart(2, '0');
  const minutes = String(typedDate.getMinutes()).padStart(2, '0');

  if (match.status === 'running' && type === 'end') {
    return 'EM ANDAMENTO';
  } else if (match.status === 'not_started' && date === null) {
    return '';
  }

  return `${hours}:${minutes}h`;
}

export const matchType = (type: string, numberOfGames: number): string => {
  if (type === 'best_of') {
    return `BO${numberOfGames}`;
  } else if (type === 'first_to') {
    return `FT${numberOfGames}`;
  }
  return `RBHG${numberOfGames}`
}

export const channelNameExtract = (url: string): string => {
  const regex = /https:\/\/www\.twitch\.tv\/([^\\/]+)/;
  const match = url.match(regex);
  return match ? match[1] : 'Youtube';
}

export const matchTotal = (match: MatchType): string => {
    const teamA = match.opponents[0]?.opponent;
    const teamB = match.opponents[1]?.opponent;

    let teamAMapsWon = 0;
    let teamBMapsWon = 0;

    for (const game of match.games) {
      if (game.status === "finished") {
        if (game.winner?.id === teamA.id) teamAMapsWon++;
        else if (game.winner?.id === teamB.id) teamBMapsWon++;
      }
    }

  return `${teamAMapsWon} : ${teamBMapsWon}`;
}

export const pointsResult = (match: MatchType, team: OpponentType): PointsType => {
  if (match.status === "finished") {
    return match.winner_id === team.opponent.id ? {string: 'W', color: '#00CE00'} : { string: 'L', color: '#FF0000'};
  } else if (match.status === 'not_started') {
    return { string: 'NP', color: '#E1B833'};
  }

  const lastRoundPoints = match.results.find((result) => result.team_id === team.opponent.id)?.score;
  const opponent = match.results.find((result) => result.team_id !== team.opponent.id)?.score;

  const data = {
    string: `(${lastRoundPoints!})`,
    color: lastRoundPoints! > opponent! ? '#00CE00' : '#FF0000',
  }
  return data;
}

export const getFullDate = (tourneyStartDate: string, tourneyEndDate: string): string => {
  const typedStartDate = new Date(tourneyStartDate);
  const typedEndDate = new Date(tourneyEndDate);
  
  const startDay = String(typedStartDate.getDate()).padStart(2, '0');
  const endDay = String(typedEndDate.getDate()).padStart(2, '0');
  
  const month = typedEndDate.getMonth();
  const stringMonth = new Intl.DateTimeFormat('pt', { month: 'long' }).format(new Date(2000, month));
  const capitalizedMonth = stringMonth.charAt(0).toUpperCase() + stringMonth.slice(1);

  return `${startDay} a ${endDay} de ${capitalizedMonth}`;
};