import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Anoushka",
  description: "EN & PN Calculator"
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      {children}
    </main>
  );
};

export default RootLayout;
