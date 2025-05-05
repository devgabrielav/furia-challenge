export type MessagesType = { user: string; } | { bot: string; }

export type SendMessageType = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  currentMessage: string;
  setMessages: React.Dispatch<React.SetStateAction<MessagesType[]>>;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
}

export type GameType = {
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

export type StreamType = {
  main: boolean,
  language: string,
  embed_url: string,
  official: boolean,
  raw_url: string
}

export type ResultsType = {
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
    league: {
      name: string;
    }
    name: string;
    results: ResultsType[];
}

export type PointsType = {
  string: string;
  color: string;
}