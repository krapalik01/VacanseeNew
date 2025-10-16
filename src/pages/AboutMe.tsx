import { Card, Text, Group, Title, Center, Image, Button } from '@mantine/core';
import { useState } from 'react';

const AboutMe = () => {
  const [img, setImg] = useState(false)
  return  (
  <Center>
    <Card shadow="sm" padding="lg" radius="md" withBorder w='658px' mt="24px">

      <Group justify="space-between" mt="md" mb="xs">
        <Title fw={500}>Ибрагимов Иса</Title>
              <Text size="lg">
                Привет! Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.
      </Text>
      <Button onClick={() => setImg(!img)}>Загадочная кнопка</Button>
       {img && (
            <Image
              src="/VacanseeNew/bro.png"
              alt="bigBro"
            />
          )}
      </Group>
    </Card>
    </Center>
)}

export default AboutMe