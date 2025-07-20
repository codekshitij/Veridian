import React from 'react';
import StatsCard from './StatsCard';
import { animations } from '../utils/animations';

const StatsOverview = ({ stats }) => (
  <div 
    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    style={animations.slideInLeft}
  >
    <StatsCard title="TOTAL IDEAS" value={stats.total} subtitle="All time" delay={0} />
    <StatsCard title="FILTERED RESULTS" value={stats.filtered} subtitle="Current view" delay={100} />
    <StatsCard title="THIS WEEK" value={stats.thisWeek} subtitle="Recent ideas" delay={200} />
    <StatsCard title="THIS MONTH" value={stats.thisMonth} subtitle="Monthly progress" delay={300} />
  </div>
);

export default StatsOverview;