import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import VacanciesPage from './pages/VacanciesPage';
import VacancyPage from './pages/VacancyPage';
import EmptyPage from './pages/EmptyPage';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from './components/Layout';
import AboutMe from './pages/AboutMe';

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
      <Routes>
        <Route path='/' element={<Layout />}>
        {/* Главная страница перенаправит на /vacancies */}
        <Route path="/" element={<Navigate to="/VacanseeNew/vacancies" replace />} />
        {/* Страница со списком вакансий */}
        <Route path="/VacanseeNew/vacancies" element={<VacanciesPage />} />
        {/* Страница с деталями вакансии */}
        <Route path="/VacanseeNew/vacancies/:id" element={<VacancyPage />} />
        {/* Обо мне */}
        <Route path='/VacanseeNew/about' element={<AboutMe />}/>
        {/* Несуществующая страница */}
        <Route path="*" element={<EmptyPage/>} />
        </Route>
      </Routes>
    </ErrorBoundary>
      
    </>
  );
}
export default App;
