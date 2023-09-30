import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddNavBar } from "./AddNavBar";
import {NavBarRight} from "./NavBarRight";
import { MovieList } from "./MovieList/MovieList";
import { SeriesList } from "./SeriesList/SeriesList";
import { SingleMovie } from "./MovieList/SingleMovie";
import {SingleSeries} from "./SeriesList/SingleSeries";
import { AnimationList } from "./AnimationList/AnimationList";
import { SingleAnimation } from "./AnimationList/SingleAnimation";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/addNavBar" element={<AddNavBar />} />
                    <Route path="/navBarRight" element={<NavBarRight />} />
                    <Route index element={<MovieList />} />
                    <Route path="/seriesList" element={<SeriesList />} />
                    <Route path="/animationList" element={<AnimationList />} />
                    <Route path="/singleMovie/:singleMovieId" element={<SingleMovie />} />
                    <Route path="/singleAnimation/:singleAnimationId" element={<SingleAnimation />} />
                    <Route path="/singleSeries/:singleSeriesId" element={<SingleSeries />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}



export default App;