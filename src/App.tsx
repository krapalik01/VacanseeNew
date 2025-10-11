import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import VacanciesPage from './pages/VacanciesPage';
import VacancyPage from './pages/VacancyPage';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Главная страница перенаправит на /vacancies */}
        <Route path="/" element={<Navigate to="/VacanseeNew/vacancies" replace />} />
        {/* Страница со списком вакансий */}
        <Route path="/VacanseeNew/vacancies" element={<VacanciesPage />} />
        {/* Страница с деталями вакансии */}
        <Route path="/VacanseeNew/vacancies/:id" element={<VacancyPage />} />
        {/* В некст задании допилим */}
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </>
  );
}
export default App;
