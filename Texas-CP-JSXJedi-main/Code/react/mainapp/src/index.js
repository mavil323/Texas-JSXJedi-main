import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import NotFound from "./components/NotFound";
import ServiceCatalog from "./components/catalog";
import Homepage from "./components/HomePage";
import ChatBot from "./components/aiChatBot";
import Login from "./components/Login/login";
import { ChakraProvider } from "@chakra-ui/react";
import Learning from "./components/LearnigResources/learning";
import NavBar from "./components/Navigation/navbar";
import Footer from "./components/footer";

import CaseManagement from "./components/CaseManagement";


export default function Main() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />

              <Route path="/catalog" element={<ServiceCatalog />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/case-management" element={<CaseManagement />} />
              <Route path="*" element={<NotFound/>} />

            </Routes>
          </div>
          <Footer />
        </div>

        <ChatBot />
      </BrowserRouter>
    </ChakraProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);

reportWebVitals();
