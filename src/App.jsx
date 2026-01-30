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
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
      <Route
        path="/music"
        element={
          <MainLayout>
            <Music />
          </MainLayout>
        }
      />
      <Route
        path="/pictures"
        element={
          <MainLayout>
            <Pictures />
          </MainLayout>
        }
      />
      <Route
        path="/video/:videoId"
        element={
          <MainLayout>
            <VideoPlayer />
          </MainLayout>
        }
      />
      <Route
        path="/shorts"
        element={
          <MainLayout>
            <Shorts />
          </MainLayout>
        }
      />      
    </Routes>
  );
}

export default App;
