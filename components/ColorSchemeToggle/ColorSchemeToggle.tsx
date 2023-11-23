'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl">
      <Button color='blue' onClick={() => setColorScheme('light')}>Light Mode</Button>
      <Button color='grape' onClick={() => setColorScheme('dark')}>Dark Mode</Button>
      <Button variant="gradient"
      gradient={{ from: 'grape', to: 'blue', deg: 163 }} onClick={() => setColorScheme('auto')}>Auto</Button>
    </Group>
  );
}
