import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Nav from "./components/Nav";

const App = () => {
  return (
    <>
      <Nav />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
