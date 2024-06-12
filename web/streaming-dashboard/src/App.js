import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryList from './pages/category';
import WorksList from './pages/Works';
import GenderList from './pages/gender';
import HomePage from './pages/home';
import { NavbarBootstrap } from './components/navbar/navbar-bootstrap';
import DirectorList from './pages/director';
import ActorList from './pages/actor';
import CategoryManage from './pages/category/manage';
import GenderManage from './pages/gender/manage';
import ActorManage from './pages/actor/manage';
import DirectorManage from './pages/director/manage';
import WorksManager from './pages/Works/manager';


function App() {
  return (
    <Router>
        <NavbarBootstrap />
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            
            <Route path="/categorias" element={<CategoryList />} />
            <Route path="/categorias/gerenciar" element={<CategoryManage />} />
            <Route path="/categorias/gerenciar/:id" element={<CategoryManage />} />
            
            <Route path="/generos" element={<GenderList />} />
            <Route path="/generos/gerenciar" element={<GenderManage />} />
            <Route path="/generos/gerenciar/:id" element={<GenderManage />} />

            <Route path="/atores" element={<ActorList />} />
            <Route path="/atores/gerenciar" element={<ActorManage />} />
            <Route path="/atores/gerenciar/:id" element={<ActorManage />} />
            
            <Route path="/diretores" element={<DirectorList />} />
            <Route path="/diretores/gerenciar" element={<DirectorManage />} />
            <Route path="/diretores/gerenciar/:id" element={<DirectorManage />} />

            <Route path="/works" element={<WorksList />} />
            <Route path="/works/gerenciar" element={<WorksManager />} />
            <Route path="/works/gerenciar/:id" element={<WorksManager />} />
        </Routes>
    </Router>
);
}

export default App;
