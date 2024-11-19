import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  onAddExample
} from "../../features/exampleSlice";

const AgTable = ({ examples, newTableData }) => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([]);
  const [intialCol, setIntialCol] = useState(0);
  const dispatch = useDispatch()
  useEffect(() => {
    if (!examples) return;
    const col = examples[0]?.data?.map((item) => {
      return { field: item?.toLowerCase(), editable: true };
    });
    const rowDif = examples?.slice(1).map((subArray) =>
      subArray.data.reduce((acc, obj, index) => {
        return { ...acc, [examples[0].data[index]?.toLowerCase()]: obj };
      }, {})
    );
    setColDefs(col);
    setRowData(rowDif);
    setIntialCol(rowDif.length)
  }, [examples]);
  // Grid API and Column API references
  const gridRef = React.useRef(null);

  // Function to add a new row
  const addNewRow = () => {
    let newRow = {};
    for (const [key, value] of Object.entries(rowData[0])) {
      newRow[key] = "";
    }
    // Access the grid API and add the new row to the grid
    gridRef.current.api.applyTransaction({ add: [newRow] });
    setRowData((prv) => [...prv, newRow]);
  };
  // Handle cell value changes
  const onCellValueChanged = (event) => {
    const updatedRowData = [...rowData]; // Make a copy of the row data
    const { colDef, data } = event; // Get the column definition and updated row data
    const updatedRowIndex = updatedRowData.findIndex((row) => row === data); // Find the row that was edited

    if (updatedRowIndex !== -1) {
      updatedRowData[updatedRowIndex] = {
        ...updatedRowData[updatedRowIndex],
        ...data,
      }; // Update the edited row
    }
 
    if(updatedRowData.length === intialCol){
      console.log('updatedRowData', updatedRowData, intialCol)
      // dispatch(onExampleUpdate())
    }else{
      const lastLine = examples.length > 0 ? examples[examples.length - 1]?.lineNumber : 0;
        // Slice the updatedRowData from initialCol and map to create the new row structure
      const addNewRow = updatedRowData.slice(intialCol).map((row, index) => {
        return {
          data: Object.values(row), // Convert row object to an array of values
          lineNumber: Number(`${lastLine}.${index + 1}`), // Concatenate line number with the index
        };
      });
      newTableData(addNewRow)
    }
    // dispatch(handleExampleUpdate())
    setRowData(updatedRowData); // Update the state with the modified data
  };

  return (
    // wrapping container with theme & size
    <div className="w-full">
      {/* Button to add new row */}
      <div className="flex justify-end pb-2 gap-2">
        <button className="btn btn-sm" onClick={addNewRow}>
          Add
        </button>
        {/* <button disabled className="btn btn-sm  btn-primary" onClick={addNewRow}>Update</button> */}
      </div>
      <div
        className="ag-theme-quartz custom-scrollbar" // applying the Data Grid theme
        style={{ height: "auto", width: "auto" }}
      >
        <AgGridReact
          ref={gridRef} // Reference to access grid API
          rowData={rowData}
          columnDefs={colDefs}
          domLayout="autoHeight" // setting the grid to auto height
          onGridReady={(params) => {
            params.api.sizeColumnsToFit(); // auto size columns to fit the grid width
          }}
          onCellValueChanged={onCellValueChanged} // Event listener for cell value changes
        />
      </div>
    </div>
  );
};
export default AgTable;
