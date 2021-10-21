import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "./table.css";
import { Pagination } from "react-bootstrap";

const TableComponent = ({ headerData, tableData , decrementPageNo, incrementPageNo , pageNo=0, decrementButtonDiseble}) => {
  
  const [row, setRow] = useState([]);

    function getTableCellValue(value) {
    if (typeof value === "string" && value.includes("http")) {
      return (
        <div className="imgTable">
          <img src={value} alt="bitvoin icon" onLoad={()=>console.log("sdgdfsg")} />
        </div>
      );
    }
    return value;
  }

  function buildBody() {
    return tableData.map((dataObj, index) => {
      return (
        <tr key={"CustomTable" + index}>
          {Object.values(dataObj).map((dataValue, index) => (
            <td key={dataValue + index}>{getTableCellValue(dataValue)}</td>
          ))}
        </tr>
      );
    });
  }
  return (
    <div>
        <div className="table-pagination">
          <Pagination>
              <Pagination.Prev onClick={decrementPageNo} disable={decrementButtonDiseble}/>
              <Pagination.Item>{pageNo}</Pagination.Item>
              <Pagination.Next onClick={incrementPageNo}/>
          </Pagination>
      </div>
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            {headerData.map((th) => (
              <th key={th} style={{ textTransform: "uppercase" }}>
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{buildBody()}</tbody>
      </Table>
      
    </div>
  );
};

export default TableComponent;
