import { useState } from 'react';
import './App.css';
import Attribute from './Attribute/Attribute';
import Stat from './Stat/Stat';

function App() {

  //basic stats
  const [str, setStr] = useState(15);
  const [agil, setAgil] = useState(15);
  const [will, setWill] = useState(15);
  const [know, setKnow] = useState(15);
  const [resource, setResource] = useState(15);
  //char stats
  const [hp, setHp] = useState(100);
  const [speed, setSpeed] = useState(300);
  const [action, setAction] = useState(0);
  const [cast, setCast] = useState(-25);
  const [equip, setEquip] = useState(0);
  const [reginter, setReginter] = useState(0);
  //bonuses
  const [buff, setBuff] = useState(0);
  const [phys, setPhys] = useState(0);
  const [magic, setMagic] = useState(0);
  //scalings
  //strength
  let hpScale = {0:3, 10:-1, 50:-1, 75:-0.5};
  let physScale = {0:10, 5:-5, 7:-2, 11:-1, 15:-1, 50:-0.5};
  //agility
  let speedScale = {0:2, 15:-1, 45:-0.5, 65:-0.17};
  let actionScale = {0:3, 10:-1, 13:-1, 25:0.5, 41:-0.5, 50:-0.5};
  let equipScale = {1:4, 2:3, 15:-2, 35:-3, 70:-1};
  //will
  let magicScale = {1:10, 5:-5, 15:-2, 25:-1, 40:-1, 50:-0.5};
  let buffScale = physScale;
  //knowledge
  let castScale = {1:5, 19:-2, 30:1, 40:-1, 45:-1};
  //resourcefulness
  let reginterScale = {0:5, 5:-2, 15:4, 25:-2, 35:-3, 84:-1, 85:2, 86:-1}
  //dependencies
  const dependencies = {
    hp: {scaler: hpScale, set: setHp, value: hp},
    phys: {scaler: physScale, set: setPhys, value: phys},

    speed: {scaler: speedScale, set: setSpeed, value: speed},
    action: {scaler: actionScale, set: setAction, value: action},
    equip: {scaler: equipScale, set: setEquip, value: equip},

    magic: {scaler: magicScale, set: setMagic, value: magic},
    buff: {scaler: buffScale, set: setBuff, value: buff},
    
    cast: {scaler: castScale, set: setCast, value: cast},

    reginter: {scaler: reginterScale, set: setReginter, value: agil*0.4 + resource*0.6},
  }


  
  function statColor(stat, number) {
    return stat==number ? 'gray' : stat>number ? 'green' : 'red';
  }


  function regInteraction({Agility=agil, Resourcefulness=resource}) {
    return Math.round(Agility*0.4 + Resourcefulness*0.6);
  }
  


  
  return (
    <>

      <div className='stats'>

        <Attribute name={'Strength'} value={str} 
          arrays={[[setStr, setHp, setPhys], [60, -80], [dependencies.hp, dependencies.phys]]} />

        <Attribute name={'Agility'} value={agil}
          arrays={[[setAgil, setSpeed, setAction, setEquip], [270, -38, -95], [dependencies.speed, dependencies.action, dependencies.equip]]}
          regInter={{value:regInteraction, sets:[setReginter], values:[-55], dep:[dependencies.reginter]}} />

        <Attribute name={'Will'} value={will}
          arrays={[[setWill, setBuff, setMagic], [-80, -90], [dependencies.buff, dependencies.magic]]} />

        <Attribute name={'Knowledge'} value={know}
          arrays={[[setKnow, setCast], [-93], [dependencies.cast]]} />

        <Attribute name={'Resourcefulness'} value={resource} arrays={[[setResource], [], []]} 
          regInter={{value:regInteraction, sets:[setReginter], values:[-55], dep:[dependencies.reginter]}} />


        <Stat name={'Health'} displayStat={Math.round(hp)} color={'black'} />

        <hr/>

        <Stat name={'Move speed'} 
          displayStat={`${Math.floor(speed)}(${Number.parseFloat((speed/300*100).toFixed(1))}%)`} 
          color={statColor(speed, 300)} />

        <Stat name={'Action Speed'} displayStat={`${action}%`} color={statColor(action, 0)} />

        <Stat name={'Spell Casting Speed'} displayStat={`${cast}%`} color={statColor(cast, 0)} />

        <Stat name={'Item Equip Speed'} displayStat={`${equip}%`} color={statColor(equip, 0)} />

        <Stat name={'Regular Interaction Speed'} displayStat={`${reginter}%`} color={statColor(reginter, 0)} />
        
        <Stat name={'Buff Duration'} displayStat={`${buff}%`} color={statColor(buff, 0)} />

        <br/>

        <Stat name={'Physical Power Bonus'} displayStat={`${phys}%`} color={statColor(phys, 0)} />

        <Stat name={'Magic Power Bonus'} displayStat={`${magic}%`} color={statColor(magic, 0)} />

      </div>

    </>
  )
}

export default App
