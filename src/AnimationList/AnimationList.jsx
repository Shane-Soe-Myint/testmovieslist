import { AddNavBar } from "../AddNavBar";
import { NavBarRight } from "../NavBarRight";
import { animations } from "../AnimationsData/AnimationsData";
import { Search } from "../Search";
import { useState, useEffect, useRef  } from "react";

let renderNumber = [];
export const AnimationList = () => {

    const movieChangeBoxRef = useRef(null);   //<- ***outSideClick***


    const showV_ = () => {
        const getMovieChangeBox = document.querySelector(".movieChangeBox");
        getMovieChangeBox.classList.toggle("displayShowMovieList");
    }
    

    const [data, setData] = useState(animations);

    // -----------------localStorageGetItem V-----------------
  // Initialize currentPage, currentNumberLimit, and maxNumberLimit
    const initialPage = parseInt(localStorage.getItem("currentPage")) || 1;
    const initialCurrentNumberLimit = parseInt(localStorage.getItem("currentNumberLimit")) || 3;
    const initialMaxNumberLimit = parseInt(localStorage.getItem("maxNumberLimit")) || 3;
    const initialMinNumberLimit = parseInt(localStorage.getItem("minNumberLimit")) || 0;

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [currentNumberLimit, setCurrentNumberLimit] = useState(initialCurrentNumberLimit);
    const [maxNumberLimit, setMaxNumberLimit] = useState(initialMaxNumberLimit);
    const [minNumberLimit, setMinNumberLimit] = useState(initialMinNumberLimit);
    // -----------------localStorageGetItem ^-----------------

    const [itemPerPage, setItemPerPage] = useState(12);



    
    // -----------------localStorageSetItem V-----------------
    useEffect(() => {
        // Store the currentPage, currentNumberLimit, and maxNumberLimit in localStorage
        localStorage.setItem("currentPage", currentPage.toString());
        localStorage.setItem("currentNumberLimit", currentNumberLimit.toString());
        localStorage.setItem("maxNumberLimit", maxNumberLimit.toString());
        localStorage.setItem("minNumberLimit", minNumberLimit.toString());


        // -----------------------outsideClick v----------------------------
        const handleClickOutside = (event) => {
            if (
              movieChangeBoxRef.current &&
              !movieChangeBoxRef.current.contains(event.target)
              ) {
                  // Clicked outside .movieChangeBox, so close it
                  // You can call your showV_ or other functions to handle the closing logic
                  const getMovieChangeBox = document.querySelector(".movieChangeBox");
                  getMovieChangeBox.classList.add("displayShowMovieList");
                  showV_();
            }
            };           
            // Add the event listener when the component mounts
            document.addEventListener("click", handleClickOutside);     
            // Remove the event listener when the component unmounts to prevent memory leaks
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
            // -----------------------outsideClick ^----------------------------


      }, [currentPage, currentNumberLimit, maxNumberLimit, minNumberLimit]);
    
      // ... rest of your component code
    
      // Your handleClick function remains unchanged
      const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
      };
    // -----------------localStorageSetItem ^-----------------

    let handleClickAndHome = (event) => {
        handleClick(event);
        home();
    };

    let handleClickLastPage = (event) => {
        handleClick(event);
        setMaxNumberLimit(localStorage.value = 6);
        setMinNumberLimit(localStorage.value = 3);
    };

    let pages = [];
    for (let i = 0; i <= Math.ceil(data.length/itemPerPage); i++) {
        pages.push(i);
    };
    const indexOfLastItem = currentPage*itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItem = data.slice(indexOfFirstItem, indexOfLastItem);

    renderNumber = pages.map((number) => {
        if (number < maxNumberLimit + 1 && number > minNumberLimit) {
            return (
                <li key={number} id={number} onClick={handleClick}
                className={currentPage === number?"activeNumColor":null}
                >
                    {number}
                </li>
            )
        } else {
            return null;
        }
    });

    let nextBtn = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxNumberLimit) {
            setMaxNumberLimit(maxNumberLimit + currentNumberLimit);
            setMinNumberLimit(minNumberLimit + currentNumberLimit);
        }
    };

    let prevBtn = () => {
        setCurrentPage(currentPage - 1);;
        if ((currentPage - 1)%currentNumberLimit === 0) {
            setMaxNumberLimit(maxNumberLimit - currentNumberLimit);
            setMinNumberLimit(minNumberLimit - currentNumberLimit);
        }
    };

    // let ectIncreaseBtn = null;
    if (maxNumberLimit < pages.length -1) {
        renderNumber.push(<li key="ellipsis-start" onClick={() => nextBtn()}>...</li>);
        renderNumber.push(
            <li
              key={pages.length-1}
              id={pages.length-1}
              onClick={handleClickLastPage}
              className={currentPage === pages.length-1 ? "activeNumColor" : null}
            >
              {pages.length-1}
            </li>
          );
    };

    // let ectDecreaseBtn = null;
    if (minNumberLimit >= pages[1]) {
        renderNumber.unshift(<li key="ellipsis-end" onClick={() => prevBtn()}>...</li>);
        renderNumber.unshift(
            <li
              key={1}
              id={1}
              onClick={handleClickAndHome}
              className={currentPage === 1 ? "activeNumColor" : null}
            >
              1
            </li>
          );
    };

    const home = () => {
        setCurrentPage(localStorage.value = 1);
        setMinNumberLimit(localStorage.value = 0);
        setMaxNumberLimit(localStorage.value = 3);
    };

    return (
        <div className="main">
            <div className="addNavBar">
                <a href="">{<AddNavBar />}</a>
            </div>

            <div className="navBarContainer">

                <button className="homeBtn" onClick={home}>Home</button>


                <h1>Animations <a className="movieChangeBtn" onClick={() => showV_()} ref={movieChangeBoxRef}><img src="https://icons.veryicon.com/png/o/internet--web/industrial-icon/sort-2.png"/></a>
                    <div className="movieChangeBox">
                        <a className="v_" href="/" onClick={home}><h1>Movies</h1></a>
                        <a className="v_" href="/seriesList" onClick={home}><h1>Series</h1></a>
                    </div>
                    <span className="searchInputContainer">{<Search/>}</span>
                    <span className="navBarRight">{<NavBarRight />}</span>
                </h1>
            </div>
            <br/>

            
            <div className="moviesContainer">
                {currentItem.map((movie) => {
                    return (
                     // <a href={`/singleMovie/${movie.id}`}  key={movie.id} target="_blank" rel="noopener noreferrer">
                        <a href={`/singleAnimation/${movie.id}`}  key={movie.id} >
                            <div className="movieList">
                                <div style={{position: "relative"}}>
                                    <span className="moviesRating">
                                        <div><i className="fa-solid fa-star"></i>{movie.rate}</div>
                                    </span>
                                    <span className="movieQuality">
                                        <div>{movie.movieQuality}</div>
                                    </span>
                                </div>
                                <img src={movie.image} alt={movie.title} />
                            </div>
                            <div className="h4TitleContainer"><h4 className="h4Title">{movie.title}</h4></div>
                            <h4 className="years">{movie.years}</h4>
                        </a>
                    )
                })}
            </div>

                <div className="pageNumbers">
                    <button className="backBtn" onClick={prevBtn} disabled={currentPage === pages[1]?true:false}>
                        <i className="fa-solid fa-angles-left"></i> Prev
                    </button>

                    {/* {ectDecreaseBtn} */}
                    {renderNumber}
                    {/* {ectIncreaseBtn} */}

                    <button className="nextBtn" onClick={nextBtn} disabled={currentPage === pages.length - 1?true:false}>
                        Next <i className="fa-solid fa-angles-right"></i>
                    </button>
                </div>
        </div>
    )
}