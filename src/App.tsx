import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import VacanciesPage from './pages/VacanciesPage';
import VacancyPage from './pages/VacancyPage';
import Header from './components/Header';
import EmptyPage from './pages/EmptyPage';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: any) {
  return (
    <div>
      <p>Произошла ошибка:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function App() {
  return (
    <>
     <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header />
      <Routes>
        {/* Главная страница перенаправит на /vacancies */}
        <Route path="/" element={<Navigate to="/VacanseeNew/vacancies" replace />} />
        {/* Страница со списком вакансий */}
        <Route path="/VacanseeNew/vacancies" element={<VacanciesPage />} />
        {/* Страница с деталями вакансии */}
        <Route path="/VacanseeNew/vacancies/:id" element={<VacancyPage />} />
        {/* В некст задании допилим */}
        <Route path="*" element={<EmptyPage/>} />
      </Routes>
    </ErrorBoundary>
      
    </>
  );
}
export default App;
