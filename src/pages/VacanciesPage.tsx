import Search from '../components/Search';
import CitySelect from '../components/CitySelect';
import KeySkills from '../components/KeySkills';
import CardVacList from '../components/CardVacList';

import {
  MantineProvider,
  Container,
  Divider,
  Pagination,
  Stack,
  Flex,
} from '@mantine/core';
import '@mantine/core/styles.css';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchVacancies, setCurrentPage } from '../store/vacanciesSlice';
import { setFilter } from '../store/vacanciesSlice';
import type { CityKey } from '../types/vacancy';
import { useSearchParams } from 'react-router-dom';

function VacanciesPage() {
  const dispatch = useAppDispatch();
  const { filters, currentPage, totalPages } = useAppSelector(
    (state) => state.vacancies
  );
  const skills = filters.snippetRequirement || [];
  const cityMap = { '': '', Москва: '1', 'Санкт-Петербург': '2' };

  const [searchParams, setSearchParams] = useSearchParams();

  // Локальные состояния для управления input и селектом
  const initialSearchText = searchParams.get('searchText') || '';
  const initialCity = searchParams.get('city') || '';

  const [searchText, setSearchText] = useState(initialSearchText);
  const [city, setCity] = useState(initialCity);

  // Синхронизация локальных значений с URL при каждом вводе (без запуска загрузки)
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchText.trim()) params.set('searchText', searchText.trim());
    if (city) params.set('city', city);
    setSearchParams(params);
  }, [searchText, city, setSearchParams]);

  // Загрузка вакансий при изменении фильтров из Redux
  useEffect(() => {
    const baseParams = new URLSearchParams();

    if (filters.searchText?.trim()) {
      baseParams.append('text', filters.searchText.trim());
    }

    baseParams.append('skill_set', skills.join(' '));

    const cityId =
      filters.city && filters.city in cityMap
        ? cityMap[filters.city as CityKey]
        : '';
    if (cityId) baseParams.append('area', cityId);

    const safePage =
      Number.isInteger(currentPage) && currentPage > 0 ? currentPage - 1 : 0;
    baseParams.append('per_page', '10');
    baseParams.append('page', safePage.toString());

    // Запросы по name и company_name
    dispatch(fetchVacancies(baseParams.toString() + '&search_field=name'));
    dispatch(
      fetchVacancies(baseParams.toString() + '&search_field=company_name')
    );
  }, [dispatch, filters, currentPage, skills]);

  // При нажатии на кнопку "Найти" обновляем фильтры redux, что запустит загрузку
  const handleSearchClick = () => {
    dispatch(setFilter({ searchText }));
    dispatch(setCurrentPage(1)); // сброс страницы
  };

  const handleCityChange = (newCity: string | null) => {
    const cityKey: CityKey =
      newCity && newCity in cityMap ? (newCity as CityKey) : '';
    setCity(newCity || ''); // обновляем локальный стейт для отображения
    dispatch(setFilter({ city: cityKey })); // обновляем redux
    dispatch(setCurrentPage(1)); // сброс пагинации при смене фильтра
  };

  const handleSkillsChange = (newSkills: string[]) => {
    dispatch(setFilter({ snippetRequirement: newSkills }));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <MantineProvider>
      <Container mb="24" size={1000} p="0">
        <Search
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={handleSearchClick}
        />
      </Container>
      <Divider mb="24" />
      <Container size={1000} p="0">
        <Flex gap="24">
          <Stack align="center">
            <KeySkills skills={skills} onChange={handleSkillsChange} />
            <CitySelect city={city} setCity={handleCityChange} />
          </Stack>
          <Stack gap="0" style={{ width: '100%' }}>
            <CardVacList />
            <Flex justify="center">
              <Pagination
                mb="64"
                total={totalPages}
                value={currentPage}
                onChange={handlePageChange}
              />
            </Flex>
          </Stack>
        </Flex>
      </Container>
    </MantineProvider>
  );
}

export default VacanciesPage;
