import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Page404() {
  return (
    <div className="outer-wrapper">
      <Head>
        <title>Page not found | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="inner">
        <div className="four-wrapper">
          <div className="leg-1" />
          <div className="leg-2" />
          <div className="leg-3" />
        </div>
        <div className="zero-wrapper">
          <div className="zero-wrapper__middle" />
        </div>
        <div className="four-wrapper">
          <div className="leg-1" />
          <div className="leg-2" />
          <div className="leg-3" />
        </div>
      </div>
      <h1>Page not found</h1>
    </div>
  );
}
