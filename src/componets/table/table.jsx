import React from "react";
import { Table } from "react-bootstrap";
import "./table.css"

const TableComponent = ({ headerData, tableData }) => {

    function getTableCellValue(value) {
        if(typeof value === 'string' && value.includes('http')){
            return <div className="imgTable"><img src={value} /></div>
        }
        return value;
    }

    function buildBody() {
        return tableData.map((dataObj, index) => {
            return <tr key={'CustomTable' + index}>
            {Object.values(dataObj)
            .map((dataValue, index) => <td key={dataValue + index}>{getTableCellValue(dataValue)}</td>)}
            </tr>
        })
    }
  return (
    <Table striped bordered hover variant="dark" responsive>
      <thead>
        <tr>
          {headerData.map((th) => (
            <th key={th}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {buildBody()}
        {/* <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr> */}
      </tbody>
    </Table>
  );
};

export default TableComponent;
