import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { region, name, tag, size = '5', mode = 'competitive' } = req.query;

  if (!region || !name || !tag) {
    return res.status(400).json({ error: 'Region, name, and tag are required' });
  }

  const url = `https://api.henrikdev.xyz/valorant/v3/matches/${region}/${name}/${tag}?size=${size}&mode=${mode}`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': process.env.VALORANT_KEY,
      },
    });
    const { data } = response;
    console.log('External API response:', data);
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching match data:', error);
    res.status(500).json({ error: 'Failed to fetch match data' });
  }
}