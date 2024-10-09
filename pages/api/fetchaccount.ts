// pages/api/fetch-account.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, tag } = req.query;

  const url = `https://api.henrikdev.xyz/valorant/v2/account/${name}/${tag}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': process.env.VALORANT_KEY,
      },
    });
    const { data } = response;
    const accountInfo = {
      name: data.data.name, // Adjust according to actual structure
      account_level: data.data.account_level, // Adjust according to actual structure
      region: data.data.region, // Adjust according to actual structure
      tag: data.data.tag // Adjust according to actual structure
    };
    console.log('External API response:', accountInfo);
    
    res.status(200).json({ accountInfo });
  } catch (error) {
    console.error('Error fetching account data:', error);
    res.status(500).json({ error: 'Failed to fetch account data' });
  }
}
