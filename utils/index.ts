  import axios from 'axios'
  import dotenv from 'dotenv';
  export const formatDecimal = (value: number, decimalPlaces: number = 1): string => {
    return value.toFixed(decimalPlaces);
  };
  
  export const roundNumber = (value: number): number => {
    return Math.round(value);
  };
  
  export const getDataKey = (data: any[]): string => {
    return Object.keys(data[0]).find(key => key !== 'name' && key !== 'map' && key !== 'rank') || '';
  };
  
  dotenv.config();

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



  
  


  