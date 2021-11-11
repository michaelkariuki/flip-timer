import React from "react";
//COMPONENTS
import StaticCard from './StaticCard';
import AnimatedCard from './AnimatedCard';


interface props {
    digit: number,
    shuffle: boolean,
    unit: string
}


const FlipUnitContainer: React.FunctionComponent<props> = (props) => {
    //assign digit values
    
    let currentDigit: (number | string) = props.digit;
    let nextDigit: (number | string) = props.digit+1;


    //To prevent a negative value
    if( props.unit !== 'hours'){
        nextDigit = nextDigit === -1
            ? 59
            : nextDigit;
    }else {
        nextDigit = nextDigit === -1
            ? 23
            : nextDigit;
    }

    if (currentDigit < 10){
        currentDigit = `0${currentDigit}`;
           
    }

    if(nextDigit < 10){
        nextDigit = `0${nextDigit}`;  
    }

 
    //shuffle digits
    //For a flip to happen, 
    //one digit has to true, the other false
    const digit1: (number | string) = props.shuffle
        ? nextDigit
        : currentDigit;   

    const digit2: (number | string) = !props.shuffle
        ? nextDigit
        : currentDigit;    
        


    const animation1: string = props.shuffle
        ? 'fold'
        : 'unfold';

    const animation2: string = !props.shuffle
        ? 'fold'
        : 'unfold';
        
    
    return(
        <div className='flipUnitContainer'>

            <StaticCard position={'upperCard'} digit={currentDigit.toString()} />  
            {
                nextDigit === 60?
                <StaticCard position={'lowerCard'} digit={'00'} />
                :
                <StaticCard position={'lowerCard'} digit={nextDigit.toString()} />
            }
            
            <AnimatedCard digit={digit1.toString()} animation={animation1} />
            {
                digit2 === 60?
                <AnimatedCard digit={'00'} animation={animation2} />
                :
                <AnimatedCard digit={digit2.toString()} animation={animation2} />
            }
            
        </div>
    );
}

export default FlipUnitContainer;





