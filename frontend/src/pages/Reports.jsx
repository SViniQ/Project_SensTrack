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
} from '@chakra-ui/react'
import { FiFileText } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'

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

export default function Reports() {
  const [reports, setReports] = useState([])
  const bg = useColorModeValue('gray.50', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')

  useEffect(() => {
    fetchReports().then(data => setReports(data))
  }, [])

  const statuses = ['CONCLUIDO', 'PROCESSANDO', 'ERRO']
  const colorMap = {
    CONCLUIDO: 'green',
    PROCESSANDO: 'yellow',
    ERRO: 'red',
  }

  return (
    <Box px={6} py={4} bg={bg} minH="100vh">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
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
    </Box>
  )
}