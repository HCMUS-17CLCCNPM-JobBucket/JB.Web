import JobLayout from "app/components/layouts/JobLayout";
export const getServerSideProps = ({ query }) => {
  return {
    props: { query },
  };
};

function JobRecommendPage(props) {
  return <JobLayout type="recommend" query={props.query}></JobLayout>;
}

export default JobRecommendPage;
