import { useState } from 'react';
import './App.css';

function App() {
  //basic stats
  const [str, setStr] = useState(15);
  const [agil, setAgil] = useState(15);
  //char stats
  const [hp, setHp] = useState(100);
  const [speed, setSpeed] = useState(300);
  const [equip, setEquip] = useState(0);
  //bonuses
  const [power, setPower] = useState(0);
  //scalings
  let hpScale = {0:3, 10:-1, 50:-1, 75:-0.5};
  let powerScale = {0:10, 5:-5, 7:-2, 11:-1, 15:-1, 50:-0.5};
  let speedScale = {0:2, 15:-1, 45:-0.5, 65:-0.17};
  let equipScale = {1:4, 2:3, 15:-2, 35:-3, 70:-1};


  //scale function
  function scale(scaler, func, v, i) {
    for(let threshold of Object.keys(scaler)) {
      if(i>Number(threshold)) {
        func(v => v + scaler[threshold]);
      }
    }
  }


  function strChange(value) {
    setStr(value);
    setHp(60);
    setPower(-80);

    for(let i=value; i>0; i--) {
      // HP
      scale(hpScale, setHp, hp, i);
      // Power Bonus 
      scale(powerScale, setPower, power, i);
    }
  }

  function agilChange(value) {
    setAgil(value);
    setSpeed(270);
    setEquip(-95);

    for(let i=value; i>0; i--) {
      //Move Speed
      scale(speedScale, setSpeed, speed, i);
      //Item Equip Speed
      scale(equipScale, setEquip, equip, i);
    }
    setSpeed(speed => Math.floor(speed));

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
          <span className='stat-name'>Agility</span>
          <input 
            className='stat-number' 
            type='number' 
            min={0} max={100} maxLength="2" defaultValue={agil}
            onChange={e => {
                agilChange(Number(e.target.value));
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
          <span className='stat-name'>Move speed</span>
          <span className={`stat-number ${speed>=300 ? 'bonus' : 'red'}`}>
            {speed}({Number.parseFloat((speed/300*100).toFixed(1))}%)
          </span>
        </section>

        <section className='stat-wrap'>
          <span className='stat-name'>Item Equip Speed</span>
          <span className={`stat-number ${equip>=0 ? 'bonus' : 'red'}`}>{equip}%</span>
        </section>

        <section className='stat-wrap'>
          <span className='stat-name'>Physical power bonus</span>
          <span className={`stat-number ${power>=0 ? 'bonus' : 'red'}`}>{power}%</span>
        </section>

      </div>

    </>
  )
}

export default App
