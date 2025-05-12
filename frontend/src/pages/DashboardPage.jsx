// src/pages/DashboardPage.jsx
import { Box, SimpleGrid, Heading, Button, useColorMode } from '@chakra-ui/react';
import CardSensor from '../components/CardSensor';
import { sensorData } from '../dataMock';

export default function DashboardPage() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p={6}>
      <Heading mb={4}>SenseTrack – Dashboard</Heading>
      <Button onClick={toggleColorMode} mb={6}>
        Modo {colorMode === 'light' ? 'Escuro' : 'Claro'}
      </Button>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        <CardSensor tipo="temperatura" valor={`${sensorData.temperatura} °C`} />
        <CardSensor tipo="umidade" valor={`${sensorData.umidade} %`} />
        <CardSensor tipo="co2" valor={`${sensorData.co2} ppm`} />
      </SimpleGrid>
    </Box>
  );
}