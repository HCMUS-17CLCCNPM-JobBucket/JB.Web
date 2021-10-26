import React, { useState, useEffect } from "react";
import { CvAPI } from "app/api/modules/cvAPI";
import { cvActions } from "app/redux/features/cv";
import { useSelector, useDispatch } from "react-redux";
import router from "next/router";

export default function ListCv() {
  const [myCv, setmyCv] = useState([]);
  const dispatch = useDispatch();
  const toEditor = async (id) => {
    await CvAPI.getCvById(id).then((res) => {
      dispatch(cvActions.initData(res.data.data.cv[0]));
      console.log(res.data.data.cv[0]);
      router.push("/cv-editor");
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await CvAPI.getAll().then((res) => {
        setmyCv(res.data.data.cv);
        console.log(myCv);
      });
    };
    fetchData();
  }, []);
  return (
    <div>
      {myCv.map((data) => (
        <p onClick={() => toEditor(data.id)}>{data.cVName}</p>
      ))}
    </div>
  );
}
