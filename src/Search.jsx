import { useEffect, useRef, useState } from "react";
import { movies } from "./MoviesData/MoviesData";
import { series } from "./SeriesData/SeriesData";
import { animations } from "./AnimationsData/AnimationsData";

export const Search = () => {
    const searchListContainerRef = useRef(null);    //<- ***outSideClick***

    const [inputValue, setInputValue] = useState("");
    const [search, setSearch] = useState([]);

    const combinedData = [...movies, ...series, ...animations];

    const searchHandler = (e) => {
        const searchText = e.target.value;
        setInputValue(searchText);
        
        const myId = document.querySelector("#myId");  //<-- *********************
        const searchInput = document.querySelector(".searchInput");
        if (searchText.length === 0) {                 //<-- *********************
            setSearch([]);                             //<-- *********************
            myId.style.height = "0";                   //<-- *********************
        } else if (searchText.length > 0) {            //<-- *********************
            myId.style.overflowX = "scroll";
            myId.style.height = "310px";               //<-- *********************
        };
        if (searchText.length > 0) {
            searchInput.style.borderBottomRightRadius = "0";
            searchInput.style.borderBottomLeftRadius = "0";
        } else if (searchText.length === 0) {
            searchInput.style.borderBottomRightRadius = "10px";
            searchInput.style.borderBottomLeftRadius = "10px";
        };

        const filtered = combinedData.filter((list) =>
        list.title.toLowerCase().includes(inputValue.toLowerCase()))
    
        setSearch(filtered);
    }

    // -----------------------outsideClick v----------------------------
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchListContainerRef.current &&
                !searchListContainerRef.current.contains(event.target)
              ) {
                  // Clicked outside .movieChangeBox, so close it
                  // You can call your showV_ or other functions to handle the closing logic
                  const myId = document.querySelector("#myId");
                  const searchInput = document.querySelector(".searchInput");
                  myId.style.height = "0";
                  searchInput.value = "";
                  searchInput.style.borderBottomRightRadius = "10px";
                  searchInput.style.borderBottomLeftRadius = "10px";
            }
            };      
            // Add the event listener when the component mounts
            document.addEventListener("click", handleClickOutside);
            
            // Remove the event listener when the component unmounts to prevent memory leaks
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
    }, []);
    // -----------------------outsideClick ^----------------------------
    

    return (
        <span className="searchMain">
            <input className="searchInput" ref={searchListContainerRef} value={inputValue} onChange={searchHandler} type="text" placeholder="Search..." />
            <ul className="searchListContainer" id="myId">  {/*<-- *********id="myId"************/}
                {search.map((list) => {
                    return (
                        <a href={list.link} key={list.id}>
                            <li className="searchList">
                                <img src={list.image} alt={list.title} style={{width:"50px",marginRight:"8px"}}/>
                                {list.title}
                            </li>
                        </a>
                    )
                })}
            </ul>
        </span>
    )
}