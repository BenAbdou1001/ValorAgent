import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query;

  if (!type || !['agents', 'weapons', 'maps'].includes(type as string)) {
    return res.status(400).json({ error: 'Invalid type parameter' });
  }

  const apiUrls = {
    agents: 'https://valorant-api.com/v1/agents?language=en-US&isPlayableCharacter=true',
    weapons: 'https://valorant-api.com/v1/weapons?language=en-US',
    maps: 'https://valorant-api.com/v1/maps?language=en-US',
  };

  try {
    const response = await axios.get(apiUrls[type as keyof typeof apiUrls]);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Valorant data:', error);
    res.status(500).json({ error: 'Failed to fetch Valorant data' });
  }
}