const CellStatus = {
    // NOTE: these map to a style for the cell
    closed: "closed", // initial state of a cell - before any clicks
    opened: "opened", // cell that has nothing in it 
    flagged: "flagged", // marked by a right-click as probably having a mine
    fired: "fired", // mine discovered and exploded
};

export default CellStatus;