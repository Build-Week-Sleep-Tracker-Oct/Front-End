import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";

const Search = props => {
  //console.log(props);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/users/sleepdata")
      .then(response => {
        //console.log(response);
        const data = response.data.filter(mood =>
          mood.feels.includes(searchTerm)
        );
        setSearchResults(data);
      })
      .catch(error => console.log(error));
  }, [searchTerm]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const entryRoute = (e, item) => {
    e.preventDefault();
    props.history.push(`/trackerlist/${item.id}`);
  };

  if (!searchResults) {
    return <Loader type="Rings" color="#00BFFF" height={100} width={100} />;
  }

  const smiley = <span role="img" aria-labelledby='smiley'>😀</span>
  const ok = <span role="img" aria-labelledby='ok'>😐</span>
  const sad = <span role="img" aria-labelledby='sad'>😭</span>
  const angry = <span role="img" aria-labelledby='angry'>😡</span>

  return (
    <section className="search-form">
      <form className="search">
        <select
          name="search-by-feels"
          onChange={e => handleChange(e)}
          value={searchTerm}
        >
          <option value="">Search by mood</option>
          <option value="4">{smiley}</option>
          <option value="3">{ok}</option>
          <option value="2">{sad}</option>
          <option value="1">{angry}</option>
        </select>
      </form>

      {searchResults.map(item => {
        if (Number(item.feels) === 1) {
          return (
            <div
              className="entry"
              key={item.id}
              onClick={e => entryRoute(e, item)}
            >
              <p>{angry}</p>
              <p>{item.notes}</p>
              <p>{item.dateTimeFrom}</p>
              <p>{item.dateTimeTo}</p>
            </div>
          );
        } else if (Number(item.feels) === 2) {
          return (
            <div
              className="entry"
              key={item.id}
              onClick={e => entryRoute(e, item)}
            >
              <p>{sad}</p>
              <p>{item.notes}</p>
              <p>{item.dateTimeFrom}</p>
              <p>{item.dateTimeTo}</p>
            </div>
          );
        } else if (Number(item.feels) === 3) {
          return (
            <div
              className="entry"
              key={item.id}
              onClick={e => entryRoute(e, item)}
            >
              <p>{ok}</p>
              <p>{item.notes}</p>
              <p>{item.dateTimeFrom}</p>
              <p>{item.dateTimeTo}</p>
            </div>
          );
        } else if (Number(item.feels) === 4) {
          return (
            <div
              className="entry"
              key={item.id}
              onClick={e => entryRoute(e, item)}
            >
              <p>{smiley}</p>
              <p>{item.notes}</p>
              <p>{item.dateTimeFrom}</p>
              <p>{item.dateTimeTo}</p>
            </div>
          );
        } else {
          return (
            <div
              className="entry"
              key={item.id}
              onClick={e => entryRoute(e, item)}
            >
              <p>{item.feels}</p>
              <p>{item.notes}</p>
              <p>{item.dateTimeFrom}</p>
              <p>{item.dateTimeTo}</p>
            </div>
          );
        }
      })}
      <NavLink
        to={"/trackerlist"}
        style={{
          color: `white`,
          fontSize: `1.4rem`,
          textDecoration: `none`,
          textAlign: `left`,
          marginLeft: "20px"
        }}
      >
        Back
      </NavLink>
    </section>
  );
};

export default Search;
