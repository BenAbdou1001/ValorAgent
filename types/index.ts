export interface ChartData {
    name: string;
    value: number;
  }
  
  export interface BarChartData {
    [key: string]: string | number;
  }
  
  export interface AverageMatchStats {
    averageKills: number;
    averageDeaths: number;
    averageAssists: number;
    averageScore: number;
  }
  
  export interface DashboardData {
    agentPickRates: ChartData[];
    weaponUsage: ChartData[];
    mapWinRates: BarChartData[];
    gameModeStats: GameModeStats;
    averageMatchStats: AverageMatchStats;
    rankDistribution: BarChartData[];
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
    competitive: AverageMatchStats;
    deathmatch: AverageMatchStats;
    teamDeathmatch: AverageMatchStats;
    spikeRush: AverageMatchStats;
  }

  export type GameMode = 'competitive' | 'deathmatch' | 'teamDeathmatch' | 'spikeRush';

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