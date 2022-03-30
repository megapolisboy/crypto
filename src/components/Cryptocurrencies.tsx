import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";

interface CryptocurrenciesProps {
  simplified?: boolean;
}

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({
  simplified = false,
}) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin: any) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (cryptos.length !== filteredData.length) {
      setCryptos(filteredData);
    }
  }, [cryptosList, searchTerm]);

  if (isFetching) return <div>Loading ...</div>;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((crypto: any) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.id}>
            <Link to={`crypto/${crypto.id}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={
                  <img className="crypto-image" src={crypto.iconUrl} alt="" />
                }
                hoverable
              >
                <p>Price: {millify(crypto.price)}</p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
