'use client';

import React from 'react';

import { useState, useEffect } from 'react';
import { formatElapsedTime } from '../utils/game-utils';

type SearchGameChronometerProps = {
  time: Date;
};

const SearchGameChronometer = ({
  time,
}: SearchGameChronometerProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const startTimestamp = new Date(time).getTime();
      const difference = now - startTimestamp;
      setElapsedTime(difference);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>Temps écoulé : {formatElapsedTime(elapsedTime)}</p>
    </div>
  );
};

export default SearchGameChronometer;
