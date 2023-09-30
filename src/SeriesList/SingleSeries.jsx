import { series } from "../SeriesData/SeriesData";
import {useParams} from "react-router-dom";
import { Search } from "../Search";

export const SingleSeries = () => {
    const {singleSeriesId} = useParams();
    const movie = series.find((movie) => movie.id.toString() === singleSeriesId);
    const {image, title, about, download, episodes} = movie;

    // const singleMovieClose = () => {
    //     window.close();
    // }

    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <div className="singleMovieMain">
                <div className="singleNavBarContainer">
                    <span className="searchInputContainer">{<Search/>}</span>
                    {/* <button className="singleMovieCloseBtn" onClick={singleMovieClose}>X</button> */}
                </div> <br/><br/><br/>

                <div className="singleContent">

                    <div className="singleImgTitle">
                        <img src={image} className="singleImg"/>
                    </div>
                    
                    <div>
                        <h1 className="singleTitle">{title}</h1><br/>
                        <p>{about}</p>
                    </div>


                    {/* <a href={download}><button className="download" ><i className="fa-regular fa-circle-down"></i> Download<i className="fa-solid fa-download"></i></button></a> */}
                </div>

            </div>

            <div className="episodeContainer" style={{marginBottom:"20px",}}>
                    {episodes.map((episode) => {
                        return (
                            <div key={episode.episodeNumber}>
                                <h3 style={{marginTop:"25px",color:"skyblue"}}>{episode.episodeTitle}<span>  {`>>`}</span></h3>
                                <ul style={{display:"flex"}}>
                                    {episode.links.map((link, index) => (
                                        <li key={index}>
                                        <a style={{marginRight:"40px"}} href={link.href}>{link.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}