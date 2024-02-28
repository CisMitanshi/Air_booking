import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Book from "./pages/Book";
import BookedFlight from "./pages/BookedFlights";
import Home from "./pages/home";
import Login from "./pages/login";
import Registration from "./pages/registration";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/book" element={<Book />} />
        <Route path="/booked" element={<BookedFlight />} />
      </Routes>
    </Router>
  );
};
export default App;
