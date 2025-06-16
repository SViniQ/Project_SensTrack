import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Card,
  CardBody,
  Icon,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BsThermometerHalf, BsDroplet, BsClock } from 'react-icons/bs';
import { format } from 'date-fns';
import { listarDadosSensores, buscarDadosMedios } from '../services/sensorDataService';

// Componente de Tooltip customizado para o gráfico
const CustomTooltip = ({ active, payload }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (active && payload && payload.length) {
    return (
      <Box
        bg={cardBg}
        p={3}
        borderRadius="md"
        boxShadow="md"
        border="1px solid"
        borderColor={borderColor}
      >
        <Text fontWeight="bold">{payload[0].payload.fullTimestamp}</Text>
        {payload.map((entry) => (
          <Text key={entry.name} color={entry.color}>
            {entry.name}: {entry.value}
            {entry.name === 'Temperatura' ? '°C' : '%'}
          </Text>
        ))}
      </Box>
    );
  }
  return null;
};

export default function DashboardPage() {
  // ==================================================================
  // PASSO 1: Todas as chamadas de Hooks devem estar aqui no topo.
  // ==================================================================
  const [summary, setSummary] = useState(null);
  const [historicData, setHistoricData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hooks do Chakra UI também devem estar no topo
  const cardBg = useColorModeValue('white', 'gray.700');
  const gridStroke = useColorModeValue('#e0e0e0', '#4a5568');

  // ==================================================================
  // PASSO 2: O useEffect para buscar dados.
  // ==================================================================
  useEffect(() => {
    const carregarDadosDoBackend = async () => {
      try {
        setLoading(true); // Inicia o loading a cada busca
        const [dadosMedios, todosOsDados] = await Promise.all([
          buscarDadosMedios(),
          listarDadosSensores(),
        ]);

        setSummary(dadosMedios);

        const dadosFormatados = todosOsDados.map(dado => ({
          name: format(new Date(dado.timestamp), 'HH:mm'),
          temperatura: dado.temperature,
          umidade: dado.humidity,
          fullTimestamp: format(new Date(dado.timestamp), 'dd/MM/yyyy HH:mm:ss'),
        }));
        setHistoricData(dadosFormatados);
        
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err);
        setError("Não foi possível carregar os dados. Verifique se o back-end está rodando e acessível.");
      } finally {
        setLoading(false);
      }
    };

    carregarDadosDoBackend();
    const intervalId = setInterval(carregarDadosDoBackend, 30000);
    return () => clearInterval(intervalId);
  }, []);

  // ==================================================================
  // PASSO 3: Agora sim, os retornos condicionais.
  // ==================================================================
  if (loading && historicData.length === 0) { // Mostra o spinner apenas no carregamento inicial
    return (
      <Flex justify="center" align="center" minH="80vh">
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  // ==================================================================
  // PASSO 4: O return principal do componente.
  // ==================================================================
  return (
    <Flex direction="column" gap={6}>
      {/* Cards de Resumo */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <Card flex="1" bg={cardBg} borderRadius="xl" boxShadow="md">
          <CardBody>
            <Flex align="center" gap={4}>
              <Icon as={BsThermometerHalf} boxSize={6} color="blue.500" />
              <Box>
                <Text fontSize="sm" color="gray.500">Temperatura Média (últimas 10)</Text>
                <Text fontSize="xl" fontWeight="bold">
                  {summary ? `${summary.averageTemperature.toFixed(1)}°C` : '...'}
                </Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>
        <Card flex="1" bg={cardBg} borderRadius="xl" boxShadow="md">
          <CardBody>
            <Flex align="center" gap={4}>
              <Icon as={BsDroplet} boxSize={6} color="blue.500" />
              <Box>
                <Text fontSize="sm" color="gray.500">Umidade Média (últimas 10)</Text>
                <Text fontSize="xl" fontWeight="bold">
                  {summary ? `${summary.averageHumidity.toFixed(1)}%` : '...'}
                </Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>
        <Card flex="1" bg={cardBg} borderRadius="xl" boxShadow="md">
          <CardBody>
            <Flex align="center" gap={4}>
              <Icon as={BsClock} boxSize={6} color="blue.500" />
              <Box>
                <Text fontSize="sm" color="gray.500">Atualizado em</Text>
                <Text fontSize="xl" fontWeight="bold">
                  {format(new Date(), 'HH:mm:ss')}
                </Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </Flex>

      {/* Gráfico Histórico */}
      <Box bg={cardBg} borderRadius="xl" p={4} boxShadow="md" height="400px">
        <Text fontSize={{ base: 'lg', md: '2xl' }} mb={6} fontWeight="bold" color="blue.600">
          Histórico de Temperatura e Umidade
        </Text>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={historicData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="name" stroke="#8884d8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#8884d8" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="temperatura"
              name="Temperatura"
              stroke="#3182CE"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="umidade"
              name="Umidade"
              stroke="#38A169"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Flex>
  );
}