import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { callAPI } from "../../domain/api";

const Detail = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await callAPI(`/password/${id}`, "GET");
      setData(response);
      //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <h1>Detail Page</h1>
        {data && (
          <div>
            {/* Access properties directly since data is an object */}
            {data.provider}
            {data.email}
            {data.category}
          </div>
        )}
      </div>
    </>
  );
};

export default Detail;
