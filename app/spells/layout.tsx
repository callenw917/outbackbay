import StateProvider from './state-provider';

export default function RootLayout({ children }: { children: any }) {
  return (
    <>
      <StateProvider>{children}</StateProvider>
    </>
  );
}
