import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@chakra-ui/react'

function SignIn({onSignIn}){
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn]= useState(false);

    const handleSignIn =()=>{

        setIsLoggedIn(true);
        onSignIn();
        navigate.push('/Menu');
    };

    return (
        <div>
            <Button colorScheme="green" size="md" onClick={handleSignIn}>
                SignInget 
            </Button>
        </div>
    );
    }
    export default SignIn;