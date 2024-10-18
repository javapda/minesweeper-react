import CellStatus from "./components/CellStatus";
import MyUtils, { cellInfoCompositeValueSetterMarkerStatus, cellInfoCoordinatesValueAccessor, cellInfoIsMineValueAccessor, cellInfoIsMineValueSetter, cellInfoMarkerValueAccessor, cellInfoMarkerValueSetter, cellInfoStatusValueAccessor, cellInfoStatusValueSetter, cellInfoValueSetter, nearbyMineCount, print2DArray } from "./myutils";
import {
    array2DFlatten,
    clone2DArray, array2DDimensions, array2DContainsCoordinates,
    dump2DArray,
    is2DArray, isNot2DArray,
    isArray, isNotArray,
    isFunction, isNotFunction,
    isObject,
    isValidFillCell,
    cellInfoValueAccessor,
    floodFill2DArray, make2DArray
} from "./myutils";
/**
 * npm run test -- MyUtils.test.js
 * https://jestjs.io/docs/expect
 */
const array3x3 = make2DArray(3, 3, 'X');
const array3x3CellInfo = make2DArray(3, 3,
    ({ row, col }) => {
        const res = {
            coordinates: `${col},${row}`,
            status: CellStatus.closed,
            marker: '',
            isMine: (col === 0 && row === 0),
            toString: () => {
                return `${res.coordinates}`;
            }

        };
        return res;
    }
);

test('nearbyMineCount', () => {
    const array2D = [...array3x3CellInfo]; // [...array3x3];
    array2D[0][0].isMine = true;
    array2D[0][1].isMine = true;
    array2D[0][2].isMine = true;

    array2D[1][0].isMine = true;
    array2D[1][2].isMine = true;

    array2D[2][0].isMine = true;
    array2D[2][1].isMine = true;
    array2D[2][2].isMine = true;

    console.log('2222222222222222222222222222222222222222222222');
    print2DArray(array2D, true, cellInfoIsMineValueAccessor);
    expect(nearbyMineCount({cellInfoArray2D:array2D, row:1, col:1})).toBe(8);
    console.log('2222222222222222222222222222222222222222222222');
});
test('cellInfoIsMineValueSetter',()=>{
    const cellInfo = {
        coordinates: `3,2`,
        status: CellStatus.closed,
        marker: ' ',
        isMine: false, //(col === 0 && row === 0),
    };
    cellInfoIsMineValueSetter(cellInfo, true);
    expect(cellInfoIsMineValueAccessor(cellInfo)).toBeTruthy();
    cellInfoIsMineValueSetter(cellInfo, false);
    expect(cellInfoIsMineValueAccessor(cellInfo)).toBeFalsy();

});
test('cellInfoMarkerValueSetter',()=>{
    const cellInfo = {
        coordinates: `3,2`,
        status: CellStatus.closed,
        marker: ' ',
        isMine: false, //(col === 0 && row === 0),
    };
    cellInfoMarkerValueSetter(cellInfo, 'JED');
    expect(cellInfoMarkerValueAccessor(cellInfo)).toBe('JED');

});
test('cellInfoStatusValueSetter',()=>{
    const cellInfo = {
        coordinates: `3,2`,
        status: CellStatus.closed,
        marker: ' ',
        isMine: false, //(col === 0 && row === 0),
    };
    cellInfoStatusValueSetter(cellInfo, CellStatus.opened);
    expect(cellInfoStatusValueAccessor(cellInfo)).toBe(CellStatus.opened);

});
test('cellInfoCompositeValueSetter',() => {
    const cellInfo = {
        coordinates: `3,2`,
        status: CellStatus.closed,
        marker: ' ',
        isMine: false, //(col === 0 && row === 0),
    };
    cellInfoCompositeValueSetterMarkerStatus(cellInfo, {marker:'Z',status:CellStatus.fired});
    expect(cellInfoMarkerValueAccessor(cellInfo)).toBe('Z');
    expect(cellInfoStatusValueAccessor(cellInfo)).toBe(CellStatus.fired);
});
test('cellInfoValueSetter', () => {
    const cellInfo = {
        coordinates: `3,2`,
        status: CellStatus.closed,
        marker: ' ',
        isMine: false, //(col === 0 && row === 0),
    };
    cellInfoValueSetter(cellInfo, 'status', CellStatus.fired);
    expect(cellInfoStatusValueAccessor(cellInfo)).toBe(CellStatus.fired);
    cellInfoValueSetter(cellInfo, 'isMine', true);
    expect(cellInfoIsMineValueAccessor(cellInfo)).toBeTruthy();
    cellInfoValueSetter(cellInfo, 'isMine', false);
    expect(cellInfoIsMineValueAccessor(cellInfo)).toBeFalsy();
    cellInfoValueSetter(cellInfo, 'coordinates', '85,66');
    expect(cellInfoCoordinatesValueAccessor(cellInfo)).toBe('85,66');
});
// test('cellInfoValueAccessor', () => {
//     const cellInfo = {
//         coordinates: `3,2`,
//         status: CellStatus.closed,
//         marker: ' ',
//         isMine: false, //(col === 0 && row === 0),
//     };
//     expect(cellInfoValueAccessor(cellInfo, "status")).toBe(CellStatus.closed);
//     expect(cellInfoValueAccessor(cellInfo, "marker")).toBe(' ');
//     expect(cellInfoValueAccessor(cellInfo, "isMine")).toBeFalsy();
// });
// test('cellInfoStatusValueAccessor', () => {
//     const cellInfo = {
//         coordinates: `3,2`,
//         status: CellStatus.closed,
//         marker: ' ',
//         isMine: false,
//     };
//     expect(cellInfoStatusValueAccessor(cellInfo)).toBe(CellStatus.closed);
// });
// test('cellInfoIsMineValueAccessor', () => {
//     const cellInfo = {
//         coordinates: `3,2`,
//         status: CellStatus.closed,
//         marker: ' ',
//         isMine: true,
//     };
//     expect(cellInfoIsMineValueAccessor(cellInfo)).toBeTruthy();
// });
// test('cellInfoMarkerValueAccessor', () => {
//     const cellInfo = {
//         coordinates: `3,2`,
//         status: CellStatus.closed,
//         marker: 'The-Marker',
//         isMine: true,
//     };
//     expect(cellInfoMarkerValueAccessor(cellInfo)).toBe('The-Marker');
// });
// test('cellInfoCoordinatesValueAccessor', () => {
//     const cellInfo = {
//         coordinates: `3,2`,
//         status: CellStatus.closed,
//         marker: 'The-Marker',
//         isMine: true,
//     };
//     expect(cellInfoCoordinatesValueAccessor(cellInfo)).toBe('3,2');
// });
// test('dump with functions', () => {
//     const cellsInfo2D =
//         make2DArray(3, 4,
//             ({ row, col }) => {
//                 const res = {
//                     coordinates: `${col},${row}`,
//                     // leftClickHandler: leftClickHandler,
//                     // rightClickHandler: rightClickHandler,
//                     status: Object.keys(CellStatus)[Math.floor(Math.random() * Object.keys(CellStatus).length)], // CellStatus.closed,
//                     marker: `JOHNNY:${col}:${row}`,
//                     isMine: (col % 2 == 0),
//                     toString: () => {
//                         return `${res.coordinates}`;
//                     }

