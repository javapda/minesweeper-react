import React from 'react';
import styles from './ControlPanel.module.css';
import logo from './bomb.svg';
import MyTimer from './MyTimer';

const FlagCounter = ({ flagCount = 10 }) => {
    return (
        <div onClick={() => { alert(`There are ${flagCount} flagged cells`) }} title="Flag counter" className={styles.flagCounter}>
            <img alt="Flag here" width="10" src={logo} />&nbsp;{flagCount}
        </div>
    );

};

const ControlPanel = ({ flagCount, active, resetHandler }) => {
    return (
        <div className={styles.controlPanel}>
            <h2>Minesweeper <img width="15" src={logo} className={styles.bombLogo} alt="logo" /></h2>
            <div>
                <FlagCounter flagCount={flagCount} />
                <MyTimer active={active} resetHandler={resetHandler}/>
            </div>
        </div>
    );
};

export default ControlPanel;
