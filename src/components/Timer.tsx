import React from 'react';

export default function Timer({time}: any) {
    function getTime(time: number) {
        if (time < 60) {
            if (time<10) {
                return ':' + 0 + time;
            } 
            return ':' + time;
        } else {
            let minutes = Math.floor(time/60);
            let seconds = time%60;
            if (seconds<10) {
                return minutes + ':' + 0 + seconds;
            }
            return minutes + ':' + seconds;
        }
    }
    return (
        <div id="timer"> 
            <div> {getTime(time)} </div>
        </div>
    )
}