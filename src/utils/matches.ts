type GameType = {
  complete: boolean,
  id: number,
  position: number,
  status: string,
  finished: boolean,
  match_id: number,
  begin_at: string,
  end_at: string,
  winner: {
      id: number,
      type: string
  }
}

export type OpponentType = {
  type: string,
  opponent: {
      id: number,
      name: string,
      location: string,
      slug: string,
      modified_at: string,
      acronym: string,
      image_url: string
  }
}

type StreamType = {
  main: boolean,
  language: string,
  embed_url: string,
  official: boolean,
  raw_url: string
}

type ResultsType = {
  score: number,
  team_id: number
}

export type MatchType = {
    number_of_games: number;
    winner_id: number;
    serie: {
        id: number,
        name: string,
        year: number,
        begin_at: string,
        end_at: string,
        winner_id: number,
        winner_type: string,
        full_name: string
    };
    games: GameType[];
    match_type: string;
    tournament_id: number;
    tournament: {
        id: number,
        name: string,
        type: string,
        country: string,
        begin_at: string,
        end_at: string,
        tier: string,
        region: string
    };
    modified_at: string;
    rescheduled: false;
    end_at: string;
    status: string;
    draw: boolean;
    forfeit: boolean;
    opponents: OpponentType[];
    winner: {
        id: number,
        name: string,
        location: string,
        slug: string,
        modified_at: string,
        acronym: string,
        image_url: string
    };
    streams_list: StreamType[];
    begin_at: string;
    live: {
        supported: boolean,
        url: string,
        opens_at: string
    };
    id: number;
    name: string;
    results: ResultsType[];
}

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

export const timeConvert = (match: MatchType, date: string): string => {
  const typedDate = new Date(date);
  const hours = String(typedDate.getHours()).padStart(2, '0');
  const minutes = String(typedDate.getMinutes()).padStart(2, '0');

  if (match.status === 'running') {
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
  const firstTeamTotal = match.results.find((team) => match.opponents[0].opponent.id === team.team_id);
  const secondTeamTotal = match.results.find((team) => match.opponents[1].opponent.id === team.team_id);

  return `${firstTeamTotal?.score} : ${secondTeamTotal?.score}`;
}

type PointsType = {
  string: string;
  color: string;
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
    string: String(opponent)!,
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