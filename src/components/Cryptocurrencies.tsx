import millify from "millify";

interface CryptocurrenciesProps {
  simplified?: boolean;
}

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({
  simplified = false,
}) => {
  return <div>Cryptocurrencies</div>;
};

export default Cryptocurrencies;
