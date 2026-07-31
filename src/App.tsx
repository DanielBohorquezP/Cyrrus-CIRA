import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import Home from "@/pages/Home";
import MetodoCira from "@/pages/MetodoCira";
import IntelligenceLab from "@/pages/IntelligenceLab";
import LeadershipAcademy from "@/pages/LeadershipAcademy";
import Experiencia from "@/pages/Experiencia";
import Perspectivas from "@/pages/Perspectivas";
import Contacto from "@/pages/Contacto";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metodo-cira" element={<MetodoCira />} />
        <Route path="/intelligence-lab" element={<IntelligenceLab />} />
        <Route path="/leadership-academy" element={<LeadershipAcademy />} />
        <Route path="/experiencia" element={<Experiencia />} />
        <Route path="/perspectivas" element={<Perspectivas />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}
