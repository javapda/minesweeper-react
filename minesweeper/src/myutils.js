import CellStatus from "./components/CellStatus";

export const isArray = (arrayCandidate) => Array.isArray(arrayCandidate);
export const isNotArray = (arrayCandidate) => !isArray(arrayCandidate);
export const isObject = (objectCandidate) => typeof objectCandidate === 'object'
    && !Array.isArray(objectCandidate)
    && objectCandidate !== null;
export const isFunction = (functionCandidate) => functionCandidate && typeof functionCandidate === 'function';
export const isNotFunction = (functionCandidate) => !isFunction(functionCandidate);
export const is2DArray = (array2DCandidate) => {
    return isArray(array2DCandidate)
        && array2DCandidate.length > 0
        && !array2DCandidate.find(isNotArray);
};
export const isNot2DArray = (array2DCandidate) => !is2DArray(array2DCandidate);
export const array2DFlatten = (array2DCandidate) => {
    if (isNot2DArray(array2DCandidate)) {
        throw "array2DCandidate is NOT a 2-Dimensional array";
    }
    return array2DCandidate.flat(1);
};
export const array2DDimensions = (array2DCandidate) => {
    if (isNot2DArray(array2DCandidate)) throw 'array2DDimensions: provided object is not a 2-dimensional array'
    return {
        rows: array2DCandidate.length,
        cols: array2DCandidate[0].length
    };
};
export const array2DContainsCoordinates = ({ array2D, row, col, verbose = false }) => {
    const { rows, cols } = array2DDimensions(array2D);
    if (verbose) {
        console.log(`rows=${rows},cols=${cols}`);
    }
    return (row >= 0 && row < rows && col >= 0 && col < cols);
}

