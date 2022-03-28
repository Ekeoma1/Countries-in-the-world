import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector } from "react-redux";

const CountryDetails = () => {
  const mode = useSelector((state) => state.changeMode);

  const [country, setCountry] = useState(null);
  let params = useParams();
  useEffect(() => {
    async function FetchData() {
      if (params.id.length < 4) {
        const response = await axios.get(
          `https://restcountries.com/v2/alpha/${params.id}`
        );
        setCountry(response.data);
      } else {
        const response = await axios.get(
          `https://restcountries.com/v2/name/${params.id}?fullText=true`
        );
        setCountry(response.data);
      }
    }
    FetchData();
  }, [setCountry, params.id]);

  return (
    <section className={`py-5 ${mode === "dark" && "dark-mode"}`}>
      <div className="container">
        <Link className="detail-btn shadow-sm mb-5" to="/">
          <KeyboardBackspaceIcon /> back
        </Link>

        <div className="mt-5">
          {country === null ? (
            <div className="loader">loading...</div>
          ) : // when the api data comes in an array
          Array.isArray(country) ? (
            country.map((country, index) => {
              return (
                <div className="country-detail-wrapper">
                  <div key={index}>
                    <img className="img-fluid" src={country.flag} alt="" />
                  </div>
                  <div>
                    <div className="country-name mb-3">{country.name}</div>

                    <div className="country-info-wrapper mb-3">
                      <div>
                        <div className="country-info">
                          <span>Native Name:</span> {country.nativeName}
                        </div>

                        <div className="country-info">
                          <span>Population:</span>{" "}
                          {country.population
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>

                        <div className="country-info">
                          <span>Region:</span> {country.region}
                        </div>

                        <div className="country-info">
                          <span>Sub Region:</span> {country.subregion}
                        </div>

                        <div className="country-info">
                          <span>Capital:</span> {country.capital}
                        </div>
                      </div>

                      <div>
                        <div className="country-info">
                          <span>Top Level Domain:</span>{" "}
                          {country.topLevelDomain}
                        </div>

                        <div className="country-info">
                          <span>Currencies:</span> {country.currencies[0].name}
                        </div>

                        <div className="country-info">
                          <span>Languages:</span>{" "}
                          {country.languages
                            .map((lang) => {
                              return lang.name;
                            })
                            .join(", ")}
                        </div>
                      </div>
                    </div>

                    <div className="country-info border-wrapper">
                      <span>Border Countries:</span>{" "}
                      <div className="d-flex gap-2 flex-wrap">
                        {country.hasOwnProperty("borders")
                          ? country.borders.map((border, index) => {
                              return (
                                <Link
                                  onClick={() => window.reload()}
                                  key={index}
                                  className="detail-btn me-2 shadow-sm"
                                  to={`/${border}`}
                                >
                                  {border}
                                </Link>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // this below is when the api fetched comes in as object
            <div className="country-detail-wrapper">
              <div>
                <img className="img-fluid" src={country.flag} alt="" />
              </div>
              <div>
                <div className="country-name mb-3">{country.name}</div>

                <div className="country-info-wrapper mb-3">
                  <div>
                    <div className="country-info">
                      <span>Native Name:</span> {country.nativeName}
                    </div>

                    <div className="country-info">
                      <span>Population:</span>{" "}
                      {country.population
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>

                    <div className="country-info">
                      <span>Region:</span> {country.region}
                    </div>

                    <div className="country-info">
                      <span>Sub Region:</span> {country.subregion}
                    </div>

                    <div className="country-info">
                      <span>Capital:</span> {country.capital}
                    </div>
                  </div>

                  <div>
                    <div className="country-info">
                      <span>Top Level Domain:</span> {country.topLevelDomain}
                    </div>

                    <div className="country-info">
                      <span>Currencies:</span> {country.currencies[0].name}
                    </div>

                    <div className="country-info">
                      <span>Languages:</span>{" "}
                      {country.languages
                        .map((lang) => {
                          return lang.name;
                        })
                        .join(", ")}
                    </div>
                  </div>
                </div>

                <div className="country-info border-wrapper">
                  <span>Border Countries:</span>{" "}
                  <div className="d-flex gap-2 flex-wrap">
                    {country.borders.map((border, index) => {
                      return (
                        <Link
                          onClick={() => window.reload()}
                          key={`/${index}`}
                          className="detail-btn me-2 shadow-sm"
                          to={`/${border}`}
                        >
                          {border}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CountryDetails;
