interface NewsProps {
  simplified?: boolean;
}

const News: React.FC<NewsProps> = ({ simplified = false }) => {
  return <div>News</div>;
};

export default News;
