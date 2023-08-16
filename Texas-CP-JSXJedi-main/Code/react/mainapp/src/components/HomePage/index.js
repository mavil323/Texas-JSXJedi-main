import React from 'react';
import { Box, Flex } from "@chakra-ui/react";
import "./styles.css";
import video from '../../images/JsxJediIntroVideo.mp4'


const Homepage = () => {

    return (

        <Flex justifyContent={"center"} maxWidth={"100%"} width={"60rem"} height={"100%"} alignSelf={"center"}>
            <video width="100%" height={"100%"} src={video} type="video/mp4" controls>
            </video>
        </Flex>

    )
}
export default Homepage;