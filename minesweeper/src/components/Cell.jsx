import React from 'react';
import styles from './Cell.module.css';
import CellStatus from './CellStatus';


const Cell = ({ cellInfo }) => {
    const { coordinates, leftClickHandler, rightClickHandler, status, marker='' } = cellInfo;
    const cellClickHandler = (event) => {
        leftClickHandler(coordinates);
    }
    const cellContextMenuHandler = (event) => {
        event.preventDefault();
        rightClickHandler(coordinates);
    };

    const cellStatusStyle = () => {
        switch (status) {
            case CellStatus.closed:
                return styles.closed;
            case CellStatus.flagged:
                return styles.flagged;
            case CellStatus.opened:
                return styles.opened;
            case CellStatus.fired:
                return styles.fired;
            default:
                return styles.closed;
                // throw `Unknown cell status '${status}'`;
        }
    };
    return (
        <div className={styles.cell + " " + cellStatusStyle()}
            onClick={cellClickHandler}
            onContextMenu={cellContextMenuHandler}
            title={coordinates}
            key={"Cell-" + coordinates} >{marker}</div>
    );
};

export default Cell;

