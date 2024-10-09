'use client'

import React, { useState, useEffect } from 'react';
import { ValorantCard } from './ValorantCard';
import { ValorantModal } from './ValorantModal';

export function AgentsContent() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      const response = await fetch('/api/valorant-data?type=agents');
      const data = await response.json();
      setAgents(data.data);
    };
    fetchAgents();
  }, []);

  return (
    agents.length === 0 ? (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Agents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {agents.map((agent: any) => (
            <ValorantCard
              key={agent.uuid}
              name={agent.displayName}
              image={agent.fullPortrait}
              onClick={() => setSelectedAgent(agent)}
            />
          ))}
        </div>
        {selectedAgent && (
          <ValorantModal
            data={selectedAgent}
            type="agent"
            onClose={() => setSelectedAgent(null)}
          />
        )}
      </div>
    ) : (
      <div className='h-full w-full flex'>
        <span className="loading loading-ring loading-lg justify-center items-center m-auto"></span>
      </div>
    )
  );
}