export const clone2DArray = (array2D) => JSON.parse(JSON.stringify(array2D));
export const make2DArray = (rows, cols, fillValue = 0) => {
    // fillValue is either a literal, an object, or a function
    // if it is a function, it will be called with the coordinates
    const arr =
        new Array(rows).fill(0).map((item, rowNum) => {
            return new Array(cols).fill(0)
                .map((_, colNum) =>
                    isNotFunction(fillValue) ? fillValue : fillValue({ row: rowNum, col: colNum }));
        })
    return arr;
};
const repeatPattern = (pattern, count = 1) => {
    let str = '';
    for (let i = 0; i < count; i++) {
        str += pattern;
    }
    return str;
}
export const nearbyMineCount = ({ cellInfoArray2D, row, col }) => {
    let count = 0;
    row = parseInt(row);
    col = parseInt(col);

    const isValidCell = ({ array2D, row, col }) => array2DContainsCoordinates({ array2D: array2D, col: col, row: row });
    // console.log(`row=${row}, col=${col}`);
    // console.log(`nw: ${isValidFillCell({ array2D: cellInfoArray2D, row: row - 1, col: col - 1 })}`)
    // console.log(`nw: ${isValidCell({ array2D: cellInfoArray2D, row: row - 1, col: col - 1 })}`)
    // nw
    if (isValidCell({ array2D: cellInfoArray2D, row: row - 1, col: col - 1 })) count += cellInfoArray2D[row - 1][col - 1].isMine ? 1 : 0;
    // n
    if (isValidCell({ array2D: cellInfoArray2D, row: row - 1, col: col })) count += cellInfoArray2D[row - 1][col].isMine ? 1 : 0;
    // ne
    if (isValidCell({ array2D: cellInfoArray2D, row: row - 1, col: col + 1 })) count += cellInfoArray2D[row - 1][col + 1].isMine ? 1 : 0;

    // west
    if (isValidCell({ array2D: cellInfoArray2D, row: row, col: col - 1 })) count += cellInfoArray2D[row][col - 1].isMine ? 1 : 0;
    // east
    if (isValidCell({ array2D: cellInfoArray2D, row: row, col: col + 1 })) count += cellInfoArray2D[row][col + 1].isMine ? 1 : 0;

    // sw
    if (isValidCell({ array2D: cellInfoArray2D, row: row + 1, col: col - 1 })) count += cellInfoArray2D[row + 1][col - 1].isMine ? 1 : 0;
    // s
    if (isValidCell({ array2D: cellInfoArray2D, row: row + 1, col: col })) count += cellInfoArray2D[row + 1][col].isMine ? 1 : 0;
    // se
    if (isValidCell({ array2D: cellInfoArray2D, row: row + 1, col: col + 1 })) count += cellInfoArray2D[row + 1][col + 1].isMine ? 1 : 0;


    return count;
};
export const cellInfoValueSetter = (cellInfo, key, newValue) => {
    switch (key) {
        case 'coordinates':
            cellInfo.coordinates = newValue;
            break;
        case 'isMine':
            cellInfo.isMine = newValue;
            break;
        case 'marker':
            cellInfo.marker = newValue;
            break;
        case 'status':
            cellInfo.status = newValue;
            break;
        default:
            throw `cellInfoValueSetter: unknown key '${key}'`
    }

};
export const cellInfoIsMineValueSetter = (cellInfo, newValue) => {
    cellInfoValueSetter(cellInfo, 'isMine', newValue);
}
export const cellInfoMarkerValueSetter = (cellInfo, newValue) => {
    cellInfoValueSetter(cellInfo, 'marker', newValue);
}
export const cellInfoStatusValueSetter = (cellInfo, newValue) => {
    cellInfoValueSetter(cellInfo, 'status', newValue);
}
export const cellInfoCompositeValueSetterMarkerStatus = (cellInfo, { marker, status }) => {
    // valueSetter, newValue
    cellInfoMarkerValueSetter(cellInfo, marker);
    cellInfoStatusValueSetter(cellInfo, status);
}
export const cellInfoValueAccessor = (cellInfo, key) => {
    switch (key) {
        case 'coordinates':
            return cellInfo.coordinates;
        case 'isMine':
            return cellInfo.isMine;
        case 'marker':
            return cellInfo.marker;
        case 'status':
            return cellInfo.status;
        default:
            throw `cellInfoValueAccessor: unknown key '${key}'`
    }
}
export const cellInfoCoordinatesValueAccessor = (cellInfo) => {
    return cellInfoValueAccessor(cellInfo, 'coordinates');
}
export const cellInfoStatusValueAccessor = (cellInfo) => {
    return cellInfoValueAccessor(cellInfo, 'status');
}
export const cellInfoIsMineValueAccessor = (cellInfo) => {
    return cellInfoValueAccessor(cellInfo, 'isMine');
}
export const cellInfoMarkerValueAccessor = (cellInfo) => {
    return cellInfoValueAccessor(cellInfo, 'marker');
}
const cellStatusValueAccessor = (cellInfo) => cellInfo
export const print2DArray = (array2D, printBoundary = false, valueAccessor = (obj) => obj) => {
    if (printBoundary) console.log(repeatPattern("=", 50));
    console.log(dump2DArray(array2D, valueAccessor));
    if (printBoundary) console.log(repeatPattern("*", 50));
};
export const dump2DArray = (array2D, valueAccessor = (obj) => obj) => {
    if (isNotArray(array2D)) {
        throw "dump2DArray, array2D is NOT an array";
    }
    let result = "";
    for (let row = 0; row < array2D.length; row++) {
        const arrRow = array2D[row];
        let rowResult = ""
        for (let col = 0; col < arrRow.length; col++) {
            rowResult += valueAccessor(arrRow[col]);
            // rowResult += arrRow[col];
            if (col < arrRow.length - 1) {
                rowResult += ' ';
            }
        }
        result += rowResult;
        if (row < array2D.length - 1) {
            result += "\n";
        }
    }
    return result;
};
export const floodFill2DArray = ({
    array2D,
    expectedValue = 'F',
    newValue = '-',
    col, row,
    verbose = false,
    newValueGenerator = ({ array2D, col, row }) => {
        console.log("Default newValueGenerator");
        return newValue;
    },
    valueSetter = ({ col, row }) => {
        console.log(`floodFill2DArray:valueSetter(${col},${row})`);
        array2D[row][col] = newValue;
    },
    valueAccessor = (cellInfo) => {
        console.log("YOU ARE HERE");
        return cellInfo;
    } }
) => {
    /**
     * array2D : the 2-dimensional array
     * value : the new value
     * expectedValue : the starting cell must have this value (or exception)
     * col : column number of the starting cell
     * row : row number of the starting cell
     * verbose : if true, show more information
     */
    // https://codeheir.com/2022/08/21/comparing-flood-fill-algorithms-in-javascript/
    const floodFunction = recursiveFill;
    if (verbose) {
        console.log("BEFORE")
        print2DArray(array2D);
    }
    // if (array2D[row][col] !== expectedValue) {
    //     throw `NO-FUNCTION:expected '${expectedValue}' but found '${array2D[row][col]}'`;
    // }
    // console.log(`valueAccessor(array2D[${row}][${col}])===>${valueAccessor(array2D[row][col])}<==`);
    const cell = array2D[row][col];
    console.log(`isCellInfo(cell): ${isCellInfo(cell)}`);
    console.log(`cell: ${cell}`);
    if (valueAccessor(cell) !== expectedValue) {
        
        

        // console.log(`BY-FUNCTION:expected '${expectedValue}' but found '${array2D[row][col]}', marker is ==>${array2D[row][col].marker}<==`);
        // console.log(`cell.marker===>${cell.marker}<==`);
        // console.log(`cellInfoMarkerValueAccessor(array2D[row][col])===>${cellInfoMarkerValueAccessor(array2D[row][col])}<==`);
        throw `BY-FUNCTION:expected '${expectedValue}' but found '${array2D[row][col]}', marker is ==>${array2D[row][col].marker}<==`;
    }

    // array2D[row][col] = newValue;
    // console.log(`col=${col}, row=${row}`);
    floodFunction({ newValueGenerator: newValueGenerator, valueSetter: valueSetter, valueAccessor: valueAccessor, array2D: array2D, col: col, row: row, expectedValue: expectedValue });
    // floodFunction({ newValueGenerator: newValueGenerator, valueSetter: valueSetter, valueAccessor: valueAccessor, array2D: array2D, col: col, row: row, expectedValue: expectedValue, newValue: newValue });
    if (verbose) {
        console.log("AFTER")
        print2DArray(array2D);
    }
};
export const isValidFillCell = ({
    valueAccessor = () => array2D[row][col],
    array2D, col, row, expectedValue }) => {
    // let isNotMine = isCellInfo(array2D[row][col]) ? !array2D[row][col].isMine : true;
    return array2DContainsCoordinates({ array2D: array2D, col: col, row: row })
        // && array2D[row][col] === expectedValue
        && valueAccessor(array2D[row][col]) === expectedValue
        && (isCellInfo(array2D[row][col]) ? !array2D[row][col].isMine : true)
        // && (isCellInfo(array2D[row][col]) ? !array2D[row][col].isMine : true)
        ;

};
export const array2DRect = ({ array2D, col, row, width, height, newValue = 'X' }) => {

    // horizontal
    console.log(`horizontal, width=${width}`);
    for (let i = 0; i < width; i++) {
        let y = row;
        const x = col + i;
        if (array2DContainsCoordinates({ array2D: array2D, row: y, col: x, })) {
            array2D[y][x] = newValue;
        }
        y = row + height - 1;
        if (array2DContainsCoordinates({ array2D: array2D, row: y, col: x, })) {
            array2D[y][x] = newValue;
        }
    }
    console.log(`vertical, height=${height}`);
    for (let i = 0; i < height; i++) {
        let x = col;
        const y = row + i;
        if (array2DContainsCoordinates({ array2D: array2D, row: y, col: x, })) {
            array2D[y][x] = newValue;
        }
        x = col + width - 1;
        if (array2DContainsCoordinates({ array2D: array2D, row: y, col: x, })) {
            array2D[y][x] = newValue;
        }
    }

};
const iterativeStackFloodFill = ({ array2D, col, row, expectedValue, newValue }) => {
    // Iterative stack flood fill

};
const isCellInfo = (candidate) => isObject(candidate) && candidate.coordinates != undefined;
const recursiveFill = (
    {
        newValueGenerator,
        valueSetter = ({ row, col, array2D, newValue }) => { array2D[row][col] = newValueGenerator({ array2D: array2D, row: row, col: col }) },
        valueAccessor, array2D, col, row, expectedValue, newValue
    }) => {
    // Stack-based recursive flood fill
    // 1. if node is not inside, return
    // 2. set the node to the new value
    // 3. perform flood-fill one step to south of node
    // 4. perform flood-fill one step to north of node
    // 5. perform flood-fill one step to west of node
    // 6. perform flood-fill one step to east of node
    // 7. return
    const value = valueAccessor({ array2D: array2D, row: row, col: col });
    if (!isValidFillCell({ array2D: array2D, col: col, row: row, valueAccessor: valueAccessor, expectedValue: expectedValue })) return;
    // array2D[row][col] = newValue;
    const fieldElement = array2D[row][col];
    
    if (isCellInfo(fieldElement)) {
        const cellInfo = fieldElement;
        const mineCount = nearbyMineCount({ cellInfoArray2D: array2D, row: row, col: col });
        const status = CellStatus.opened;
        cellInfoCompositeValueSetterMarkerStatus(cellInfo, { marker: mineCount > 0 ? mineCount : '  ', status: status });
    } else {
        valueSetter({ row: row, col: col, newValue: newValue, array2D: array2D });
    }
    recursiveFill({ valueAccessor: valueAccessor, valueSetter: valueSetter, array2D: array2D, col: col, row: row + 1, expectedValue, newValue }); // south
    recursiveFill({ valueAccessor: valueAccessor, valueSetter: valueSetter, array2D: array2D, col: col, row: row - 1, expectedValue, newValue }); // north
    recursiveFill({ valueAccessor: valueAccessor, valueSetter: valueSetter, array2D: array2D, col: col - 1, row: row, expectedValue, newValue }); // west
    recursiveFill({ valueAccessor: valueAccessor, valueSetter: valueSetter, array2D: array2D, col: col + 1, row: row, expectedValue, newValue }); // east

};

const MyUtils = {
    make2DArray: make2DArray,
    floodFill2DArray: floodFill2DArray,
    clone2DArray: clone2DArray,
    isArray: isArray,
    isNotArray: isNotArray,
    isObject: isObject,
    is2DArray: is2DArray,
    dump2DArray: dump2DArray

};

export default MyUtils;