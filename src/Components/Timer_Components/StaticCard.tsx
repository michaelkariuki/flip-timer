import * as React from 'react';

interface props {
    position: string,
    digit: string
}

const StaticCard: React.FunctionComponent<props> = ({position, digit}) => {
    return(
        <div className={position}>
          <span>{digit}</span>
        </div>
      );
};

export default StaticCard;
