import React, { useEffect, useState } from "react";
import "./Home.css";
import Marquee from "react-fast-marquee";
import Cards from "../UI/cards";

function Home() {
  const [result, setResult] = useState([]); // Original Data
  const [filteredResult, setFilteredResult] = useState([]); // Filtered Data
  const [data, setData] = useState(""); // Search Query
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility state

  // Handle Input Change
  const handleChange = (event) => {
    const value = event.target.value;
    setData(value);

    if (value.trim() === "") {
      setFilteredResult([]); // Clear results when input is empty
      setDropdownVisible(false);
    } else {
      const filtered = result.filter((item) =>
        item.c_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResult(filtered);
      setDropdownVisible(true); // Show dropdown on valid search
    }
  };
  const selectData = (data2) =>{
    setData(data2);
    setDropdownVisible(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        const value2 = await response.json();
        console.log(value2);

        setResult(value2); // Store all data
        setFilteredResult(value2); // Default filtered data to all
      } catch (error) {
        console.log("Data not found:", error);
      }
    };
    fetchData();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".SearchCourses")) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="HomePage">
        <div className="MainText">
          <p>"Learn, grow, and lead the way to a brighter tomorrow."</p>
        </div>
        <div className="MainIcons position-relative">
          <img
            src="/Images/presentation.png"
            alt=""
            className="MainImage position-absolute"
          />
        </div>

        <div className="marquee">
          <div className="Marqueeitems" gradientcolor="transparent">
            <Marquee gradient="true">
              <img src="/Images/react.png" alt="" />
              <img src="/Images/html.png" alt="" />
              <img src="/Images/css.png" alt="" />
              <img src="/Images/javascript.png" alt="" />
              <img src="/Images/mongodb.png" alt="" />
              <img src="/Images/Postgresql.svg" alt="" />
              <img src="/Images/nodejs.png" alt="" />
            </Marquee>
          </div>
        </div>

        {/* Search Courses  -----------*/} 
        <div className="SearchCourses d-flex justify-content-center align-items-center mt-lg-5">
          <input
            type="text"
            placeholder="Search Courses"
            className="form-control"
            value={data}
            onChange={handleChange}
          />
          {dropdownVisible && (
            <div className="DropDownMenu">
              {filteredResult.length > 0 ? (
                filteredResult.map((option, index) => (
                    <button className="dropdown-item" onClick={()=>{selectData(option.c_name)}}>{option.c_name}</button>
                ))
              ) : (
                <li className="dropdown-item text-muted">No results found</li>
              )}
            </div>
          )}
        </div>
        {/* ------------- */}
      </div>
      <div className="blend"></div>
      <Cards home="true" />
    </div>
  );
}

export default Home;
