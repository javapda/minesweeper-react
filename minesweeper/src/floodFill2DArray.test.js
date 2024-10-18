import CellStatus from "./components/CellStatus";
import {
    array2DRect, clone2DArray, dump2DArray, print2DArray,
    isArray, isNotArray, isObject,
    floodFill2DArray, make2DArray,
    cellInfoMarkerValueAccessor,
    cellInfoisMineValueSetter,
    cellInfoIsMineValueSetter
} from "./myutils";

const array8x9CellInfo = make2DArray(8, 9,
    ({ row, col }) => {
        const res = {
            coordinates: `${col},${row}`,
            status: CellStatus.closed,
            marker: ' ',
            isMine: false,
            toString: () => {
                return `(${res.coordinates}:${res.isMine ? 'M' : '_'}:${res.marker}:${res.status})`;
            }

        };
        return res;
    }
);

test('flood cell info', () => {
    // print2DArray(array8x9CellInfo);
    // flood fill requires setting a marker and adjusting the status to CellStatus.opened
    // the marker will be either a number of nearby minds (e.g. 1, 5, 8), or a blank space ' '
    // NOTE: not sure what to do about cells that have been flagged (i.e. marked as suspected of being a mine)
    // debugger
    const myNewValueGenerator = ({ array2D, row, col }) => {
        return "MONKEY-TIME";
    };
    const fillValue = ' ';
    const array2D = [...array8x9CellInfo];
    cellInfoIsMineValueSetter(array2D[0][0], true);
    cellInfoIsMineValueSetter(array2D[2][2], true);
    cellInfoIsMineValueSetter(array2D[2][3], true);
    cellInfoIsMineValueSetter(array2D[2][4], true);
    cellInfoIsMineValueSetter(array2D[2][5], true);

    cellInfoIsMineValueSetter(array2D[3][2], true);
    cellInfoIsMineValueSetter(array2D[4][2], true);
    cellInfoIsMineValueSetter(array2D[5][2], true);

    cellInfoIsMineValueSetter(array2D[3][5], true);
    cellInfoIsMineValueSetter(array2D[4][5], true);

    cellInfoIsMineValueSetter(array2D[5][3], true);
    cellInfoIsMineValueSetter(array2D[5][4], true);
    cellInfoIsMineValueSetter(array2D[5][5], true);

    floodFill2DArray({
        valueAccessor: cellInfoMarkerValueAccessor,
        newValueGenerator: myNewValueGenerator,
        array2D: array8x9CellInfo,
        newValue: '@',
        expectedValue: fillValue,
        row: 1, // starting row
        col: 2, // starting column
        verbose: true
    });

});


// test('array2DRect', () => {
//     const rows = 10;
//     const cols = 10;
//     const fillValue = '0';
//     const arr2D = make2DArray(rows, cols, fillValue);
//     print2DArray(arr2D);
//     array2DRect({ array2D: arr2D, row: 3, col: 2, width: 5, height: 5, newValue: 'X' });
//     print2DArray(arr2D);
//     floodFill2DArray({ array2D: arr2D, newValue: '@', expectedValue: fillValue, row: 1, col: 2, verbose: true });
//     floodFill2DArray({ array2D: arr2D, newValue: ' ', expectedValue: fillValue, row: 4, col: 3, verbose: true });

// });
// test('floodFill2DArray with complex CellInfo data', () => {


// });
// test('floodFill2DArray', () => {
//     const rows = 3;
//     const cols = 3;
//     const fillValue = 'F';
//     const arr2D = make2DArray(rows, cols, fillValue);
//     // set mines
//     arr2D[0][0] = 'M';
//     arr2D[1][0] = 'M';
//     arr2D[1][1] = 'M';
//     arr2D[2][0] = 'M';

//     floodFill2DArray({ array2D: arr2D, expectedValue: fillValue, row: 1, col: 2, verbose: true });

// });
