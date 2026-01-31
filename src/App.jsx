import Home from "./Pages/Home";
import About from "./Pages/About";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Pictures from "./components/Pictures";
import Music from "./Pages/Music";
import VideoPlayer from "./Pages/VideoPlayer";
import Shorts from "./Pages/Shorts";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/music" element={<Music />} />
        <Route path="/pictures" element={<Pictures />} />
        <Route path="/video/:videoId" element={<VideoPlayer />} />
        <Route path="/shorts" element={<Shorts />} />
      </Route>
    </Routes>
  );
}

export default App;
