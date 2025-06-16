import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { FaUserCircle } from 'react-icons/fa'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isActive = (path) => pathname === path

  const NavLinks = (
    <Stack spacing={4}>
      <Link
        as={RouterLink}
        to="/dashboard"
        fontWeight="semibold"
        onClick={onClose}
        borderBottom={isActive('/dashboard') ? '2px solid' : 'none'}
        borderColor="blue.600"
      >
        Painel de controle
      </Link>
      <Link
        as={RouterLink}
        to="/dashboard/sensores"
        fontWeight="semibold"
        color={isActive('/dashboard/sensores') ? 'blue.600' : 'gray.500'}
        onClick={onClose}
      >
        Sensores
      </Link>
      <Link
        as={RouterLink}
        to="/dashboard/reports"
        fontWeight="semibold"
        color={isActive('/dashboard/reports') ? 'blue.600' : 'gray.500'}
        onClick={onClose}
      >
        Reports
      </Link>
    </Stack>
  )

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <>
      <Flex
        as="header"
        justify="space-between"
        align="center"
        px={4}
        py={3}
        borderBottom="1px solid"
        borderColor="gray.200"
        bg="white"
      >
        {/* Lado esquerdo: Título + menu toggle (mobile) */}
        <Flex align="center" gap={4}>
          <Heading size="md">Dashboard</Heading>

          {/* Botão hambúrguer visível apenas no mobile */}
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Abrir menu"
            variant="outline"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {/* Menu horizontal (desktop) */}
        <Flex
          as="nav"
          gap={6}
          align="center"
          display={{ base: 'none', md: 'flex' }}
        >
          <Link
            as={RouterLink}
            to="/dashboard"
            fontWeight="semibold"
            color={isActive('/dashboard') ? 'blue.600' : 'gray.600'}
            _hover={{ color: 'blue.600' }}
          >
            Painel
          </Link>
          <Link
            as={RouterLink}
            to="/dashboard/sensores"
            fontWeight="semibold"
            color={isActive('/dashboard/sensores') ? 'blue.600' : 'gray.600'}
            _hover={{ color: 'blue.600' }}
          >
            Sensores
          </Link>
          <Link
            as={RouterLink}
            to="/dashboard/reports"
            fontWeight="semibold"
            color={isActive('/dashboard/reports') ? 'blue.600' : 'gray.600'}
            _hover={{ color: 'blue.600' }}
          >
            Reports
          </Link>
        </Flex>


        {/* Lado direito: Busca e usuário */}
        <Flex align="center" gap={4}>
          <InputGroup maxW="200px" display={{ base: 'none', sm: 'flex' }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input type="text" placeholder="Buscar..." bg="gray.100" />
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

      {/* Drawer (menu lateral no mobile) */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navegação</DrawerHeader>
          <DrawerBody>{NavLinks}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
