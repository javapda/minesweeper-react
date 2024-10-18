import React, { useRef, useEffect, useState } from 'react';
import Cell from './Cell';
import ControlPanel from './ControlPanel';
import CellStatus from './CellStatus';
import styles from './Minesweeper.module.css';
// import { TagCloud } from 'react-tagcloud';
import { array2DFlatten, cellInfoMarkerValueAccessor, floodFill2DArray, isNot2DArray, make2DArray, nearbyMineCount, print2DArray } from '../myutils';

const Field = ({ cellsInfo, cellsInfo2D = cellsInfo }) => {
    if (isNot2DArray(cellsInfo2D)) {
        throw `Expected a 2D Array for cellsInfo in 'Field' component`;
    }

    const cellsInfoFlat = array2DFlatten(cellsInfo2D);
    console.log(`cellsInfoFlat has ${cellsInfoFlat.length} elements`);
    return (
        <div key="minesweeper-field" className={styles.field}>
            {array2DFlatten(cellsInfo2D).map(cellInfo => {
                const cell = <Cell key={cellInfo.coordinates} cellInfo={cellInfo} />;
                return cell;
            })}
        </div>
    );

}
const createCellsInfo = (cols, rows, leftClickHandler, rightClickHandler) => {
    const cellsInfo = [];
    const cellsInfo2D =
        make2DArray(rows, cols,
            ({ row, col }) => {
                const res = {
                    coordinates: `${col},${row}`,
                    leftClickHandler: leftClickHandler,
                    rightClickHandler: rightClickHandler,
                    status: CellStatus.closed,
                    marker: ' ',
                    isMine: false, //(col === 0 && row === 0),
                    toString: () => {
                        return `${res.coordinates}`;
                    }

                };
                return res;
            }
        );


    print2DArray(cellsInfo2D, true);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let cellInfo = {
                coordinates: `${col},${row}`,
                leftClickHandler: leftClickHandler,
                rightClickHandler: rightClickHandler,
                status: CellStatus.closed,
                marker: '',
                isMine: (col === 0 && row === 0)
            };
            cellsInfo.push(cellInfo);
        }
    }
    return cellsInfo2D; // cellsInfo;
}
const FocusInput = () => {
    // https://hyperskill.org/learn/step/42184
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.scrollIntoView();
        inputRef.current.focus();
    }, []);
    return (
        <input ref={inputRef} />
    );

};
const MeasureElement = () => {
    // create a ref to store reference to the DOM element
    const elementRef = useRef();

    const measureElement = () => {
        const height = elementRef.current.clientHeight;
        const width = elementRef.current.clientWidth;
        console.log(`height: ${height}px, width=${width}px`);
    };

    return (
        <div ref={elementRef}>
            <p>this is a div element</p>
            <button onClick={measureElement}>Measure</button>
        </div>
    );

};
const MeasureWindow = () => {
    // https://hyperskill.org/learn/step/39232
    const windowWidthRef = useRef(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            windowWidthRef.current = window.innerWidth;
        };
        window.addEventListener('resize', handleResize);
        return () => {
            // cleanup here
            window.removeEventListener('resize', handleResize);
        }

    }, []);
    return (
        <div>
            <p>Window Width: {windowWidthRef.current}px</p>
        </div>
    );

};
function Message() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const timerId = setTimeout(() => {
            setMessage('Stay tuned and subscribe to the newsletter!');
        }, 3000);

        return () => clearTimeout(timerId);

    }, []);

    return <div>{message ? message : 'Message will appear in 3 seconds...'}</div>;
}
const MessageIntervaled = ({ seconds = 5 }) => {
    const [timer, setTimer] = useState(5);
    useEffect(() => {
        if (timer === 0) return;
        const timerId = setInterval(() => {
            setTimer(timer - 1);
        }, 1000)
        // clean up method is returned next
        return () => clearInterval(timerId);
    }, [timer]);

    return (
        <div>
            <h1>Time left to submit the answer: {timer}</h1>
            <button disabled={timer === 0 ? true : false}>Submit answer</button>
        </div>
    )

};
function Cats() {
    const [cats, setCats] = useState([]);
    const [isNew, setIsNew] = useState(false);

    const getNewCats = () => {
        setIsNew(!isNew)
    };

    useEffect(() => {
        fetchCats();
    }, [isNew]);


    const fetchCats = async () => {
        // https://thecatapi.com/
        // https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
        const limit = 3;
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}`);
        const data = await response.json();
        setCats(data);
    };

    useEffect(() => {
        fetchCats();
    }, []);

    return (
        <div>
            <p>
                <button type="button" title="Click to get New Cats" onClick={getNewCats}>New cats</button>
            </p>
            {cats &&
                cats.map((cat) => (
                    <img src={cat.url} key={cat.id} width="300px" height="300px" />

                ))}
        </div>
    );
}

const Posts = () => {
    // https://hyperskill.org/learn/step/38773
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
                const jsonData = await response.json();
                setPosts(jsonData);
            } catch (error) {
                console.error(`Error fetching data: `, error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};
const data = [
    { value: 'JavaScript', count: 38 },
    { value: 'React', count: 30 },
    { value: 'Nodejs', count: 28 },
    { value: 'Express.js', count: 25 },
    { value: 'HTML5', count: 33 },
    { value: 'MongoDB', count: 18 },
    { value: 'CSS3', count: 20 },
];
const SimpleCloud = () => {
    // https://madox2.github.io/react-tagcloud/
    const data = [
        { value: 'jQuery', count: 25 },
        { value: 'MongoDB', count: 18 },
        { value: 'JavaScript', count: 38 },
        { value: 'React', count: 30 },
        { value: 'Nodejs', count: 28 },
        { value: 'Express.js', count: 25 },
        { value: 'HTML5', count: 33 },
        { value: 'CSS3', count: 20 },
        { value: 'Webpack', count: 22 },
        { value: 'Babel.js', count: 7 },
        { value: 'ECMAScript', count: 25 },
        { value: 'Jest', count: 15 },
        { value: 'Mocha', count: 17 },
        { value: 'React Native', count: 27 },
        { value: 'Angular.js', count: 30 },
        { value: 'TypeScript', count: 15 },
        { value: 'Flow', count: 30 },
        { value: 'NPM', count: 11 },
    ];
    return (
        <>
            {/* <TagCloud
                minSize={12}
                maxSize={35}
                tags={data}
                className="simple-cloud"
                onClick={(tag) => alert(`'${tag.value}' [${tag.count}] was selected!`)}
            /> */}
        </>
    )
};
const Minesweeper = ({ cols = 8, rows = 9 }) => {
    const numberOfFlags = Math.floor(0.2 * cols * rows);
    const [flagCount, setFlagCount] = useState(numberOfFlags);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        document.title = "MineSweeper (c) 2024";
    }, []);
    const findCellInfo = (cellInfoArray2D, coords) => {
        const [col, row] = coords.split(",");
        console.log(`findCellInfo, coords=${coords}, col=${col}, row=${row}`);
        //return cellInfoArray.filter((cellInfo) => cellInfo.coordinates === coords)[0];
        return cellInfoArray2D[row][col];
    };
    const minesweeperInfo = {
        active: isActive
    };
    useEffect(() => {
        console.log(`MINESWEEPER use effect on isActive, isActive=${isActive}`);
    }, [isActive]);
    const setMineLocations = (cellInfos, excludeCoordinates, numberOfMines) => {
        const randomLocation = (cols, rows) => {
            let randCol = Math.floor(Math.random() * (cols));
            let randRow = Math.floor(Math.random() * (rows));
            return `${randCol},${randRow}`;
        };
        const arrayContainsObj = (array, obj) => {
            return array.find((item, _) => item === obj);
        }
        const mineLocations = [];
        while (mineLocations.length < numberOfMines) {
            const loc = randomLocation(cols, rows);
            if (loc !== excludeCoordinates && !arrayContainsObj(mineLocations, loc)) {
                mineLocations.push(loc);
            }
        }
        mineLocations.forEach((loc) => {
            console.log(`MINE LOCATION: ${loc}`);
            findCellInfo(cellInfos, loc).isMine = true
        });

    };

    const setConnectedCells = (cellInfos, loc) => {
        console.log(`setConnectedCells: loc=${loc}`);
        let cis = [...cellsInfo];
        // find and mark connected cells
        // when setting on the flood we adjust the status and mark
        // the cell with either and empty space ' ', or the number
        // of nearby mines (1-8)
        //floodFill2DArray({ array2D:cis, expectedValue : CellStatus.closed, newValue = '-', col, row, verbose = false });
        const [col, row] = loc.split(",").map(Number);
        const myNewValueGenerator = ({ array2D, row, col }) => {
            return "MONKEY-TIME";
        };
        const fillValue = ' ';
        // NOTE: if first cell has nearby mines, set the number of mines and
        // skip the flood fill operation
        const mines = nearbyMineCount({ cellInfoArray2D: cellInfos, row: row, col: col });
        // alert(`setConntectedCells, mines: ${mines}`);
        if (mines > 0) {
            const cell = cellInfos[row][col];
            cell.marker = '' + mines;
            cell.status = CellStatus.opened;
            return;
        }


        floodFill2DArray({
            valueAccessor: cellInfoMarkerValueAccessor,
            newValueGenerator: myNewValueGenerator,
            array2D: cis,
            newValue: '@',
            expectedValue: fillValue,
            row: row, // starting row
            col: col, // starting column
            verbose: true
        });
    };
    const anyCellsClosed = (cis) => {
        return array2DFlatten(cis).find((cell) => cell.status === CellStatus.closed);
    };
    const anyCellsFired = (cis) => {
        return array2DFlatten(cis).find((cell) => cell.status === CellStatus.fired);
    };
    const countOpenedCells = (cis) => {
        return array2DFlatten(cis).filter((cell) => cell.status === CellStatus.opened).length
    };
    const countFiredCells = (cis) => {
        return array2DFlatten(cis).filter((cell) => cell.status === CellStatus.fired).length
    };
    const userWon = (cis) => {
        // all cells not closed 
        return !anyCellsClosed(cis) && !anyCellsFired(cis);
    };

    const leftClickHandler = (coordinates) => {
        console.log(`left click handler, coordinates=${coordinates}, isActive=${isActive}, minesweeperInfo.active=${minesweeperInfo.active}`);
        if (!minesweeperInfo.active) {
            minesweeperInfo.active = true;
            console.log(`minesweeperInfo.active time: ${minesweeperInfo.active}`);
            // so we are starting a new game here
            // we will exclude the currently selected/clicked entry
            setTimeout(() => setIsActive(true), 0);
            // establish the mines in the field 
            let cis = [...cellsInfo];
            // set the mine locations, exclude the current one
            findCellInfo(cis, coordinates).status = CellStatus.opened;
            setMineLocations(cis, coordinates, numberOfFlags);

            console.log(`next is setConnectedCells for ${coordinates}`);
            setConnectedCells(cis, coordinates);
            print2DArray(cis, true);
            setCellsInfo(cis);
            return;

        }
        let cis = [...cellsInfo];
        //let found = cis.filter((cellInfo) => cellInfo.coordinates === coordinates)[0];
        let found = findCellInfo(cis, coordinates);
        if (found) {
            if (found.status === CellStatus.closed) {
                if (found.isMine) {
                    // found.status = CellStatus.fired;
                    // setCellsInfo(cis);
                    setIsActive(false);
                    const showAllMinesNotFlagged = (cis) => {
                        array2DFlatten(cis).forEach((cell) => {
                            if (cell.isMine && cell.status !== CellStatus.flagged) {
                                cell.status = CellStatus.fired;
                            }
                        });
                    };
                    showAllMinesNotFlagged(cis);
                    console.log("You exploded, better luck next time");
                } else {
                    found.status = CellStatus.opened;

                    setConnectedCells(cis, coordinates);
                    setCellsInfo(cis);
                }
            }
            if (userWon(cis)) {
                setIsActive(false);
                alert(`Congratulations, you Won! There were ${numberOfFlags} mines.`);
            }
        }

    };
    /**
     * user wants to mark cell as flagged
     */
    const rightClickHandler = (coordinates) => {
        if (!minesweeperInfo.active) {
            alert("Game has not started yet, please left-click a cell to begin");
            return
        }
        // console.log(`right click handler, coordinates=${coordinates}`);
        // find the proper, cellInfo - if it is closed (initial state) - change the state and update the counter
        if (flagCount <= 0) {
            console.log(`You have used up all your flags, flagCount=${flagCount}`)
            return;
        }
        let cis = [...cellsInfo];
        //let found = cis.filter((cellInfo) => cellInfo.coordinates === coordinates)[0];
        let found = findCellInfo(cis, coordinates);
        if (found) {
            // console.log(`we found it: ${Object.keys(found)}\nstatus=${found.status}`);
            console.log(`we found it: ${Object.keys(found)}\nstatus=${found.status},coordinates=${found.coordinates},isMine=${found.isMine}`);
            if (found.status === CellStatus.closed) {
                found.status = CellStatus.flagged;
                setCellsInfo(cis);
                setFlagCount(prevFlagCount => {
                    return (prevFlagCount > 0) ? prevFlagCount - 1 : 0;
                });
            }
        }
        if (userWon(cis)) {
            setIsActive(false);
            alert(`Congratulations, you Won! There were ${numberOfFlags} mines.`);
        }

    };

    const resetHandler = () => {
        console.log("Resetting Minesweeper");
        let cis = [...cellsInfo];
        cis.forEach(ci => {
            ci.status = CellStatus.closed;
            ci.isMine = false;
        });
        minesweeperInfo.active = false;
        setFlagCount(numberOfFlags);
        setCellsInfo(cis);

    };
    const initialCellsInfo = createCellsInfo(cols, rows, leftClickHandler, rightClickHandler);
    const [cellsInfo, setCellsInfo] = useState(initialCellsInfo)
    return (
        <div id='minesweeper' className={styles.minesweeper}>
            <ControlPanel resetHandler={resetHandler} flagCount={flagCount} active={isActive} />
            <Field
                cols={cols}
                rows={rows}
                cellsInfo={cellsInfo}
            />
            {/* <div>
                <SimpleCloud />
                <p><FocusInput /></p>
                <Posts />
                <MeasureElement />
                <MeasureWindow />
                <Message />
                <MessageIntervaled />
                <Cats />
            </div> */}
        </div>
    );

};

export default Minesweeper;