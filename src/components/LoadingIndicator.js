import React from 'react';

const LoadingIndicator = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }} width="210px" height="210px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="43.4381" r="5" fill="#5c5be1">
                <animate attributeName="cy" dur="2.7777777777777777s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9" keyTimes="0;0.5;1" values="15;85;15"></animate>
            </circle>
        </svg>
    )
}
export default LoadingIndicator;