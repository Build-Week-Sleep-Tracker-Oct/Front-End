import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Loader from 'react-loader-spinner'

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //const [start, setStart] = useState([]);

//   useEffect(() => {
//     axiosWithAuth()
//       .get("/api/user/sleepdata")
//       .then(response => {
//         //console.log(response);
//         //setStart(response.data);
        
//         );
        
//       })
//       .catch(error => console.log(error));
//   }, [searchTerm]);

useEffect(() => {
    const data = props.data.filter(mood =>
        mood.feels.includes(searchTerm))
        setSearchResults(data);
}, [searchTerm]);

  

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };



if(!props.data) {
  return <Loader type="Rings" color="#00BFFF" height={100} width={100} /> 
}

  return (
    <section className="search-form">
      <form className="search">
        <select
          name="search-by-feels"
          onChange={e => handleChange(e)}
          value={searchTerm}
        >
          <option value="">Search by mood</option>
          <option value="4">😀</option>
          <option value="3">😐</option>
          <option value="2">😭</option>
          <option value="1">😡</option>
        </select>
      </form>

      {
        // searchResults.length === 0
        // ? props.data.map(item => {
        //     if (Number(item.feels) === 1) {
        //       return (
        //         <div className="entry" key={item.id} onClick={e => entryRoute(e, item)}>
        //           <p>😡</p>
        //           <p>{item.notes}</p>
        //           <p>{item.dateTimeFrom}</p>
        //           <p>{item.dateTimeTo}</p>
        //         </div>
        //       );
        //     } else if (Number(item.feels) === 2) {
        //       return (
        //         <div className="entry" key={item.id} onClick={e => entryRoute(e, item)}>
        //           <p>😭</p>
        //           <p>{item.notes}</p>
        //           <p>{item.dateTimeFrom}</p>
        //           <p>{item.dateTimeTo}</p>
        //         </div>
        //       );
        //     } else if (Number(item.feels) === 3) {
        //       return (
        //         <div className="entry" key={item.id} onClick={e => entryRoute(e, item)}>
        //           <p>😐</p>
        //           <p>{item.notes}</p>
        //           <p>{item.dateTimeFrom}</p>
        //           <p>{item.dateTimeTo}</p>
        //         </div>
        //       );
        //     } else if (Number(item.feels) === 4) {
        //       return (
        //         <div className="entry" key={item.id} onClick={e => entryRoute(e, item)}>
        //           <p>😀</p>
        //           <p>{item.notes}</p>
        //           <p>{item.dateTimeFrom}</p>
        //           <p>{item.dateTimeTo}</p>
        //         </div>
        //       );
        //     } else {
        //       return (
        //         <div className="entry" key={item.id} onClick={e => entryRoute(e, item)}>
        //           <p>{item.feels}</p>
        //           <p>{item.notes}</p>
        //           <p>{item.dateTimeFrom}</p>
        //           <p>{item.dateTimeTo}</p>
        //         </div>
        //       );
        //     }
        //   })
        // : 
        // props.data.map(item => {
        //     if (Number(item.feels) === 1) {
        //       return (
        //         <div className="entry" key={item.id} onClick={e => entryRoute(e, item)}>
        //           <p>😡</p>
        //           <p>{item.notes}</p>
        //           <p>{item.dateTimeFrom}</p>
        //           <p>{item.dateTimeTo}</p>
        //         </div>
        //       );
        //     } else if (Number(item.feels) === 2) {
        //       return (
        //         <div className="entry" key={item.id} onClick={e => entryRoute(e, item)}>
        //           <p>😭</p>
        //           <p>{item.notes}</p>
        //           <p>{item.dateTimeFrom}</p>
        //           <p>{item.dateTimeTo}</p>
        //         </div>
        //       );
        //     } else if (Number(item.feels) === 3) {
        //       return (
        //         <div className="entry" key={item.id} onClick={e => entryRoute(e, item)}>
        //           <p>😐</p>
        //           <p>{item.notes}</p>
        //           <p>{item.dateTimeFrom}</p>
        //           <p>{item.dateTimeTo}</p>
        //         </div>
        //       );
        //     } else if (Number(item.feels) === 4) {
        //       return (
        //         <div className="entry" key={item.id} onClick={e => entryRoute(e, item)}>
        //           <p>😀</p>
        //           <p>{item.notes}</p>
        //           <p>{item.dateTimeFrom}</p>
        //           <p>{item.dateTimeTo}</p>
        //         </div>
        //       );
        //     } else {
        //       return (
        //         <div className="entry" key={item.id} onClick={e => entryRoute(e, item)}>
        //           <p>{item.feels}</p>
        //           <p>{item.notes}</p>
        //           <p>{item.dateTimeFrom}</p>
        //           <p>{item.dateTimeTo}</p>
        //         </div>
        //       );
        //     }
          }
          {/* )} */}
    </section>
  );
};

export default Search;
