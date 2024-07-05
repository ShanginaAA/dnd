import Image from 'next/image';
import { ConstructorPage } from './main/constructor/page';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Container sx={{ height: '100vh' }}>
      <ConstructorPage />
    </Container>
  );
}
