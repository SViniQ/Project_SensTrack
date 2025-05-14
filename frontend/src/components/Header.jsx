import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

export default function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleLogout = () => {
    // limpa tokens etc.
    navigate('/')
  }

  // função pra destacar o link ativo
  const isActive = (path) => pathname === path

  return (
    <Flex
      justify="space-between"
      align="center"
      mb={6}
      p={4}
      borderBottom="1px solid"
      borderColor="gray.700"
    >
      <Box>
        <Heading size="lg" mb={1}>
          Dashboard
        </Heading>
        <Flex gap={6} mt={2}>
          <Link
            as={RouterLink}
            to="/dashboard"
            fontWeight="semibold"
            borderBottom={isActive('/dashboard') ? '2px solid' : 'none'}
            borderColor="blue.600"
          >
            Painel de controle
            <Box as="span" ml={1} px={2} bg="gray.600" color="white" borderRadius="full" fontSize="xs">
              2
            </Box>
          </Link>

          <Link
            as={RouterLink}
            to="/dashboard/sensores"
            fontWeight="semibold"
            color={isActive('/dashboard/sensores') ? 'blue.600' : 'gray.400'}
            borderBottom={isActive('/dashboard/sensores') ? '2px solid' : 'none'}
            borderColor="blue.600"
          >
            Sensores
            <Box as="span" ml={1} px={2} bg="gray.600" color="white" borderRadius="full" fontSize="xs">
              4
            </Box>
          </Link>

          <Link
            as={RouterLink}
            to="/dashboard/reports"
            fontWeight="semibold"
            color={isActive('/dashboard/reports') ? 'blue.600' : 'gray.400'}
            borderBottom={isActive('/dashboard/reports') ? '2px solid' : 'none'}
            borderColor="blue.600"
          >
            Reports
          </Link>

          <Link
            as={RouterLink}
            to="/dashboard/admin"
            fontWeight="semibold"
            color={isActive('/dashboard/admin') ? 'blue.600' : 'gray.500'}
          >
            Admin
          </Link>

          <Text color="gray.500">...</Text>
        </Flex>
      </Box>

      <Flex align="center" gap={4}>
        <InputGroup w={['100%', '250px']}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input type="text" placeholder="Buscar..." bg="white" />
        </InputGroup>

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaUserCircle size="24px" />}
            variant="ghost"
            aria-label="Conta do usuário"
          />
          <MenuList>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}