import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCoinDetails } from "../../services/api";
import TableComponent from "../../componets/table/table";

const Details = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});
  const location = useLocation();
  console.log(location.pathname.substr(9));

  useEffect(() => {
    const coinId = location.pathname.substr(9);
    const getCoinsDetailsParams = {};

    async function fetchDetails() {
      setLoading(true);
      const res = await getCoinDetails(coinId, getCoinsDetailsParams);
      if (res.data) {
        setTableData({
          name: res.data.name,
          symbol: res.data.symbol,
          hashing_algorithm: res.data.hashing_algorithm,
          market_cap_eur: res.data.market_data?.market_cap?.eur,
          genesis_date: res.data.genesis_date,
        });
      }
      setLoading(false);
    }

    fetchDetails();
  }, []);

  function buildTableHeaderData() {
    return Object.keys(tableData);
  }
  console.log(tableData);

  return (
    <div className="p-5">
      <TableComponent
        headerData={buildTableHeaderData()}
        tableData={[tableData]}
        showPagination={false}
      />
    </div>
  );
};

export default Details;
