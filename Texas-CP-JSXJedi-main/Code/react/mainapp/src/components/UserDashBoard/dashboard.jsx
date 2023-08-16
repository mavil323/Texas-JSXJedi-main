import { Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const UserDashBoard = () => {
    const { username } = useParams()
    return ( <VStack>
        <Text>Welcome {username}</Text>
    </VStack> );
}
 
export default UserDashBoard;