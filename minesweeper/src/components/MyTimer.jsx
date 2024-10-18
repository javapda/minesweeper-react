import React, { useEffect, useState } from 'react';
import styles from './MyTimer.module.css';
import smiley from './smiley.png';

const MyTimer = ({active=false, resetHandler=null}) => {
    // https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
    // console.log(`MyTimer CONSTRUCT, active=${active}`);

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(active);
    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setSeconds(0);
        setIsActive(false);
        if (resetHandler) {
            resetHandler();
        }
    }
    useEffect(() => {
        let interval = null;
        // console.log(`MyTimer in useEffect, isActive=${isActive}, seconds=${seconds}`);
        if (isActive) {
            //console.log(`isActive=${isActive}, DOing something with interval`);
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);
    const formatSeconds = (secs) => {
        secs = parseInt(secs);

        if (secs < 10) return `0:0${secs}`;
        if (secs < 60) return `0:${secs}`;
        let minutes = Math.floor(secs / 60);
        let seconds = secs - (minutes * 60);
        if (seconds < 10) return `${minutes}:0${seconds}`;
        if (seconds < 60) return `${minutes}:${seconds}`;
    };
    setTimeout(()=>setIsActive(active),1000);
    const ToggleButton = () => {
        return <button onClick={toggle} className={styles.toggleButton}>{isActive ? "Pause" : "Start"}</button>;
    }
    return (
        <>
            <img alt="Reset timer" title="Reset timer" onClick={reset} src={smiley} className={styles.resetSmiley} />
            <span style={{ marginLeft: 30 }} title="Timer">{formatSeconds(seconds)}</span>
            {/* <ToggleButton/> */}
        </>
    );
};

export default MyTimer;