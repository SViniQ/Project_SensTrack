import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

export default function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // lógica de logout, como limpar tokens ou estados
    navigate('/login')
  }

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
          <Link as={RouterLink} to="/" fontWeight="semibold" borderBottom="2px solid" borderColor="blue.600">
            Painel de controle
            <Box as="span" bg="gray.600" color="white" borderRadius="full" px={2} ml={1} fontSize="xs">
              2
            </Box>
          </Link>
          <Link as={RouterLink} to="/sensores" color="gray.400">
            Sensores
            <Box as="span" bg="gray.600" color="white" borderRadius="full" px={2} ml={1} fontSize="xs">
              4
            </Box>
          </Link>
          <Link as={RouterLink} to="/reports" color="gray.400">
            Reports
          </Link>
          <Link as={RouterLink} to="/admin" color="gray.500">
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

        {/* Menu de Conta */}
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