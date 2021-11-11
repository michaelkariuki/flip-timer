import React from "react";

interface props {
    animation: string,
    digit: string
}

const AnimatedCard: React.FunctionComponent<props> = ({animation, digit}) => {
    return(
        <div className={`flipCard ${animation}`}>
            <span>{digit}</span>
        </div>
    );
}

export default AnimatedCard;