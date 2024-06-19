import { Welcome } from '../components/Welcome/Welcome';
import { SignIn } from '../components/UserManagement/SignIn';
import { Card, CardSection, Image, Text, Badge, Button, Group } from '@mantine/core';

export default function HomePage() {
  return (
    <>
      <div className="mainArea">
        <Welcome />
        <div className="appArea">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Pyr-Yin's Spell Library</Text>
              <Badge color="pink">New!</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              View and manage a list of spells.
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md" component="a" href="/spells">
              Spell Library
            </Button>

            <SignIn />
          </Card>
        </div>
      </div>
    </>
  );
}
