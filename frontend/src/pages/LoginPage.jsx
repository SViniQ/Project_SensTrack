// src/pages/LoginPage.jsx
import React from 'react'
import {
    Flex,
    Box,
    Image,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    Link,
    Divider,
    Spacer,
    useColorModeValue,
} from '@chakra-ui/react'

export default function LoginPage() {
    const bgLeft = useColorModeValue('blue.400', 'blue.600')
    const bgRight = useColorModeValue('white', 'gray.800')
    const borderColor = useColorModeValue('whiteAlpha.800', 'whiteAlpha.600')

    return (
        <Flex minH="100vh">
            <Box
                flex="1"
                bg={bgLeft}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Image
                    src="/src/assets/profile.png"
                    alt="Usuária sorrindo"
                    borderRadius="full"
                    boxSize={['200px', '300px']}
                    border="8px solid"
                    borderColor={borderColor}
                    objectFit="cover"
                />
            </Box>

            <Flex
                flex="1"
                direction="column"
                bg={bgRight}
                p={8}
                align="center"
            >
                <Box w={['90%', '400px']}>
                    {/* Logo */}
                    <Flex mb={4} justify="center">
                        <Image
                            src="/src/assets/logo.png"
                            alt="SenseTrack Logo"
                            boxSize="80px"
                        />
                    </Flex>

                    <Divider mb={6} />

                    <Heading mb={2} textAlign="center" fontSize="2xl">
                        Login
                    </Heading>
                    <Text mb={6} textAlign="center" color="gray.500">
                        Acesse sua conta para continuar a controlar sua grana.
                    </Text>

                    <form>
                        <FormControl id="email" mb={4}>
                            <FormLabel>E-mail</FormLabel>
                            <Input
                                bg={useColorModeValue('gray.100', 'gray.700')}
                                size="lg"
                                w="full"
                                placeholder='Digite seu e-mail'
                            />
                        </FormControl>

                        <FormControl id="password" mb={6}>
                            <FormLabel>Senha</FormLabel>
                            <Input
                                bg={useColorModeValue('gray.100', 'gray.700')}
                                size="lg"
                                w="full"
                                placeholder='Digite sua senha'
                            />
                        </FormControl>

                        <Button colorScheme="blue" w="full" mb={4} size="lg">
                            Entrar
                        </Button>
                    </form>

                    <Text textAlign="center" mb={6}>
                        Não possui uma conta?{' '}
                        <Link color="blue.500" href="/signup">
                            Cadastre-se
                        </Link>
                    </Text>

                    <Spacer />

                    <Flex
                        wrap="wrap"
                        fontSize="sm"
                        color="gray.500"
                        justify="space-between"
                        gridGap={2}
                        pt={4}
                    >
                        <Text>© 2025 SenseTrack</Text>
                        <Link href="#">Privacidade</Link>
                        <Link href="#">FAQ</Link>
                        <Link href="#">Termos &amp; Condições</Link>
                        <Link href="#">Status</Link>
                        <Link href="#">Contato</Link>
                        <Text>Versão 1.0.0</Text>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    )
}
