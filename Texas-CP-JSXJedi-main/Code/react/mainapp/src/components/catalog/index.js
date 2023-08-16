import { useState, useEffect } from "react";
import { Link as ReactRouterLink } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Text, Heading, SimpleGrid, Button, ChakraProvider, Link as ChakraLink, Image } from '@chakra-ui/react'
import "./styles.css";
import theme from "./theme";

export default function ServiceCatalog() {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    try {
      fetch("https://texas-jsxjedi-api.azurewebsites.net/services")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCatalog(data.services);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <SimpleGrid spacing='40px' columns={[1, 2, 3, 4]}>
        {catalog.map((service, index) => (
          <Card key={index} className="card" variant="outline">
            <CardHeader>
              <Heading size='md'>{service.name}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{service.description}</Text>
            </CardBody>
            <CardFooter>
              <ChakraLink as={ReactRouterLink} to={service.href} target="_blank">
                <Button colorScheme="facebook">View here</Button>
              </ChakraLink>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </ChakraProvider>
  );
}
