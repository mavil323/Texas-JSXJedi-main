'use client'

import { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  SimpleGrid,
  GridItem,
  VStack,
} from '@chakra-ui/react'
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs'

export default function Learning() {
  
  
  return (
    <VStack >
      <Heading>Training Resources</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="6">
      <GridItem>
    <Resources pic={'https://www.dcfpi.org/wp-content/uploads/2017/07/blog-adult-ed.jpg'} title={"Apprenticeship training"}/>
    </GridItem>
    <GridItem>
    <Resources  tag="Social" pic={'https://www.talentproindia.com/wp-content/uploads/2021/04/Importance-and-Benefits-of-Prevention-of-Sexual-Harassment-POSH-Training-for-Your-Employees.png'} title={"Sexual Harrassment Training"}/>
    </GridItem>
    <GridItem>
    <Resources tag="Technical" pic={'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'} title={"React JS"}/>
    </GridItem>
    <GridItem>
    <Resources pic={'https://th.bing.com/th/id/OIP.bAnE_AEyEBbIE2Q3oMlo3wHaE7?pid=ImgDet&rs=1'} title={"Machine Learning"} tag="Technical"/>
    </GridItem>
    </SimpleGrid>
    </VStack>
  )
}

const Resources=({pic,title,tag="Professional"})=>{
    const [liked, setLiked] = useState(false)
    return(
    <Center py={6}>
      <Box
        w="xs"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        borderRadius="10px"
        boxShadow={useColorModeValue('0 0 16px 0 rgba(6, 62, 114,0.25)')}>
        <Box h={'200px'} borderBottom={'1px'} borderColor="black">
          <Img
            src={
              pic
            }
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
        </Box>
        <Box p={4}>
          <Box bg="black" display={'inline-block'} px={2} py={1} color="white" mb={2}>
            <Text fontSize={'xs'} fontWeight="medium">
             {tag}
            </Text>
          </Box>
          <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
          {title}
          </Heading>
          <Text color={'gray.500'} noOfLines={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper eget duis at tellus. Amet porttitor eget dolor morbi non.
          </Text>
        </Box>
        <HStack borderTop={'1px'} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full">
            <Text fontSize={'md'} fontWeight={'semibold'}>
              View more
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            borderLeft={'1px'}
            cursor="pointer"
            onClick={() => setLiked(!liked)}>
            {liked ? (
              <BsHeartFill fill="red" fontSize={'24px'} />
            ) : (
              <BsHeart fontSize={'24px'} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
    )
}