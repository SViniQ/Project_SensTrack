import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Text,
  Stack,
  Badge,
  IconButton,
  Flex,
  Spacer,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure
} from '@chakra-ui/react'
import api from '../services/api'
import { FiFileText } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { format } from 'date-fns'

// Simulando dados 
const fetchReports = async () => {
  return [
    { id: 101, status: 'CONCLUIDO', categoria: 'Temperatura', periodo: 'Ultimas 24h' },
    { id: 102, status: 'CONCLUIDO', categoria: 'Umidade', periodo: 'Ultimas 24h' },
    { id: 103, status: 'PROCESSANDO', categoria: 'Temperatura', periodo: 'Semana atual' },
    { id: 104, status: 'PROCESSANDO', categoria: 'Umidade', periodo: 'Semana atual' },
    { id: 105, status: 'ERRO', categoria: 'Temperatura', periodo: 'Mês atual' },
    { id: 106, status: 'ERRO', categoria: 'Umidade', periodo: 'Mês atual' },
  ]
}

const fetchSensorReadings = async () => {
  return [
    { timestamp: '2025-06-10 10:00', temperature: 22.5, humidity: 55 },
    { timestamp: '2025-06-10 11:00', temperature: 23.1, humidity: 57 },
    { timestamp: '2025-06-10 12:00', temperature: 24.3, humidity: 59 },
    { timestamp: '2025-06-10 13:00', temperature: 25.0, humidity: 60 },
    { timestamp: '2025-06-10 14:00', temperature: 25.2, humidity: 58 },
    { timestamp: '2025-06-10 15:00', temperature: 24.8, humidity: 56 },
    { timestamp: '2025-06-10 16:00', temperature: 24.1, humidity: 55 },
    { timestamp: '2025-06-10 17:00', temperature: 23.5, humidity: 54 },
    { timestamp: '2025-06-10 18:00', temperature: 22.9, humidity: 52 },
    { timestamp: '2025-06-10 19:00', temperature: 22.2, humidity: 51 },
  ]
}

export default function Reports() {
  const [reports, setReports] = useState([])
  const [readings, setReadings] = useState([])
  const [analysisResult, setAnalysisResult] = useState(null)
  const [analysisLoading, setAnalysisLoading] = useState(true)
  const [analysisError, setAnalysisError] = useState(null)
  const bg = useColorModeValue('gray.50', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    fetchReports().then(data => setReports(data))
    fetchSensorReadings().then(data => setReadings(data))

    const fetchAnalysis = async () => {
      try {
        setAnalysisLoading(true)
        const response = await api.get('/analysis/temperature')
        setAnalysisResult(response.data)
        setAnalysisError(null)
      } catch (err) {
        setAnalysisError(err?.response?.data?.message || 'Erro ao buscar análise')
      } finally {
        setAnalysisLoading(false)
      }
    }
    fetchAnalysis()
  }, [])

  const statuses = ['CONCLUIDO', 'PROCESSANDO', 'ERRO']
  const colorMap = {
    CONCLUIDO: 'green',
    PROCESSANDO: 'yellow',
    ERRO: 'red',
  }

  return (
    <>
      <Box px={6} py={4} bg={bg} minH="100vh" maxW="1200px" mx="auto">
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={6}>
          {statuses.map(status => (
            <Box key={status}>
              <Text fontSize="lg" fontWeight="semibold" mb={3}>
                Status - {status}
              </Text>
              <Stack spacing={4}>
                {reports
                  .filter(r => r.status === status)
                  .map(report => (
                    <Box
                      key={report.id}
                      bg={cardBg}
                      p={4}
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      <Flex align="center">
                        <Badge colorScheme={colorMap[status]}>
                          {status}
                        </Badge>
                        <Spacer />
                        <IconButton
                          size="sm"
                          variant="ghost"
                          icon={<BsThreeDotsVertical />}
                          aria-label="Opções"
                        />
                      </Flex>

                      <Stack mt={3} spacing={1}>
                        <Text fontSize="sm">ID: {report.id}</Text>
                        <Text fontSize="sm">categoria - {report.categoria}</Text>
                        <Text fontSize="sm">Período - {report.periodo}</Text>
                      </Stack>

                      <Flex mt={3}>
                        <Spacer />
                        <IconButton
                          size="sm"
                          variant="ghost"
                          icon={<FiFileText />}
                          aria-label="Ver Relatório"
                        />
                      </Flex>
                    </Box>
                  ))}
              </Stack>
            </Box>
          ))}
        </Grid>

        <Box bg={cardBg} p={6} mt={10} borderRadius="md" boxShadow="md">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Gráfico de Leituras (Últimos 10 Registros)
          </Text>

          {readings.length === 0 ? (
            <Text>Sem dados disponíveis.</Text>
          ) : (
            <Box height="300px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={readings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(str) => {
                      const date = new Date(str)
                      return format(date, 'dd/MM HH:mm')
                    }}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(label) => {
                      const date = new Date(label)
                      return format(date, 'dd/MM/yyyy HH:mm')
                    }}
                    formatter={(value, name) => [`${value}`, name === 'temperature' ? 'Temperatura' : 'Umidade']}
                  />
                  <Line type="monotone" dataKey="temperature" stroke="#8884d8" dot />
                  <Line type="monotone" dataKey="humidity" stroke="#82ca9d" dot />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}

          <Box mt={10}>
            <Button onClick={onOpen} colorScheme="blue">
              Ver Análise Automatizada
            </Button>
          </Box>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Análise Automatizada de Temperatura</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {analysisLoading && <Spinner size="lg" />}

            {analysisError && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {analysisError}
              </Alert>
            )}

            {analysisResult && (
              <>
                <Text fontSize="lg" mb={2}>{analysisResult.message}</Text>
                {analysisResult.timestamp && (
                  <Text fontSize="sm" color="gray.500">
                    Data/Hora da Análise: {format(new Date(analysisResult.timestamp), 'dd/MM/yyyy HH:mm:ss')}
                  </Text>
                )}
              </>
            )}

            {!analysisLoading && !analysisError && !analysisResult && (
              <Text>Nenhum resultado disponível no momento.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}