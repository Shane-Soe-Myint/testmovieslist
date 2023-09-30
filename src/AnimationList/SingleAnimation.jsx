import {animations} from "../AnimationsData/AnimationsData";
import {useParams} from "react-router-dom";
import { Search } from "../Search";

export const SingleAnimation = () => {
    const {singleAnimationId} = useParams();
    const movie = animations.find((movie) => movie.id.toString() === singleAnimationId);
    const {image, title, about, downloadLink} = movie;

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
                        <h1>{title}</h1><br/>
                        <p>{about}</p>
                    </div>

                    {/* <a href={download}><button className="download" ><i className="fa-regular fa-circle-down"></i> Download<i className="fa-solid fa-download"></i></button></a> */}
                </div>
            </div>

            <div className="downloadLink" style={{marginBottom:"20px",}}>
                    {downloadLink.map((downloadLink) => {
                        return (
                            <div key={downloadLink.downloadLink}>
                                <h3 style={{marginTop:"25px",color:"skyblue"}}>{downloadLink.downloadLink}<span>  {`>>`}</span></h3>
                                <ul style={{display:"flex"}}>
                                    {downloadLink.links.map((link, index) => (
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