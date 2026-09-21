import {Route, Routes} from "react-router-dom"
import BoardsPage from "./pages/BoardsPage";
import BoardPage from "./pages/BoardPage";
import Header from "./components/Header";

const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/boards" element={<BoardsPage/>} />
      <Route path="/boards/:boardId" element={<BoardPage />} />
    </Routes>
    </>
  )
}

export default App



