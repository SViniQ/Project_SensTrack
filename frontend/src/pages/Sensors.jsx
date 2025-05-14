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
import { FiTool } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'
//import axios from 'axios'

// galera,Se for usar em uma chamada real,usa o axios:
const fetchSensors = async () => {
  // return await axios.get('/api/sensors')
  return [
    { id: 4957, status: 'ATIVO', modelo: 'ESP32', categoria: 'Umidade' },
    { id: 2484, status: 'ATIVO', modelo: 'ESP32', categoria: 'Temperatura' },
    { id: 6986, status: 'ATIVO', modelo: 'ESP32', categoria: 'Temperatura' },
    { id: 3265, status: 'ATIVO', modelo: 'ESP32', categoria: 'Temperatura' },
    { id: 5632, status: 'SUSPENSO', modelo: 'ESP32', categoria: 'Temperatura' },
    { id: 1593, status: 'SUSPENSO', modelo: 'ESP32', categoria: 'Temperatura' },
    { id: 3571, status: 'ERRO', modelo: 'ESP32', categoria: 'Temperatura' },
    { id: 6589, status: 'ERRO', modelo: 'ESP32', categoria: 'Temperatura' },
    { id: 5437, status: 'ERRO', modelo: 'ESP32', categoria: 'Umidade' },
  ]
}

export default function Sensors() {
  const [sensors, setSensors] = useState([])
  const bg = useColorModeValue('gray.50', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')

  useEffect(() => {
    fetchSensors().then(data => setSensors(data))
  }, [])

  const statuses = ['ATIVO', 'SUSPENSO', 'ERRO']
  const colorMap = { ATIVO: 'green', SUSPENSO: 'yellow', ERRO: 'red' }

  return (
    <Box px={6} py={4} bg={bg} minH="100vh">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {statuses.map(status => (
          <Box key={status}>
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Status - {status}
            </Text>
            <Stack spacing={4}>
              {sensors
                .filter(s => s.status === status)
                .map(sensor => (
                  <Box
                    key={sensor.id}
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
                      <Text fontSize="sm">ID: {sensor.id}</Text>
                      <Text fontSize="sm">Modelo - {sensor.modelo}</Text>
                      <Text fontSize="sm">Categoria - {sensor.categoria}</Text>
                    </Stack>

                    <Flex mt={3}>
                      <Spacer />
                      <IconButton
                        size="sm"
                        variant="ghost"
                        icon={<FiTool />}
                        aria-label="Ações"
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