//                 };
//                 return res;
//             }
//         );

//     console.log('8888888888888888888888888888888888888888888888');
//     print2DArray(cellsInfo2D, false, cellInfoIsMineValueAccessor);
//     print2DArray(cellsInfo2D, false, cellInfoCoordinatesValueAccessor);
//     print2DArray(cellsInfo2D, false, cellInfoStatusValueAccessor);
//     print2DArray(cellsInfo2D, false, cellInfoMarkerValueAccessor);
//     console.log('8888888888888888888888888888888888888888888888');

// });
// test('isValidFillCell', () => {
//     // isValidFillCell({ valueAccessor: valueAccessor, array2D, col, row, expectedValue })
//     const arr2d = make2DArray(33, 17, 'X');
//     expect(isValidFillCell(
//         {
//             array2D: arr2d, row: 0, col: 0,
//             valueAccessor: ({ row, col }) => (arr2d[row][col]),
//             expectedValue: "X"
//         })).toBeTruthy();
//     expect(false).toBeFalsy();
//     expect(isValidFillCell(
//         {
//             array2D: arr2d, row: -1, col: 0,
//             valueAccessor: ({ row, col }) => (arr2d[row][col]),
//             expectedValue: "X"
//         })).toBeFalsy();

// });
// test('array2DFlatten', () => {
//     const flat = array2DFlatten(array3x3);
//     expect(flat.length).toBe(9);
//     expect(array2DFlatten([[]]).length).toBe(0);
//     expect(array2DFlatten([[], ["something"], []]).length).toBe(1);
// });

// test('isFunction', () => {
//     expect(isFunction(() => { })).toBeTruthy();
//     expect(isFunction(null)).toBeFalsy();
// });

// test('isNotFunction', () => {
//     expect(isNotFunction(null)).toBeTruthy();
//     expect(isNotFunction(() => { })).toBeFalsy();
// });

// test('array2DContainsCoordinates', () => {
//     expect(array2DContainsCoordinates({ array2D: array3x3, row: 0, col: 0 })).toBeTruthy();
//     expect(array2DContainsCoordinates({ array2D: array3x3, row: -1, col: 0 })).toBeFalsy();
//     expect(array2DContainsCoordinates({ array2D: array3x3, row: 0, col: -3 })).toBeFalsy();
//     expect(array2DContainsCoordinates({ array2D: array3x3, row: 3, col: 0 })).toBeFalsy();
//     expect(array2DContainsCoordinates({ array2D: array3x3, row: 0, col: 45 })).toBeFalsy();
// });

