// src/components/LocationManager.js
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from '../axiosConfig';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/Admin.css';


const LocationManager = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [changedData, setChangedData] = useState([]);
  const [originalData, setOriginalData] = useState({});
  

  useEffect(() => {
    axios.get('/locations/')
      .then(response => {
        setRowData(response.data);
        const originalDataMap = {};
        response.data.forEach(item => {
          originalDataMap[item.id] = { ...item }; // Clone the item
        });
        setOriginalData(originalDataMap);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });


  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  

  const onCellValueChanged = (params) => {
    params.data.isChanged = true;
    setRowData([...rowData]);
  
    setChangedData(prevState => {
      const updatedChanges = [...prevState];
      const existingChangeIndex = updatedChanges.findIndex(change => change.id === params.data.id);
  
      if (existingChangeIndex > -1) {
        updatedChanges[existingChangeIndex] = params.data;
      } else {
        updatedChanges.push(params.data);
      }
  
      return updatedChanges;
    });
  };
  

  const saveChanges = () => {
    const updatedRows = rowData.filter(row => row.isChanged);  // Filter only changed rows
    if (updatedRows.length > 0) {
      axios.post('/locations/update/', updatedRows)
        .then(response => {
          // Reset the isChanged flag for all rows
          const updatedRowData = rowData.map(row => {
            if (row.isChanged) {
              row.isChanged = false; // Reset the flag
            }
            return row;
          });
  
          setRowData(updatedRowData); // Update the state with reset flags
  
          // Create a detailed feedback message with only changed fields
          const details = updatedRows.map(row => {
            const changedFields = changedData.find(change => change.id === row.id);
  
            if (changedFields) {
              const fieldNames = Object.keys(changedFields)
                .filter(key => key !== 'id' && key !== 'isChanged' && row[key] !== originalData[row.id][key]) // Ensure we're comparing to original data
                .join(', ');
  
              return `ID: ${row.id}, Name: ${row.name}, Changed Fields: ${fieldNames}`;
            }
  
            return `ID: ${row.id}, Name: ${row.name}, Changed Fields: None`;
          }).join('<br>'); // Use <br> for line breaks in HTML
  
          setFeedbackMessage(`Changes saved successfully!<br>${details}`);
          setChangedData([]); // Clear the changed data array
          setTimeout(() => setFeedbackMessage(''), 5000);  // Clear message after 5 seconds
        })
        .catch(error => {
          setFeedbackMessage('Failed to save changes. Please try again.');
          console.error('Error saving changes:', error);
          setTimeout(() => setFeedbackMessage(''), 5000);  // Clear message after 5 seconds
        });
    } else {
      setFeedbackMessage('No changes to save.');
      setTimeout(() => setFeedbackMessage(''), 5000);
    }
  };
  
  
  
  

  const columnDefs = [
    { headerName: 'Name', field: 'name', editable: true },
    { headerName: 'Origin', field: 'origin', editable: true },
    { headerName: 'Category', field: 'category', editable: true },
    { headerName: 'City', field: 'city', editable: true },
    { headerName: 'Country', field: 'country', editable: true },
    { headerName: 'Image URL', field: 'image_url', editable: true },
  ];

  return (
    <div className="location-manager">
      <div className="grid-buttons">
        <button className="btn save-button" onClick={saveChanges}>Save</button>
        {feedbackMessage && (
        <div className="feedback-container">
          {feedbackMessage && (
            <div
              className="feedback-message"
              dangerouslySetInnerHTML={{ __html: feedbackMessage }}
            ></div>
          )}
        </div>       
      )}
      </div>

      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true }}
          onCellValueChanged={onCellValueChanged}
          rowSelection="multiple"
          enableRangeSelection={true}
        />
      </div>
    </div>
  );
};

export default LocationManager;
