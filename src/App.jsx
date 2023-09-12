import { useState } from 'react';
import './App.css';

function App() {
  const [str, setStr] = useState(15);
  const [hp, setHp] = useState(100);


  function valueCheck(value) {
    if (value <= 100) return true;
    else {
      alert('The stat should be less than 100!');
      return false;
    }
  }



  function strChange(value) {
    let prevValue = str;
    setStr(value);
    if (valueCheck(value)) {
      if (value > prevValue) {
        if (value <= 10)       setHp(hp => hp+3);
        else if (value <= 50)  setHp(hp => hp+2);
        else if (value <= 75)  setHp(hp => hp+1);
        else if (value <= 100) setHp(hp => hp+0.5);
      } else {
        if (value >= 75) setHp(hp => hp-0.5);
        else if (value >= 50)  setHp(hp => hp-1);
        else if (value >= 10)  setHp(hp => hp-2);
        else if (value >= 0)       setHp(hp => hp-3);
      }
    }
  }

  return (
    <>
      <div className='stat-wrap'>
        <div className='stat-name'>Strength</div>
        <input 
          className='stat-number' 
          type='number' 
          min={0} max={100} maxLength={2} defaultValue={str}
          onChange={e => strChange(Number(e.target.value))}/>
      </div>
      <div className='stat-wrap'>
        <div className='stat-name'>Health</div>
        <div className='stat-number'>{hp}</div>
      </div>
    </>
  )
}

export default App
