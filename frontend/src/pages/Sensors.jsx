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
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getSensors } from '../services/sensorService'

const enviarLeituraManual = async (dados) => {
  console.log('Enviando leitura:', dados)
  return new Promise((resolve) => setTimeout(resolve, 1000)) // simulação
}

export default function Sensors() {
  const [sensors, setSensors] = useState([])
  const [error, setError] = useState(null)
  const bg = useColorModeValue('gray.50', 'gray.800')
  const cardBg = useColorModeValue('#ffffff', '#1A202C')

  const [formData, setFormData] = useState({
    sensorId: '',
    valor: '',
    dataHora: ''
  })

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await enviarLeituraManual(formData)
      toast({
        title: 'Leitura enviada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setFormData({ sensorId: '', valor: '', dataHora: '' })
    } catch (error) {
      toast({
        title: 'Erro ao enviar leitura.',
        description: error.message || 'Tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const data = await getSensors()
        setSensors(data)
        setError(null) // limpa erro caso tenha
      } catch (error) {
        console.error('Erro ao buscar sensores:', error)
        setError('Não foi possível carregar os sensores. Tente novamente mais tarde.')
      }
    }

    fetchSensors()
  }, [])

  const statuses = ['ATIVO', 'SUSPENSO', 'ERRO']
  const colorMap = { ATIVO: 'green', SUSPENSO: 'yellow', ERRO: 'red' }

  return (
    <Box px={6} py={4} bg={bg} minH="100vh">
      {error && (
        <Alert status="error" mb={6} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
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

                    <Stack mt={2} spacing={1}>
                      <Text fontSize="sm"><strong>ID:</strong> {sensor.id}</Text>
                      <Text fontSize="sm"><strong>Nome:</strong> {sensor.modelo}</Text>
                      <Text fontSize="sm"><strong>Categoria:</strong> {sensor.categoria}</Text>
                      <Text fontSize="sm">
                        <strong>Última leitura:</strong>{' '}
                        {Array.isArray(sensor.leituras) && sensor.leituras.length > 0
                          ? `${sensor.leituras.at(-1).valor} ${sensor.leituras.at(-1).unidade || ''}`.trim()
                          : 'Sem dados'}
                      </Text>
                    </Stack>
                  </Box>
                ))}
            </Stack>
          </Box>
        ))}
      </Grid>
      <Box position="fixed" bottom={6} right={6} zIndex={10}>
        <Button onClick={onOpen} colorScheme="blue">+</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enviar leitura manual</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <FormControl mb={3} isRequired>
                  <FormLabel>ID do Sensor</FormLabel>
                  <Input name="sensorId" value={formData.sensorId} onChange={handleChange} />
                </FormControl>
                <FormControl mb={3} isRequired>
                  <FormLabel>Valor</FormLabel>
                  <Input name="valor" value={formData.valor} onChange={handleChange} />
                </FormControl>
                <FormControl mb={3} isRequired>
                  <FormLabel>Data e Hora</FormLabel>
                  <Input type="datetime-local" name="dataHora" value={formData.dataHora} onChange={handleChange} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" colorScheme="blue" onClick={onClose}>
                  Enviar
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  )
}