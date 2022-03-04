import JobLayout from "app/components/layouts/JobLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const getServerSideProps = ({ query }) => {
  return {
    props: { query },
  };
};

export default function JobPage(props) {
  return <JobLayout type="all" query={props.query}></JobLayout>;
}
