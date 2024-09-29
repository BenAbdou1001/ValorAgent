export const formatDecimal = (value: number, decimalPlaces: number = 1): string => {
    return value.toFixed(decimalPlaces);
  };
  
  export const roundNumber = (value: number): number => {
    return Math.round(value);
  };
  
  export const getDataKey = (data: any[]): string => {
    return Object.keys(data[0]).find(key => key !== 'name' && key !== 'map' && key !== 'rank') || '';
  };