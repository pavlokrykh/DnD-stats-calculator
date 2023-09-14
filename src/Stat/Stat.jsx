import React from 'react';

export default function Stat({name, displayStat, color}) {
    return (
        <section className='stat-wrap'>
          <span className='stat-name'>{name}</span>
          <span className={`stat-number ${color}`}>
            {displayStat}
          </span>
        </section>
    );
}
