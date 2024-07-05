import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Container, Box, Link, Paper } from '@mui/material';

export default function ConstructorLayout({ children }: { children: ReactNode }) {
  return <Box>{children}</Box>;
}
