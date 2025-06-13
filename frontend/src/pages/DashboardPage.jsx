import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Card,
  CardBody,
  Icon,
} from '@chakra-ui/react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { BsThermometerHalf, BsDroplet, BsClock } from 'react-icons/bs'
import Sensors from './Sensors'
import Reports from './Reports'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useBreakpointValue } from '@chakra-ui/react'

const insights = [
  { icon: BsThermometerHalf, label: 'Temperatura Atual', value: '27°C' },
  { icon: BsDroplet, label: 'Umidade Atual', value: '55%' },
  { icon: BsClock, label: 'Última Atualização', value: '14:32' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        bg="white"
        p={3}
        borderRadius="md"
        boxShadow="md"
        border="1px solid #ccc"
      >
        <Text fontWeight="bold">{label}</Text>
        {payload.map((entry) => (
          <Text key={entry.name} color={entry.color}>
            {entry.name}: {entry.value}
            {entry.name === 'Temperatura' ? '°C' : '%'}
          </Text>
        ))}
      </Box>
    )
  }
  return null
}

export default function DashboardPage() {
  const [data, setData] = useState([])

  // Função que simula busca e atualização de dados
  const fetchData = () => {
    const now = new Date()
    const hours = now.getHours()
    const newData = Array.from({ length: 6 }).map((_, i) => {
      const hour = (hours - (5 - i) + 24) % 24
      return {
        name: `${hour}h`,
        temperatura: 20 + Math.round(Math.random() * 10),
        umidade: 50 + Math.round(Math.random() * 20),
      }
    })
    setData(newData)
  }

  useEffect(() => {
    fetchData() // busca inicial

    const interval = setInterval(() => {
      fetchData() // atualiza a cada 30 segundos
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const bg = useColorModeValue('gray.100', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')

  const direction = useBreakpointValue({
    base: 'column',
    lg: 'row',
  })

  return (
    <Flex direction="column" minH="100vh" p={4} bg={bg}>
      <Box flex="1" p={4}>
        <Routes>
          <Route index element={<div>Painel de controle</div>} />
          <Route path="sensors" element={<Sensors />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </Box>

      <Flex direction={direction} gap={6} flex="1">
        <Box
          flex="2"
          minW="0"
          bg={cardBg}
          borderRadius="xl"
          p={4}
          boxShadow="md"
          height={{ base: '300px', md: '400px' }}
        >
          <Text
            fontSize={{ base: 'lg', md: '2xl' }}
            mb={6}
            fontWeight="bold"
            color="blue.600"
          >
            Temperatura e Umidade nas Últimas Horas
          </Text>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#8884d8"
                tick={{ fontSize: 14 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                stroke="#8884d8"
                tick={{ fontSize: 14 }}
                domain={['dataMin - 5', 'dataMax + 5']}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="temperatura"
                name="Temperatura"
                stroke="#3182CE"
                strokeWidth={3}
                dot={{ r: 6, strokeWidth: 2, stroke: '#3182CE', fill: '#fff' }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="umidade"
                name="Umidade"
                stroke="#38A169"
                strokeWidth={3}
                dot={{ r: 6, strokeWidth: 2, stroke: '#38A169', fill: '#fff' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Flex direction="column" flex="1" minW="0" gap={4}>
          {insights.map(({ icon, label, value }) => (
            <Card key={label} bg={cardBg} borderRadius="xl" boxShadow="md">
              <CardBody>
                <Flex align="center" gap={4}>
                  <Icon as={icon} boxSize={6} color="blue.500" />
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      {label}
                    </Text>
                    <Text fontSize="xl" fontWeight="bold">
                      {value}
                    </Text>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          ))}

          <Box
            bg={cardBg}
            borderRadius="xl"
            boxShadow="md"
            p={4}
            mt={4}
            flex="1"
            maxH="350px"
            overflowY="auto"
            sx={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
            }}
          >
            <Text fontSize="lg" mb={4} fontWeight="semibold" textAlign="center">
              Insights Gerados
            </Text>
            <Box display="flex" flexDirection="column" gap={3}>
              {[
                'A umidade está muito alta, recomenda-se reduzir a potência dos humidificadores.',
                'A temperatura está aumentando muito, recomenda-se reduzir a temperatura do ar-condicionado.',
                'A temperatura está muito baixa, recomenda-se aumentar a temperatura do ar-condicionado.',
                'A umidade está aumentando, recomenda-se reduzir a potência dos humidificadores.',
                'A temperatura está baixa, recomenda-se colocar o ar-condicionado em 25 °C.',
              ].map((msg, idx) => (
                <Box key={idx} bg="gray.600" p={3} borderRadius="md">
                  <Text fontSize="sm" color="gray.100">
                    {msg}
                  </Text>
                  <Text
                    fontSize="xs"
                    textAlign="right"
                    color="gray.400"
                    mt={1}
                  >
                    {new Date(Date.now() - idx * 3600000).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}