import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

export default function Sensors() {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Página de Sensores
      </Heading>
      <Text>
        Esta é a página onde os sensores serão listados.
      </Text>
    </Box>
  )
}