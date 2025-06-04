import profileImg from '../assets/profile.png';
import logoImg from '../assets/logo.png';
import { useNavigate } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
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

export default function SignupPage() {
    const [name, setName] = React.useState('') // Estado para o nome completo
    const [email, setEmail] = React.useState('') // Estado para o e-mail
    const [password, setPassword] = React.useState('') // Estado para a senha
    const navigate = useNavigate()

    const bgLeft = useColorModeValue('blue.400', 'blue.600')
    const bgRight = useColorModeValue('white', 'gray.800')
    const borderColor = useColorModeValue('whiteAlpha.800', 'whiteAlpha.600')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Aqui você pode adicionar lógica de cadastro, como enviar os dados para uma API
        navigate('/dashboard') // Redireciona para o Dashboard após o cadastro
    }

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
                    src={profileImg}
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
                            src={logoImg}
                            alt="SenseTrack Logo"
                            boxSize="80px"
                        />
                    </Flex>

                    <Divider mb={6} />

                    <Heading mb={2} textAlign="center" fontSize="2xl">
                        Cadastro
                    </Heading>
                    <Text mb={6} textAlign="center" color="gray.500">
                        Crie sua conta para começar a usar o SenseTrack.
                    </Text>

                    <form onSubmit={handleSubmit}>
                        <FormControl id="name" mb={4}>
                            <FormLabel>Nome Completo</FormLabel>
                            <Input
                                type="text"
                                placeholder="Digite seu nome completo"
                                bg={useColorModeValue('gray.100', 'gray.700')}
                                value={name}
                                onChange={(e) => setName(e.target.value)} // Atualiza o estado do nome
                            />
                        </FormControl>

                        <FormControl id="email" mb={4}>
                            <FormLabel>E-mail</FormLabel>
                            <Input
                                type="email"
                                placeholder="Digite aqui seu email"
                                bg={useColorModeValue('gray.100', 'gray.700')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do e-mail
                            />
                        </FormControl>

                        <FormControl id="password" mb={6}>
                            <FormLabel>Senha</FormLabel>
                            <Input
                                type="password"
                                placeholder="Digite aqui sua senha"
                                bg={useColorModeValue('gray.100', 'gray.700')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
                            />
                        </FormControl>

                        <Button type="submit" colorScheme="blue" w="full" mb={4}>
                            Cadastrar
                        </Button>
                    </form>

                    <Text textAlign="center" mb={6}>
                        Já possui uma conta?{' '}
                        <Link as={RouterLink} to="/" color="blue.500">
                            Login
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
