import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const continent = ["all", "africa", "americas", "asia", "europe", "oceania"];

const Home = () => {
  const [filter, setFilter] = useState("Filter by Region");
  const [countries, setCountries] = useState(null);
  const [filterOption, setFilterOption] = useState(true);
  const mode = useSelector((state) => state.changeMode);

  const toggleFilter = () => {
    setFilterOption(!filterOption);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
    }
    fetchData();
  }, []);

  //   country search function
  const inputSearch = async (e) => {
    let value = e.target.value;
    const res = await axios.get(`https://restcountries.com/v2/name/${value}`);
    setCountries(res.data);
  };

  //   region filter function
  const regionFilter = async (e) => {
    let value = e.target.innerHTML;
    setFilter(value);
    if (value === "all") {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
    } else {
      let res = await axios.get(`https://restcountries.com/v2/region/${value}`);
      setCountries(res.data);
      console.log(countries);
    }
  };
  return (
    <div className={`py-5 ${mode === "dark" && "dark-mode"}`}>
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap gap-lg-0 gap-4">
          <div className="search-input-wrapper shadow-sm">
            <SearchIcon />
            <input
              onChange={inputSearch}
              type="text"
              className="w-100 search-input"
              placeholder="Search Country..."
            />
          </div>

          <div className="position-relative">
            <div
              onClick={toggleFilter}
              className="filter-card shadow-sm d-flex justify-content-between align-items-center"
            >
              {filter} <KeyboardArrowDownIcon />
            </div>
            <div
              className={`filter-card-option position-absolute shadow-sm ${
                filterOption && "d-none"
              }`}
            >
              {continent.map((continent, index) => {
                return (
                  <div key={index} onClick={toggleFilter}>
                    <button
                      onClick={regionFilter}
                      //  onClick={() => setFilter(continent)}
                    >
                      {continent}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="country-display mt-5">
          {countries === null ? (
            <div className="loader">Loading...</div>
          ) : (
            countries.map((country, index) => {
              return (
                <Link key={index} to={country.name}>
                  <div className="card country-card border-0 shadow-sm">
                    <img
                      src={country.flags.png}
                      className="country-img img-fluid card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <div className="country-name mb-2">{country.name}</div>
                      <div className="country-info">
                        <span>Population:</span>{" "}
                        {country.population
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </div>
                      <div className="country-info">
                        <span>Region:</span> {country.region}
                      </div>
                      <div className="country-info mb-2">
                        <span>Capital:</span> {country.capital}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