// test('array2DDimensions', () => {
//     expect(array2DDimensions(array3x3).rows).toBe(3);
//     expect(array2DDimensions(array3x3).cols).toBe(3);
//     expect(array2DDimensions([[1, 2]]).rows).toBe(1);
//     expect(array2DDimensions([[1, 2]]).cols).toBe(2);
// });
// test('is2DArray', () => {
//     expect(is2DArray(array3x3)).toBeTruthy();
//     expect(is2DArray([[1, 23]])).toBeTruthy();
//     expect(is2DArray([[1, 23], "BOGUS"])).toBeFalsy();
// });
// test('isNot2DArray', () => {
//     expect(isNot2DArray(3)).toBeTruthy();
//     expect(isNot2DArray([])).toBeTruthy();
//     expect(isNot2DArray([333])).toBeTruthy();
//     expect(isNot2DArray([54, [4, 3]])).toBeTruthy();
// });


// test('isObject', () => {
//     expect(isObject(null)).toBeFalsy();
//     expect(isObject(3)).toBeFalsy();
//     expect(isObject("TEST")).toBeFalsy();
//     expect(isObject(() => console.log("testing"))).toBeFalsy();
//     expect(isObject([])).toBeFalsy();
//     expect(isObject([1, 2, 3])).toBeFalsy();
//     expect(isObject({})).toBeTruthy();
//     expect(isObject({ name: "some-name" })).toBeTruthy();
// });

// test('clone2DArray', () => {
//     const rows = 3;
//     const cols = 4;
//     const fillValue = { name: "Wilma" };
//     const arr2D = make2DArray(rows, cols, fillValue);
//     const arr2DCopy = clone2DArray(arr2D);
//     expect(arr2D).toMatchObject(arr2DCopy);
//     console.log(dump2DArray(arr2DCopy));
// });

// test('make2DArray with complex object', () => {
//     const cellsInfo2D =
//         make2DArray(10, 15,
//             ({ row, col }) => {
//                 const res = {
//                     coordinates: `${col},${row}`,
//                     // leftClickHandler: leftClickHandler,
//                     // rightClickHandler: rightClickHandler,
//                     // status: CellStatus.closed,
//                     marker: '',
//                     isMine: (col === 0 && row === 0),
//                     toString: () => {
//                         return `${res.coordinates}`;
//                     }

//                 };
//                 return res;
//             }
//         );

//     print2DArray(cellsInfo2D);
//     // const copy = clone2DArray(cellsInfo2D);

// });
// test('make2DArray with function', () => {
//     const rows = 3;
//     const cols = 4;
//     const fillValue = "X";
//     const arr2D =
//         make2DArray(rows, cols,
//             ({ row, col }) => `${row},${col}`
//         );
//     print2DArray(arr2D);
// });

// test('make2DArray with literal', () => {
//     const rows = 3;
//     const cols = 4;
//     const fillValue = "X";
//     const arr2D = make2DArray(rows, cols, fillValue);

//     expect(arr2D);
//     expect(isArray(arr2D)).toBeTruthy();
//     expect(arr2D.length).toBe(rows);
//     expect(arr2D[0].length).toBe(cols);
//     // console.log(MyUtils.dump2DArray(arr2D));

// });

// test('test dump2DArray', () => {

//     let items = [
//         [1, 2],
//         [3, 4],
//         [5, 6]
//     ];
//     expect(dump2DArray(items)).toBe("1 2\n3 4\n5 6");

// });

// test('isArray', () => {
//     expect(isArray([])).toBeTruthy();
//     expect(isArray([1, "other", true])).toBeTruthy();
//     expect(isArray(() => { })).toBeFalsy();
//     expect(isArray("JED")).toBeFalsy();
// });
// test('isNotArray', () => {
//     expect(isNotArray([])).toBeFalsy();
//     expect(isNotArray(() => { })).toBeTruthy();
//     expect(isNotArray("JED")).toBeTruthy();
// });

// // test MyUtils - anchored/attached functions

// test('MyUtils.isArray', () => {
//     expect(MyUtils.isArray([])).toBeTruthy();
//     expect(MyUtils.isArray("JED")).toBeFalsy();
// });
// test('MyUtils.isNotArray', () => {
//     expect(MyUtils.isNotArray([])).toBeFalsy();
//     expect(MyUtils.isNotArray("JED")).toBeTruthy();
// });

// test('copy object with function', () => {
//     const first = { one: 1, two: "two", three: true, doSomething: () => "MONKEY", toString: () => `${first.one}:${first.two}:${first.three}` };
//     const second = Array.from(first);
//     const third = { ...first, one: "HUNDRED" };
//     second.toString = first.toString;
//     // console.log(`first==>${first}`);
//     // console.log(`second==>${second}`);
//     // console.log(JSON.stringify(third));
//     // console.log(third.doSomething())
// });