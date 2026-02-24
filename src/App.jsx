import Home from "./Pages/Home";
import About from "./Pages/About";
import Music from "./Pages/Music";
import Shorts from "./Pages/Shorts";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import VideoPlayer from "./Pages/VideoPlayer";
import Videos from "./Pages/Videos";
import Contact from "./Pages/Contact";
import Pictures from "./components/Pictures";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/pictures" element={<Pictures />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/video/:videoId" element={<VideoPlayer />} />
      </Route>
    </Routes>
  );
}

export default App;
