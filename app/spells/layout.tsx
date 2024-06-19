import Header from '@/components/Header/Header';
import StateProvider from './state-provider';

export default function RootLayout({ children }: { children: any }) {
  return (
    <>
      <StateProvider>
        <Header></Header>
        {children}
      </StateProvider>
    </>
  );
}
