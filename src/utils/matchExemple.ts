import { MatchType } from "./Types";

export const matchExample: MatchType = {
  number_of_games: 3,
  winner_id: 0,
  serie: {
    id: 101,
    name: 'Spring Championship',
    year: 2025,
    begin_at: '2025-03-01T14:00:00Z',
    end_at: '2025-03-20T18:00:00Z',
    winner_id: 0,
    winner_type: 'Team',
    full_name: 'Spring Championship 2025'
  },
  games: [
    {
      complete: true,
      id: 201,
      position: 1,
      status: 'finished',
      finished: true,
      match_id: 1,
      begin_at: '2025-03-05T15:00:00Z',
      end_at: '2025-03-05T16:00:00Z',
      winner: {
        id: 1,
        type: 'team'
      }
    },
    {
      complete: false,
      id: 202,
      position: 2,
      status: 'running',
      finished: false,
      match_id: 1,
      begin_at: '2025-03-05T16:20:00Z',
      end_at: '',
      winner: {
        id: 0,
        type: ''
      }
    },
    {
      complete: false,
      id: 203,
      position: 3,
      status: 'not_started',
      finished: false,
      match_id: 1,
      begin_at: '',
      end_at: '',
      winner: {
        id: 0,
        type: ''
      }
    }
  ],
  match_type: 'best_of',
  tournament_id: 10,
  tournament: {
    id: 10,
    name: 'Spring Invitational',
    type: 'online',
    country: 'BR',
    begin_at: '2025-02-25T12:00:00Z',
    end_at: '2025-03-30T22:00:00Z',
    tier: 'S',
    region: 'South America'
  },
  modified_at: '2025-03-05T15:05:00Z',
  rescheduled: false,
  end_at: '',
  status: 'running',
  draw: false,
  forfeit: false,
  opponents: [
    {
      type: 'team',
      opponent: {
        id: 1,
        name: 'Beast Squad',
        location: 'São Paulo',
        slug: 'beast-squad',
        modified_at: '2025-02-20T12:00:00Z',
        acronym: 'BST',
        image_url: 'https://i.pinimg.com/736x/92/9b/0b/929b0bd666aa0f2330282abf06f63f6e.jpg'
      }
    },
    {
      type: 'team',
      opponent: {
        id: 2,
        name: 'Legacy',
        location: 'Rio de Janeiro',
        slug: 'legacy',
        modified_at: '2025-02-20T12:00:00Z',
        acronym: 'LGW',
        image_url: 'https://i.pinimg.com/736x/92/9b/0b/929b0bd666aa0f2330282abf06f63f6e.jpg'
      }
    }
  ],
  winner: {
    id: 0,
    name: '',
    location: '',
    slug: '',
    modified_at: '',
    acronym: '',
    image_url: ''
  },
  streams_list: [
    {
      main: true,
      language: 'pt',
      embed_url: 'https://player.twitch.tv/?channel=pgl&parent=example.com',
      official: true,
      raw_url: 'https://www.twitch.tv/pgl'
    }
  ],
  begin_at: '2025-03-05T15:00:00Z',
  live: {
    supported: true,
    url: 'https://www.twitch.tv/pgl',
    opens_at: '2025-03-05T14:55:00Z'
  },
  id: 1,
  league: {
    name: 'PGL'
  },
  name: 'Beast Squad vs Legacy Warriors - Match 1',
  results: [
    {
      score: 12,
      team_id: 1
    },
    {
      score: 10,
      team_id: 2
    }
  ]
};
