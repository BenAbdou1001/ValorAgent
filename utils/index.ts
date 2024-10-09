  import { MatchData, DashboardData, FilterOptions, PlayerData, ChartData , BarChartData } from '../types/index';
  import axios from 'axios'
  import dotenv from 'dotenv';
  dotenv.config();
  

  export const getDataKey = (data: BarChartData[]): string => {
    if (!data || data.length === 0) {
      return '';
    }
    const keys = Object.keys(data[0]);
    return keys.find(key => key !== 'map' && key !== 'rank' && key !== 'name') || '';
  };
  


export const formatDecimal = (value: number, decimalPlaces: number = 1): string => {
  return value.toFixed(decimalPlaces);
};


export const roundNumber = (value: number): number => {
  return Math.round(value);
};

export async function fetchAccountData(accountName: string, tagName: string) {
  try {
    const response = await fetch(`/api/fetchaccount?name=${accountName}&tag=${tagName}`);
    if (!response.ok) {
      throw new Error('Account not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching account data:', error);
    throw error;
  }
}

export async function fetchMatchData(region: string, name: string, tag: string, size: number = 5
  , mode: string = 'competitive') {
  if (!region || !name || !tag) {
    throw new Error('Region, name, and tag are required');
  }

  try {
    const response = await fetch(`/api/fetchmatches?region=${encodeURIComponent(region)}&name=${encodeURIComponent(name)}&tag=${encodeURIComponent(tag)}&size=${size}&mode=${mode}`);
    if (!response.ok) {
      throw new Error('Failed to fetch match data');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching match data:', error);
    throw error;
  }
}


const calculateGameModeStats = (matches: MatchData[], playerName: string, playerTag: string): DashboardData['gameModeStats'] => {
  const gameModeStats: DashboardData['gameModeStats'] = {};

  matches.forEach(match => {
    const mode = match.metadata.mode.toLowerCase();
    if (!gameModeStats[mode]) {
      gameModeStats[mode] = { 
        wins: 0, 
        losses: 0, 
        winRate: 0, 
        averageScore: 0, 
        averageKills: 0, 
        averageDeaths: 0, 
        averageAssists: 0 
      };
    }

    const playerData = match.players.all_players.find(player => player.name === playerName && player.tag === playerTag);
    if (playerData) {
      if (mode === 'deathmatch') {
        // For deathmatch, consider a win if the player is in the top 3
        const playerRank = match.players.all_players.sort((a, b) => b.stats.score - a.stats.score)
          .findIndex(player => player.name === playerName && player.tag === playerTag);
        if (playerRank < 3) {
          gameModeStats[mode].wins++;
        } else {
          gameModeStats[mode].losses++;
        }
      } else if (match.teams) {
        const playerTeam = playerData.team.toLowerCase() as 'red' | 'blue';
        if (match.teams[playerTeam] && match.teams[playerTeam].has_won) {
          gameModeStats[mode].wins++;
        } else {
          gameModeStats[mode].losses++;
        }
      }

      // Update average stats
      const stats = gameModeStats[mode];
      const gamesPlayed = stats.wins + stats.losses;
      stats.averageScore = (stats.averageScore * (gamesPlayed - 1) + playerData.stats.score) / gamesPlayed;
      stats.averageKills = (stats.averageKills * (gamesPlayed - 1) + playerData.stats.kills) / gamesPlayed;
      stats.averageDeaths = (stats.averageDeaths * (gamesPlayed - 1) + playerData.stats.deaths) / gamesPlayed;
      stats.averageAssists = (stats.averageAssists * (gamesPlayed - 1) + playerData.stats.assists) / gamesPlayed;
    }
  });

  // Calculate win rates
  Object.keys(gameModeStats).forEach(mode => {
    const { wins, losses } = gameModeStats[mode];
    const totalGames = wins + losses;
    gameModeStats[mode].winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;
  });

  return gameModeStats;
};

const calculateRankDistribution = (matches: MatchData[]): DashboardData['rankDistribution'] => {
  const rankCounts: { [key: string]: number } = {};

  matches.forEach(match => {
    if (match.metadata.mode.toLowerCase() !== 'deathmatch') {
      match.players.all_players.forEach(player => {
        const rank = player.currenttier_patched || 'Unranked';
        rankCounts[rank] = (rankCounts[rank] || 0) + 1;
      });
    }
  });

  return Object.entries(rankCounts)
    .map(([rank, count]) => ({ rank, count }))
    .sort((a, b) => b.count - a.count);
};

  export const processApiData = (data: MatchData[], filters: FilterOptions, playerName: string, playerTag: string): DashboardData => {
    const filteredData = filterMatches(data, filters);
    const playerData = extractPlayerData(filteredData, playerName, playerTag);
  
    return {
      agentPickRates: calculateAgentPickRates(playerData),
      weaponUsage: calculateWeaponUsage(playerData),
      mapWinRates: calculateMapWinRates(filteredData, playerName, playerTag),
      playerStats: calculatePlayerStats(playerData),
      lastMatches: getLastMatchesResults(filteredData, playerName, playerTag),
      gameModeStats: calculateGameModeStats(filteredData, playerName, playerTag),
      rankDistribution: calculateRankDistribution(filteredData),
    };
  };


  export const filterMatches = (matches: MatchData[], filters: FilterOptions): MatchData[] => {
    return (matches || [])
      .filter(match => match && match.metadata && (!filters.mode || match.metadata.mode.toLowerCase() === filters.mode))
      .slice(0, filters.gameCount);
  };

const extractPlayerData = (matches: MatchData[], playerName: string, playerTag: string): PlayerData[] => {
  return matches.map(match => 
    match.players.all_players.find(player => player.name === playerName && player.tag === playerTag)
  ).filter((player): player is PlayerData => player !== undefined);
};

const calculateAgentPickRates = (playerData: PlayerData[]): ChartData[] => {
  const agentCounts: { [key: string]: number } = {};
  playerData.forEach(player => {
    agentCounts[player.character] = (agentCounts[player.character] || 0) + 1;
  });

  const totalPicks = playerData.length;
  return Object.entries(agentCounts).map(([name, count]) => ({
    name,
    value: (count / totalPicks) * 100
  })).sort((a, b) => b.value - a.value);
};

const calculateWeaponUsage = (playerData: PlayerData[]): ChartData[] => {
  // This would require additional data about weapon usage, which isn't provided in the current API response
  // For now, we'll return placeholder data
  return [
    { name: 'Vandal', value: 35 },
    { name: 'Phantom', value: 30 },
    { name: 'Operator', value: 15 },
    { name: 'Spectre', value: 10 },
    { name: 'Sheriff', value: 5 },
    { name: 'Others', value: 5 },
  ];
};

const calculateMapWinRates = (matches: MatchData[], playerName: string, playerTag: string): BarChartData[] => {
  const mapStats: { [key: string]: { wins: number; total: number } } = {};

  matches.forEach(match => {
    const map = match.metadata.map;
    if (!mapStats[map]) {
      mapStats[map] = { wins: 0, total: 0 };
    }
    mapStats[map].total++;
    const playerData = match.players.all_players.find(player => player.name === playerName && player.tag === playerTag);
    if (playerData) {
      if (match.metadata.mode.toLowerCase() === 'deathmatch') {
        // For deathmatch, consider a win if the player is in the top 3
        const playerRank = match.players.all_players.sort((a, b) => b.stats.score - a.stats.score)
          .findIndex(player => player.name === playerName && player.tag === playerTag);
        if (playerRank < 3) {
          mapStats[map].wins++;
        }
      } else if (match.teams) {
        const playerTeam = playerData.team.toLowerCase() as 'red' | 'blue';
        if (match.teams[playerTeam] && match.teams[playerTeam].has_won) {
          mapStats[map].wins++;
        }
      }
    }
  });

  return Object.entries(mapStats).map(([map, stats]) => ({
    map,
    winRate: (stats.wins / stats.total) * 100
  }));
};


const calculatePlayerStats = (playerData: PlayerData[]): DashboardData['playerStats'] => {
  const totalStats = playerData.reduce((acc, player) => {
    acc.kills += player.stats.kills;
    acc.deaths += player.stats.deaths;
    acc.assists += player.stats.assists;
    acc.score += player.stats.score;
    acc.headshots += player.stats.headshots;
    acc.bodyshots += player.stats.bodyshots;
    acc.legshots += player.stats.legshots;
    acc.totalShots += player.stats.bodyshots + player.stats.headshots + player.stats.legshots;
    return acc;
  }, { kills: 0, deaths: 0, assists: 0, score: 0, headshots: 0, bodyshots: 0, legshots: 0, totalShots: 0 });

  const matchCount = playerData.length;

  return {
    averageKills: totalStats.kills / matchCount,
    averageDeaths: totalStats.deaths / matchCount,
    averageAssists: totalStats.assists / matchCount,
    averageScore: totalStats.score / matchCount,
    headshot_percentage: (totalStats.headshots / totalStats.totalShots) * 100,
    bodyshot_percentage: (totalStats.bodyshots / totalStats.totalShots) * 100,
    legshot_percentage: (totalStats.legshots / totalStats.totalShots) * 100,
  };
};

const getLastMatchesResults = (matches: MatchData[], playerName: string, playerTag: string): { result: 'WON' | 'LOSS' }[] => {
  return matches.slice(0, 5).map(match => {
    const playerData = match.players.all_players.find(player => player.name === playerName && player.tag === playerTag);
    if (playerData) {
      const playerTeam = playerData.team.toLowerCase() as 'red' | 'blue';
      return { result: match.teams && match.teams[playerTeam] && match.teams[playerTeam].has_won ? 'WON' : 'LOSS' };
    }
    return { result: 'LOSS' }; // Default to loss if player data not found
  });
};




  
  


  