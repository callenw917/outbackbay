import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../public/global.css';

export const metadata = {
  title: 'Outback Bay',
  description: "Where the 'back meets the bay",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
