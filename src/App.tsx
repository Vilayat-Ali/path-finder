import { lazy, Suspense } from "react";
import {Routes, Route} from "react-router-dom";

// pages
const HomePage = lazy(() => import("./pages/Home"));
const Playground = lazy(() => import("./pages/Play"));
const Dev = lazy(() => import("./pages/Dev"));

// components
import Loader from "./components/Loader";

const App = () => (
    <Routes>
      <Route index element={<Suspense fallback={<Loader />}><HomePage /></Suspense>} />
      <Route path="/play" element={<Suspense fallback={<Loader />}><Playground /></Suspense>} />
      <Route path="/dev" element={<Suspense fallback={<Loader />}><Dev /></Suspense>} />
    </Routes>
)

export default App;