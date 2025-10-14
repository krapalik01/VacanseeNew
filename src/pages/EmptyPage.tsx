import { Card, Image, Text, Button, Group, Title, Center } from '@mantine/core';
import { Link } from 'react-router-dom';

const EmptyPage = () => {
   
return (
    <Center>
    <Card shadow="sm" padding="lg" radius="md" withBorder w='707' mt="72px">

 <Group wrap='nowrap' p="lg">
      <Group justify="space-between" mt="md" mb="xs">
        <Title fw={500}>Упс! Такой страницы не существует</Title>
              <Text size="lg">
                Давайте перейдём к началу.
      </Text>
      </Group>

      <Button color="blue" w='210px' h='42px' radius="md" component={Link}
          to={`/VacanseeNew/vacancies`}>
        На главную
      </Button>
      </Group>
              <Image
          src="/VacanseeNew/Frog.gif"
          alt="Frog"
        />
    </Card>
    </Center>
  );
}

export default EmptyPage