import { Select, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(Number(coinId));
  return <div>CryptoDetails {coinId}</div>;
};

export default CryptoDetails;
