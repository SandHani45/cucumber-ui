import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useEffect, useState } from "react";

const AgTable = ({examples}) => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([]);

  useEffect(()=>{
    if(!examples) return
    const col = examples[0]?.map(item=>{
      return  { field: item?.toLowerCase(), editable: true }
    })
    const rowDif = examples.slice(1).map(subArray =>
      subArray.reduce((acc, obj, index) => {
        return { ...acc, [examples[0][index]?.toLowerCase()]: obj };
      }, {})
    );
    setColDefs(col)
    setRowData(rowDif)
  },[examples])

  return (
    // wrapping container with theme & size
    <div className="w-full">
            <div
      className="ag-theme-quartz custom-scrollbar" // applying the Data Grid theme
      style={{ height: "auto", width: "auto" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        domLayout="autoHeight" // setting the grid to auto height
        onGridReady={(params) => {
          params.api.sizeColumnsToFit(); // auto size columns to fit the grid width
        }}
      />
    </div>
    </div>

  );
};
export default AgTable;
