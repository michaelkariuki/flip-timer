//IMPORTS
import * as React from 'react';
//COMPONENTS
import FlipUnitContainer from './Timer_Components/FlipUnitContainer';
import TimerInput from './Timer_Components/TimerInput';


interface props {
}

interface state {
    time: tObj,
    seconds: number,
    shuffle: sObj
}

interface tObj {
    [h: string]: number,
    m: number,
    s: number
}

interface sObj {
    [h: string]: boolean,
    m: boolean,
    s: boolean,
}



export default class Timer2 extends React.Component<props, state> {
  timerId: (NodeJS.Timeout | number) = 0;

  constructor(props: props) {
    super(props);
    this.state = {
        time: {h: 0, m: 0, s: 0},
        seconds: 0,
        shuffle: {h: true, m: true, s: true}
    }
    
    this.handleClick = this.handleClick.bind(this);
    this.countDown = this.countDown.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.shuffleHandler = this.shuffleHandler.bind(this);
    this.inputCallback = this.inputCallback.bind(this);
  }

  componentDidMount() {
      let timeLeft = this.secondsToTime(this.state.seconds);
      this.setState({
          time: timeLeft
      })
  }

  countDown(): void{
      let timeLeft = this.state.seconds-1;
      let newShuffle = this.shuffleHandler(this.state.time , this.secondsToTime(timeLeft))

      this.setState(
        {
            seconds: timeLeft,
            time: this.secondsToTime(timeLeft),
            shuffle: newShuffle
        }
      )
     
      if(timeLeft == 0){
          clearInterval(Number(this.timerId));
      }
  }

  handleClick(): void{
      if(this.timerId == 0 && this.state.seconds > 0){
          this.timerId = setInterval(this.countDown, 1000);
      }
  }

  secondsToTime(s: number): tObj{
        let obj: tObj;
        let hr = Math.floor(s / (60 * 60));

        let m_sec = Math.floor(s % (60 * 60));
        let min = Math.floor(m_sec / 60);

        let s_sec = Math.floor(m_sec % 60)
        let sec = Math.ceil(s_sec)

        obj = {
            h: hr,
            m: min,
            s: sec
        }
        return obj;
  }

  shuffleHandler(prevTime: tObj, newTime: tObj): sObj{
        let resultObj = this.state.shuffle;

        for(const [key, val] of Object.entries(prevTime)){
            if(newTime[key] !== prevTime[key]){
                resultObj[key] = !resultObj[key];
            }
        }

        return resultObj
  }

  inputCallback(s: number): void{
    const timeLeft = this.secondsToTime(s)
    this.setState({
        seconds: s,
        time: timeLeft
    })
  }

  public render() {
    return (

        <div className=' body-container container-fluid vh-100 d-flex flex-column align-items-center justify-content-center'>
            <div>
                <div className="w-100 mb-5 d-flex  justify-content-end">
                    <TimerInput secondsCallback={this.inputCallback} />
                </div>

                <div className={' flipClock mb-5'}>
                    <FlipUnitContainer
                        unit={'hours'}
                        digit={this.state.time.h}
                        shuffle={this.state.shuffle.h}
                    />

                    <FlipUnitContainer
                        unit={'minutes'}
                        digit={this.state.time.m}
                        shuffle={this.state.shuffle.m}
                    />

                    <FlipUnitContainer
                        unit={'seconds'}
                        digit={this.state.time.s}
                        shuffle={this.state.shuffle.s}
                    />
                </div>
                
                <div className="w-100 d-flex  justify-content-center">
                    <button onClick={()=>this.handleClick()} type="button" className="btn btn-dark"> Start timer </button>
                </div>
            </div>
        </div>

    );
  }
}
