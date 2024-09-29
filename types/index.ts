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
  

  