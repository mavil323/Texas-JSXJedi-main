import "./styles.css";
import nag from "../../images/NagarroLogo.png"
import {Flex, Image} from "@chakra-ui/react";
import logo from "../../images/Jsx_Logo.png";
import { BsPlus } from "react-icons/bs";


function Footer() {
    return (
        
        <div className="footer">
            <Flex flexDirection={"column"} className="footer-content">
            <Flex alignItems={"center"}>
            <Image src={nag}alt="NagarroLogo.png" height="120px"/>
            <BsPlus size={"2.5rem"}></BsPlus>
            <Image src={logo}alt="Jsx_Logo.png" height="80px" marginLeft={"0.7rem"}/>
            </Flex>
                <p>Made by Team JSX Jedi &copy; {new Date().getFullYear()}, All rights reserved.</p>
               
                <p>Contact us at: contact@jsxjedi.com</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>                    
                    <a href="#">About Us</a>
                </div>
                
            </Flex>
        </div>
    )
}

export default Footer;


