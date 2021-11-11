import {useState, FormEvent} from 'react';

export interface props {
    secondsCallback: Function,
}

interface time {
    [h: string]: number,
    m: number,
    s: number
}

export default function TimerInput (props: props) {
    const [time, setTime] = useState<time>({
        h: 0,
        m: 0,
        s: 0
    });


    const clickHanlder = () =>{
        props.secondsCallback(timeToSeconds(time))
    }

    const changeHandler = (e: FormEvent<HTMLInputElement>) => {
        const {value, name} = e.currentTarget;

        setTime(prev => (
            {
                ...prev,
                [name] : Number(value)
            }
        ));
    }

    const timeToSeconds = (t: time): number => {    
        const tList: number[] = [1, 60, 3600].reverse();
        let result = 0;

        Object.keys(t).forEach((val, idx) => {
            result += t[val] * tList[idx];
        })

        return result;
    }

  return (
    <div className="d-flex w-100">
        <div className="col-9 d-flex">
            <div className="mx-1 d-flex align-items-center">
                <label className="mx-1">H </label>
                <input className="timer-input" type='text' name='h' value={time.h} onChange={changeHandler}/>
            </div>
            <div className="mx-1 d-flex align-items-center">
                <label className="mx-1">M  </label>
                <input className="timer-input" type='text' name='m' value={time.m} onChange={changeHandler}/>
            </div>
            <div className="mx-1 d-flex align-items-center">
                <label className="mx-1">S </label>
                <input className="timer-input" type='text' name='s' value={time.s} onChange={changeHandler}/>
            </div>
        </div>
        <div className="col-3 d-flex justify-content-end">
            <button onClick={clickHanlder} type="button" className="btn btn-dark">set time</button>
        </div>
    </div>
  );
}
