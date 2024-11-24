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

  export interface Agent {
    uuid: string;
    displayName: string;
    description: string;
    developerName: string;
    characterTags: string[] | null;
    displayIcon: string;
    displayIconSmall: string;
    bustPortrait: string;
    fullPortrait: string;
    fullPortraitV2: string;
    killfeedPortrait: string;
    background: string;
    backgroundGradientColors: string[];
    assetPath: string;
    isFullPortraitRightFacing: boolean;
    isPlayableCharacter: boolean;
    isAvailableForTest: boolean;
    isBaseContent: boolean;
    role: {
      uuid: string;
      displayName: string;
      description: string;
      displayIcon: string;
      assetPath: string;
    };
    recruitmentData: any | null;
    abilities: {
      slot: string;
      displayName: string;
      description: string;
      displayIcon: string;
    }[];
    voiceLine: any | null;
  }

  export interface MapCallout {
    regionName: string;
    superRegionName: string;
    location: {
      x: number;
      y: number;
    };
  }

  export interface Map {
    uuid: string;
    displayName: string;
    narrativeDescription: string | null;
    tacticalDescription: string;
    coordinates: string;
    displayIcon: string;
    listViewIcon: string;
    listViewIconTall: string;
    splash: string;
    stylizedBackgroundImage: string;
    premierBackgroundImage: string;
    assetPath: string;
    mapUrl: string;
    xMultiplier: number;
    yMultiplier: number;
    xScalarToAdd: number;
    yScalarToAdd: number;
    callouts: MapCallout[];
  }
  export interface WeaponStats {
    fireRate: number;
    magazineSize: number;
    runSpeedMultiplier: number;
    equipTimeSeconds: number;
    reloadTimeSeconds: number;
    firstBulletAccuracy: number;
    shotgunPelletCount: number;
    wallPenetration: string;
    feature: string;
    fireMode: string | null;
    altFireType: string;
    adsStats: {
      zoomMultiplier: number;
      fireRate: number;
      runSpeedMultiplier: number;
      burstCount: number;
      firstBulletAccuracy: number;
    } | null;
    altShotgunStats: any | null;
    airBurstStats: any | null;
    damageRanges: {
      rangeStartMeters: number;
      rangeEndMeters: number;
      headDamage: number;
      bodyDamage: number;
      legDamage: number;
    }[];
  }

  export interface ShopData {
    cost: number;
    category: string;
    shopOrderPriority: number;
    categoryText: string;
    gridPosition: {
      row: number;
      column: number;
    };
    canBeTrashed: boolean;
    image: string | null;
    newImage: string;
    newImage2: string | null;
    assetPath: string;
  }

  export interface WeaponSkinChroma {
    uuid: string;
    displayName: string;
    displayIcon: string | null;
    fullRender: string;
    swatch: string | null;
    streamedVideo: string | null;
    assetPath: string;
  }

  export interface WeaponSkinLevel {
    uuid: string;
    displayName: string;
    levelItem: string | null;
    displayIcon: string;
    streamedVideo: string | null;
    assetPath: string;
  }

  export interface WeaponSkin {
    uuid: string;
    displayName: string;
    themeUuid: string;
    contentTierUuid: string;
    displayIcon: string;
    wallpaper: string | null;
    assetPath: string;
    chromas: WeaponSkinChroma[];
    levels: WeaponSkinLevel[];
  }

  export interface Weapon {
    uuid: string;
    displayName: string;
    category: string;
    defaultSkinUuid: string;
    displayIcon: string;
    killStreamIcon: string;
    assetPath: string;
    weaponStats: WeaponStats;
    shopData: ShopData;
    skins: WeaponSkin[];
  }