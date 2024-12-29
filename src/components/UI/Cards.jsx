import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

function Cards(props) {
  const [result, setresult] = useState(null);

  const getdata = () => {
    if (!result) {
      return <p>Loading...</p>;
    }

    return result.map((key) => (
      <Link key={key.course_id} to={`/course/${key.course_id}`} className="td-none">
        <div className="cards">
          <img src="./image4.png" alt={key.course_title} />
          <p>{key.course_title}</p>
        </div>
      </Link>
    ));
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const value = await fetch("http://localhost:3000/getcourses");
        const value2 = await value.json();
        console.log(value2);
        if (props.home === "true") {
          setresult(value2.slice(0, 4));
        }
        else{
          setresult(value2);
        }
      } catch (error) {
        console.log("data not found");
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      <div className="course">
        <h2>Courses</h2>
        <div className="grid">{getdata()}</div>
      </div>
    </>
  );
}

export default Cards;
