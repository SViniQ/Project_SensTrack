// src/pages/DashboardPage.jsx
import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Card,
  CardBody,
  useColorModeValue,
  Image
} from '@chakra-ui/react'
import { SearchIcon} from '@chakra-ui/icons'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { BsThermometerHalf, BsDroplet, BsClock } from 'react-icons/bs'
import Sensors from './Sensors'
import Reports from './Reports'
import { Routes, Route, Navigate } from 'react-router-dom'


const data = [
  { name: '00h', temperatura: 22, umidade: 60 },
  { name: '04h', temperatura: 21, umidade: 63 },
  { name: '08h', temperatura: 23, umidade: 58 },
  { name: '12h', temperatura: 27, umidade: 52 },
  { name: '16h', temperatura: 28, umidade: 49 },
  { name: '20h', temperatura: 25, umidade: 55 },
]

const insights = [
  { icon: BsThermometerHalf, label: 'Temperatura Atual', value: '27°C' },
  { icon: BsDroplet, label: 'Umidade Atual', value: '55%' },
  { icon: BsClock, label: 'Última Atualização', value: '14:32' },
]

export default function DashboardPage() {
  const bg = useColorModeValue('gray.100', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')

  return (
    <Flex direction="column" minH="100vh" p={4} bg={bg}>
      <Box flex="1" p={4}>
        <Routes>
          {/* Index do /dashboard */}
          <Route index element={<div>Painel de controle</div>} />

          {/* /dashboard/sensores */}
          <Route index element={<Sensors />} />

          {/* /dashboard/reports */}
          <Route index element={<Reports />} />

          {/* Qualquer outra rota volta pro index */}
          <Route index element={<Navigate to="" replace />} />
        </Routes>
      </Box>

      {/* Main content */}
      <Flex direction={['column', 'row']} gap={6} flex="1">
        {/* Chart Section */}
        <Box flex="2" bg={cardBg} borderRadius="xl" p={4} boxShadow="md">
          <Text fontSize="lg" mb={4} fontWeight="semibold">
            Temperatura e umidade nas Últimas Horas
          </Text>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="temperatura" stroke="#E53E3E" strokeWidth={2} />
              <Line type="monotone" dataKey="umidade" stroke="#3182CE" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Insights */}
        <Flex direction="column" flex="1" gap={4}>
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
          {/* Painel de Insights Gerados */}
          <Box bg={cardBg} borderRadius="xl" boxShadow="md" p={4} mt={4} flex="1" maxH="350px" overflowY="auto" sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          }}>
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
                  <Text fontSize="xs" textAlign="right" color="gray.400" mt={1}>
                    {new Date(Date.now() - idx * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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