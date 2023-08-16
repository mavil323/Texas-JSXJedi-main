import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import logo from "../../images/Jsx_Logo.png"
import twc from "../../images/TWC_dark.png";
import pic from "../../images/Nnagarrologo.png";
import {
  useDisclosure,
  Flex,
  FormControl,
  Input,
  Button,
  VStack,
  Stack,
  Text,
  Checkbox,
  HStack,
  Image,
  FormErrorMessage,
  Avatar,
  Heading,
  Modal,
  ModalBody,
  ModalOverlay, ModalHeader, FormLabel, ModalFooter, ModalCloseButton, ModalContent

} from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';

const Login = () => {
  const initialFormData = {
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    confirm_password: ""
  }
  const [formData, setFormData] = useState(initialFormData)
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [usernameerrorMessage, setUsernameErrorMessage] = useState(false)
  const [passworderrorMessage, setPasswordErrorMessage] = useState(false)
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const handleSignIn = () => {

    if (user_name.trim() === '') {
      setUsernameErrorMessage(true)

    }
    else {
      setUsernameErrorMessage(false)
    }

    if (password.trim() === '') {
      setPasswordErrorMessage(true)
      return

    }
    else {
      setPasswordErrorMessage(false)
    }
    const data = {
      user_name,
      password

    }

    axios.post('https://texas-jsxjedi-api.azurewebsites.net/login', data)
      .then((response) => {
        console.log('Login successful')
        console.log(response.data)
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        navigate(`/`)
      })
      .catch((error) => {
        console.log("login failed")
        console.log(error)
        setError('Invalid username or password')
      })

  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value)
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleSignUp = (e) => {
    e.preventDefault()
    axios.post('https://texas-jsxjedi-api.azurewebsites.net/register', formData)
      .then((response) => {
        console.log("Account created successful!")
        console.log(response.data)
      }).catch((error) => {
        console.log("Sign up failed")
        console.log(error)
      })
    console.log('Form data:', formData)
    setFormData(initialFormData)

  }

  return (
    <Stack direction={{ base: "column", lg: "row" }} gap={"2.5rem"}>
      <VStack borderRight={{ lg: "1px solid #bfd1e0" }} flex={"0 0 auto"} width={{ base: "100%", lg: "50%" }} alignItems={"center"} justifyContent={"center"}>
        <VStack alignItems={"center"} justifyContent={"center"} >
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Image src={twc} alt="TWC.png" height="90px" marginRight={"0.7rem"} borderRadius={"50%"} />
            <BsPlus size={"2.5rem"} ></BsPlus>
            <Image src={pic} alt="Nnagarrologo.png" height="80px" />
            <BsPlus size={"2.5rem"} ></BsPlus>
            <Image src={logo} height="80px" />
          </Flex>
          <Heading>Welcome to JSX Jedi Portal</Heading>
          <Text p={"2rem"}>Join the ranks of satisfied customers who have embraced the future of ticketing with JSXJedi. We're here to help you elevate your support game, so you can focus on what matters most - providing top-notch service to your clients.</Text>
        </VStack>
      </VStack>
      <Flex flex={"1 1 auto"} justifyContent={"center"} width={"100%"}>
        <Flex maxWidth={"30rem"} alignItems={"center"} justifyContent={"center"} bg={"#31979573"} borderRadius={"20px"} gap={"4rem"} flex={"1 1 auto"} p={"2rem"} flexDir={"column"}>
          <Flex flexDir={"column"} gap="1rem" alignItems="center" >
            <Avatar size='lg' bg={"#063E72"} />
            <Heading color="#063E72">Welcome</Heading>
          </Flex>

          <form >
            <Flex flexDirection={"column"} gap={"1rem"} overflow={"auto"}>
              <FormControl id="username" isRequired isInvalid={usernameerrorMessage}>
                <Input
                  bg={"#D9D9D9"}
                  type="username"
                  value={user_name}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                  height={"40px"}
                  borderRadius={"10px"}
                />
                <FormErrorMessage color={"red"} ml={16}>Username is required!</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isRequired isInvalid={passworderrorMessage}>
                <Input
                  type="password"
                  bg={"#D9D9D9"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  height={"40px"}
                  borderRadius={"10px"}
                />
                <FormErrorMessage color={"red"} ml={16}>Password is required!</FormErrorMessage>
              </FormControl>
              {error && <Text color="red">{error}</Text>}
              <FormControl >
                <Checkbox colorScheme='blue'><Text>Remember me </Text></Checkbox>
              </FormControl>
              <FormControl>
                <Checkbox colorScheme="blue" >
                  <HStack  >
                    <Text>I'm not a robot</Text>
                    <Image w={"50px"} src='https://logodownload.org/wp-content/uploads/2019/07/recaptcha-logo.png' />
                  </HStack>
                </Checkbox>
              </FormControl>
              <Button
                justifySelf={"center"}
                alignSelf={"center"}
                borderRadius={"10px"}
                cursor={"pointer"}
                bg={"#063E72"}
                color={"white"}
                onClick={handleSignIn}
                height={"40px"}
                maxWidth={"100%"}
                width={"20rem"}
                mt={"1rem"}
              >
                LogIn
              </Button>
            </Flex>
          </form>


          {/* <Button colorScheme='teal' height={"40px"} p={"1rem"}
          width={"50%"}>Create new account</Button> */}
          <Button onClick={onOpen} colorScheme='teal' fontSize={"1.2rem"} p={"1.5rem"}
          >Create new account</Button>
          {/* <Button ml={4} ref={finalRef} >
        I'll receive focus on close
      </Button> */}

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={handleSignUp}>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>

                  <FormControl>
                    <FormLabel>First name</FormLabel>
                    <Input ref={initialRef} placeholder='First name' name="firstName" value={formData.firstName} onChange={handleChange} />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Last name</FormLabel>
                    <Input placeholder='Last name' name='lastName' value={formData.lastName} onChange={handleChange} />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='email' type='email' name='email' value={formData.email} onChange={handleChange} />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Username</FormLabel>
                    <Input placeholder='username' name='userName' value={formData.userName} onChange={handleChange} />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>create password</FormLabel>
                    <Input placeholder='password' type='password' name='password' value={formData.password} onChange={handleChange} />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>confirm Password</FormLabel>
                    <Input placeholder='confirm password' type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} type='submit' onClick={onClose}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>

        </Flex>
      </Flex>
    </Stack>
  );
}

export default Login;