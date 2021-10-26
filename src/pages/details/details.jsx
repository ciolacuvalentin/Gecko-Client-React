import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCoinDetails } from "../../services/api";
import TableComponent from "../../componets/table/table";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";



const Details = () => {
  const[coinDescription ,setCoinDescription]= useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});
  const[homepages,setHomePage]= useState([]);
  const location = useLocation();
  console.log(location.pathname.substr(9));

  useEffect(() => {
    const coinId = location.pathname.substr(9);
    // const getCoinsDetailsParams = {};

    async function fetchDetails() {
      setLoading(true);
      const res = await getCoinDetails(coinId);
      if (res.data) {
        setTableData({
          name: res.data.name,
          symbol: res.data.symbol,
          hashing_algorithm: res.data.hashing_algorithm,
          market_cap_eur: res.data.market_data?.market_cap?.eur,
          genesis_date: res.data.genesis_date,
        });
        setCoinDescription(res.data.description.en)
        setHomePage(res.data.links.homepage)
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
                {loading ? <Spinner animation="border" variant="primary" className="spinner-center"/> : 
                <div>
                   <Link to = "/"><FontAwesomeIcon  icon={faHome} size={"2x"} color="#55ff00"/> Go Back to home</Link>
                <TableComponent
                    containerClassName="mt-4"
                    headerData={buildTableHeaderData()}
                    tableData={[tableData]}
                    showPagination={false} />
                {/* <div className="description-container" dangerouslySetInnerHTML={{__html: coinDescription}}></div> */}
                <iframe srcDoc={"<head><base target='_blank'></head>"+coinDescription}width={"100%"} style={{minHeight:"20rem",border:"none" }}/>
                <div className="d-flex flex-column">
                    {homepages.map((hp, index) => <a key={hp+index} href={hp}> {hp} </a>)}
                </div>
      </div>
      }
    </div>
  );
};

export default Details;
