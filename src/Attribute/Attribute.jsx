import React from 'react';

export default function Attribute({name, value, arrays: [setsArray, valuesArray, depArray], regInter=false}) {
    
    //scale function
    function scale(scaler, func, v, i) {
        for(let threshold of Object.keys(scaler)) {
            if(i>Number(threshold)) {
                func(v => v + scaler[threshold]);
            }
        }
    }

    //change corelated stats function
    function changeStats(value, setsArray, valuesArray, dep) {
        for(let [i, func] of setsArray.entries()) func(valuesArray[i]);
        
        for(let i=value; i>0; i--) {
            for(let d of dep) {
                scale(d.scaler, d.set, d.value, i);
            }
        }
    }


    return (
        <section className='stat-wrap'>
            <span className='stat-name'>{name}</span>
            <input 
                className='stat-number' 
                type='number' 
                min={0} max={100} maxLength="2" defaultValue={value}
                onChange={e => {
                    let val = e.target.value;
                    changeStats(val, setsArray,[val, ...valuesArray], depArray);
                    val.length > 2 ? e.target.value = 100 : 0;
                    if(regInter) changeStats(regInter.value({[`${name}`]:val}), regInter.sets, regInter.values, regInter.dep);
                  }
                }
            />
        </section>
    );
}
