import { Stack,Flex, Text, Menu, MenuButton,MenuList,MenuItem,Image, Button } from "@chakra-ui/react";
import twc from "../../images/TWC.png";
import pic  from "../../images/Nnagarrologo.png";

import { Wrap,WrapItem } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import "./styles.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BsPlus } from "react-icons/bs";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn]= useState(false);
  const location = useLocation();
  const handleSignOut =()=>{
    localStorage.clear();
    window.location.reload();
  };

  const [showHeader, setShowHeader] = useState(true);

  useEffect (() => {
    const loginInfo = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(JSON.parse(loginInfo));
    
    setShowHeader(location.pathname.indexOf("login") === -1);
  },[location.pathname]);

  const getUserName = () =>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.name;
  };
  if(!showHeader){
    return "";
  }


    return ( 
    <Flex className="navigation-header" w={"100%"} h={"6rem"} bg={"#063E72"} color={"white"} justifyContent={"space-between"} alignItems={"center"} pr={"2em"} pl={"2em"} flex={"0 0 auto"}>
      <Flex alignItems={"center"} gap={{base: "1rem", lg:"2rem"}}>
        <Flex alignItems={"center"} >
        <Image src={twc}alt="TWC.png" height="80px" marginRight={"0.7rem"}/>
        <BsPlus size={"2.5rem"} ></BsPlus>
        <Image src={pic} alt="Nnagarrologo.png" height="80px"/>
        </Flex>
        <Stack className="nav-list" gap={{base: "1rem", lg:"2rem"}} direction={"row"}>
        <NavLink end className={({isActive}) => (isActive ? "active" : "")} to='/'>
        <Text >Home</Text>
        </NavLink>
        <NavLink end className={({isActive}) => (isActive ? "active" : "")} to='/catalog'>
        <Text >Service Catalog</Text>
        </NavLink>
        <NavLink end className={({isActive}) => (isActive ? "active" : "")}  to='/learning'>
        <Text >Training Resources</Text>
        </NavLink>
        {isLoggedIn?<NavLink end className={({isActive}) => (isActive ? "active" : "")}  to='/case-management'>
        <Text >Case Management</Text>
        </NavLink>:""}
        </Stack>
        </Flex>
        <Wrap>
  <WrapItem>
      <Flex alignItems="center" gap={"2rem"}>
      {isLoggedIn ?<Menu onSignOut={handleSignOut}>
    <MenuButton > 
    <Text>Hi, <strong>{getUserName()}</strong></Text>
    </MenuButton>
    <MenuList color="black">
      <MenuItem onClick={handleSignOut}>
      <Text>Signout</Text>
      </MenuItem>
    </MenuList>
   
    </Menu>:""}
    {!isLoggedIn ?(
      <Button colorScheme="green" size="md" mt={2}>
        <Link to="/login">Login</Link>
      </Button>
    ):""}
      </Flex>

  </WrapItem>
  </Wrap>

    </Flex> );
}
 
export default NavBar;