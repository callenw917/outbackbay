import { Welcome } from '../components/Welcome/Welcome';
import 'public/global.css';
import { Button } from '@mantine/core';

export default function HomePage() {
  return (
    <>
      <div className="mainArea">
        <Welcome />
        <Button component="a" href="/spells" variant="outline">
          Spell Library
        </Button>
      </div>
    </>
  );
}
