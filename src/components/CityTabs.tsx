import { Tabs } from '@mantine/core';
import type { CitySelectProps } from '../types/vacancy';

const cityData = [
  { value: 'Все города', label: 'Все города' }, // лучше оставить))) если строго по макету, то эту строку стереть
  { value: 'Москва', label: 'Москва' },
  { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
];

function CityTabs({city, setCity}: CitySelectProps) {
  return (
    <Tabs mb='22' value={city} onChange={setCity}>
      <Tabs.List >
        {cityData.map((item) => (
            <Tabs.Tab key={item.value} value={item.value}>
                {item.value}
            </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}

export default CityTabs