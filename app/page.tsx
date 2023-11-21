import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { SpellLevelSelector } from '@/components/SpellLevelSelector/SpellLevelSelector';

export default function HomePage() {
  return (
    <>
      <SpellLevelSelector/>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
