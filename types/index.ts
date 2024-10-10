export interface ChartData {
    name: string;
    value: number;
  }


  
export interface AbilityCasts {
  c_cast: number;
  q_cast: number;
  e_cast: number;
  x_cast: number;
}
  
  export interface BarChartData {
    map: string;
    winRate: number;
  }
  export interface DashboardClientProps {
    initialFilters: FilterOptions;
  } 
  export interface AverageMatchStats {
    averageScore: number;
    averageKills: number;
    averageDeaths: number;
    averageAssists: number;
    winRate: number;
    wins:number,
    losses:number
  }
  
  export interface DashboardData {
    agentPickRates: ChartData[];
    abilityUsage: AbilityCasts;
    mapWinRates: BarChartData[];
    playerStats: {
      averageKills: number;
      averageDeaths: number;
      averageAssists: number;
      averageScore: number;
      headshot_percentage: number;
      bodyshot_percentage: number;
      legshot_percentage: number;
    };
    lastMatches: { result: 'WON' | 'LOSS' }[];
    gameModeStats: {
      [key: string]: AverageMatchStats;
    };
    rankDistribution: {
      rank: string;
      count: number;
    }[];
  }

  export interface CardProps {
    title: string;
    content: React.ReactNode;
  }

  export interface BarChartProps {
    title: string;
    data: BarChartData[];
  }

  export interface ChartProps {
    title: string;
    data: ChartData[];
  }
  
  export interface SideNavigationProps {
    isOpen: boolean;
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }
  
  export interface GameModeStats {
    [key: string]: AverageMatchStats;
  }

  export type GameMode = 'competitive' | 'deathmatch' | 'teamDeathmatch' | 'spikeRush' | 'unrated';

  export type TimeRange = 'last_week' | 'last_month' | 'last_year' | 'all_time';

  export interface AgentCardProps {
    name: string;
  }

  export interface WeaponCardProps {
    name: string;
  }
  
  export interface MapCardProps {
    name: string;
  }

  export interface DashboardPageProps {
    accountData: {
      name: string;
      region: string;
      account_level: number;
    }
  }

  export type GameCount = 1 | 5 | 10;

export interface FilterOptions {
  mode: GameMode;
  gameCount: GameCount;
}

  export interface MatchData {
    metadata: {
      map: string;
      game_start_patched: string;
      mode: string;
      season_id: string;
    };
    players: {
      all_players: PlayerData[];
    };
    teams?: {
      red: TeamData;
      blue: TeamData;
    };
    rounds: RoundData[];
  }
  export interface PlayerStats {
    kills: number;
    deaths: number;
    assists: number;
    score: number;
    bodyshots: number;
    headshots: number;
    legshots: number;
    weaponsUsed: string[]; // Array of weapon names used in the match
  }
  export interface PlayerData {
    name: string;
    tag: string;
    team: string;
    level: number;
    character: string;
    currenttier: number;
    currenttier_patched: string;
    player_card: string;
    player_title: string;
    party_id: string;
    session_playtime: {
      minutes: number;
    };
    behavior: {
      afk_rounds: number;
      friendly_fire: {
        incoming: number;
        outgoing: number;
      };
      rounds_in_spawn: number;
    };
    platform: {
      type: string;
    };
    ability_casts: {
      c_cast: number;
      q_cast: number;
      e_cast: number;
      x_cast: number;
    };
    assets: {
      card: {
        small: string;
        large: string;
        wide: string;
      };
      agent: {
        small: string;
        bust: string;
        full: string;
        killfeed: string;
      };
    };
    stats: PlayerStats;
    economy: {
      spent: {
        overall: number;
        average: number;
      };
      loadout_value: {
        overall: number;
        average: number;
      };
    };
    damage_made: number;
    damage_received: number;
  }

  export interface TeamData {
    has_won: boolean;
    rounds_won: number;
    rounds_lost: number;
  }
  
  export interface RoundData {
    winning_team: string;
    end_type: string;
    bomb_planted: boolean;
    bomb_defused: boolean;
    plant_events: {
      plant_site: string;
    } | null;
  }
  

  export interface BarChartData {
    [key: string]: string | number;
  }