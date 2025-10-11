import { useAppSelector } from '../store/hooks';
import { useParams, Link } from 'react-router-dom';
import CardVacancyDetail from '../components/CardVacancyDetail';
import { Card, Text, Container } from '@mantine/core';

const VacancyPage = () => {
  const { id } = useParams<{ id: string }>();
  const vacancy = useAppSelector((state) =>
    state.vacancies.items.find((vac) => String(vac.id) === id)
  );

  if (!vacancy) {
    return <div>Вакансия не найдена</div>;
  }

  return (
    <Container size="658" mt="24">
      <CardVacancyDetail
        id={vacancy.id}
        title={vacancy.name}
        salary={
          typeof vacancy.salary === 'string'
            ? vacancy.salary
            : vacancy.salary
            ? `${vacancy.salary.from ?? ''}–${vacancy.salary.to ?? ''} ${
                vacancy.salary.currency ?? ''
              }`.trim()
            : ''
        }
        experience={
          typeof vacancy.experience === 'string'
            ? vacancy.experience
            : vacancy.experience?.name ?? ''
        }
        company={vacancy.employer?.name}
        work_format={vacancy.work_format}
        location={vacancy.area?.name}
        url={vacancy.alternate_url}
      />
      <Card w="658" mt={29} padding={24} radius="md">
        <Text fw={600} size="lg" mb={8}>
          Компания
        </Text>
        <Text mb={8}>{vacancy.employer?.name || 'Не указано'}</Text>
        <Text fw={600} size="md" mt={16} mb={8}>
          О проекте:
        </Text>
        {/* Ну хер его знает где этот дескрипшен взять в апи hhru c "О проекте" тоже самое */}
        <Text>{vacancy.description?.name || 'Нет описания'}</Text>
      </Card>
      <Link to="/">← К списку</Link>
    </Container>
  );
};

export default VacancyPage;
