import { useState } from 'react';
import './App.css';

function App() {
  const [str, setStr] = useState(15);
  const [hp, setHp] = useState(100);
  const [power, setPower] = useState(0);
  let hpScale = {0:3, 10:-1, 50:-1, 75:-0.5};
  let powerScale = {0:10, 5:-5, 7:-2, 11:-1, 15:-1, 50:-0.5};


  function strChange(value) {
    setStr(value);
    setHp(60);
    setPower(-80);

    for(let i=value; i>0; i--) {
      // HP
      for(let threshold of Object.keys(hpScale)) {
        if(i>Number(threshold)) {
          setHp(hp => hp + hpScale[threshold]);
        }
      }
      // Power Bonus 
      for(let threshold of Object.keys(powerScale)) {
        if(i>Number(threshold)) {
          setPower(power => power + powerScale[threshold]);
        }
      }
    }
  }

  


  return (
    <>

      <div className='stats'>

        <section className='stat-wrap'>
          <span className='stat-name'>Strength</span>
          <input 
            className='stat-number' 
            type='number' 
            min={0} max={100} maxLength="2" defaultValue={str}
            onChange={e => {
                strChange(Number(e.target.value));
                e.target.value.length > 2 ? e.target.value = 100 : 0;
              }
            }
            />
        </section>

        <section className='stat-wrap'>
          <span className='stat-name'>Health</span>
          <span className='stat-number'>{hp}</span>
        </section>

        <hr/>

        <section className='stat-wrap'>
          <span className='stat-name'>Physical power bonus</span>
          <span className='stat-number bonus'>{power}%</span>
        </section>

      </div>

    </>
  )
}

export default App
