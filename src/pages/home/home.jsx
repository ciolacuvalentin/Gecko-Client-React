import react, { useEffect, useState } from "react";
import { getCoinsMarket } from "../../services/api";
import TableComponent from "../../componets/table/table";
import Spinner from "react-bootstrap/Spinner";
import "./home.css";

const Home = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState([]);
  const [tablePageNo, setTablePageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCoinsMarketParams = {
      vs_currency: "eur",
      per_page: 10,
      page: tablePageNo,
    };
    async function fetchList() {
      setLoading(true);
      const res = await getCoinsMarket(getCoinsMarketParams);
      setLoading(false);
      if (res.data)
        setList(
          res.data.map((k) => {
            return {
              image: k.image,
              name: k.name,
              symbol: k.symbol,
              current_price: k.current_price,
              high_24h: k.high_24h,
              low_24h: k.low_24h,
            };
          })
        );
      else if (res.error) setError(res.error);
    }

    fetchList();
  }, [tablePageNo]);
  console.log(list);

  function buildTableHeaderData() {
    return list.length > 0 ? Object.keys(list[0]) : [];
  }
  function handleNextTablePage() {
    setTablePageNo((prev) => prev + 1);
  }

  function handlePrevTablePage() {
    if (tablePageNo === 1) return;
    setTablePageNo((prev) => prev - 1);
  }
  //   function buildtableData() {
  //     return console.log("fadsgfdasg",Object.values(list))
  //     }
  return (
    <div className="p-5">
      {loading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="spinner-center"
        />
      ) : (
        <TableComponent
          headerData={buildTableHeaderData()}
          tableData={list}
          incrementPageNo={handleNextTablePage}
          decrementPageNo={handlePrevTablePage}
          decrementButtonDiseble={tablePageNo === 1}
          pageNo={tablePageNo}
        />
      )}
    </div>
  );
};
export default Home;
