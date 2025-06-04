import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import Header from '../components/Header'

export default function DashboardLayout() {
  return (
    <Flex direction="column" minH="100vh" bg="gray.100">
      <Header />
      <Box p={4}>
        <Outlet />
      </Box>
    </Flex>
  )
}