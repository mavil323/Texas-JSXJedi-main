import './styles.css';
import { useRef, useState } from "react";
import axios from 'axios';
import { Flex, Spacer } from '@chakra-ui/react'
import yoda from './images/babyyoda.png';
import yodaChatbox from './images/yodachatbox.png'

const ChatBot = () => {
    const [msg, setMsg] = useState("");
    const [msgList, setMsgList] = useState(['Hi, my name is Grogu! I can help answer common questions about TWC services. You can type a question below. Please type one question at a time and avoid entering personal information.[']);
    const [pending, setPending] = useState(false);
    const chatAreaRef = useRef();

    const addToList = (response) => {
        response= response + '[';
        msgList.push(response);
        setMsgList(msgList);
    }

    const handleInput = (e, setFieldValue) => {
        setFieldValue(e.target.value);
    };

    const displayBox = ()=>{
        document.getElementById("chatBox").style.display="flex";
        document.getElementById("yodaPopUp").style.display="none";
    }

    const hideBox = ()=>{
        document.getElementById("chatBox").style.display="none";
        document.getElementById("yodaPopUp").style.display="block";
    }


    const getBotResponse = async (msg) => {
        try{
        const response = await axios.get("https://cp-finalproject-api.azurewebsites.net/cp-backend/askquestion?website=twc&question=" + msg);
        msgList.push(response.data.answer)
        setMsgList(msgList);
        }
        catch (err) {
            console.log(err);
            setMsg("Network Error: Please try again later")
        }
    }
    const sendMessage = async (e) => {
        e.preventDefault()
        if(msg != "" && msgList.length % 2 == 1){
        addToList(msg);
        var backupMsg = msg.split('[')[0];
        setMsg("Please wait one moment...");
        setPending(true);
        await getBotResponse(backupMsg);
        setMsg("");
        setPending(false);
        scrollBottom();
        }
    }

    const scrollBottom = () => {
        setTimeout(() =>{
            chatAreaRef.current.scrollTo(0,chatAreaRef.current.scrollHeight);
        },0);
    }



    return(
        <div>
        <img
            id="yodaPopUp"
                src={yoda}
            alt=""
            onClick={displayBox}
        />
        <div id="chatBox">
            <div id="chatHeader">
                <div className="headerContainer">
                <img
                    id="yodaChatbox"
                    src={yodaChatbox}
                    alt=""
                />
                <h1 className="headerText">Grogu</h1>
                </div>
                <button id="minimize" title="Minimize" onClick={hideBox}>
                    <p id="minus">&minus;</p>
                </button>
            </div>
            <div className="chatArea" ref={chatAreaRef}>
            {msgList.map((msg) => (<div id="flopsyText">{msg.split('[')[0]}
            <br/>
            <a id="url" href={msg.split('[').pop().split(']')[0]}>{msg.split('[').pop().split(']')[0]}</a>
                </div>
                ))}
            </div>
            <form className="chatFooter" onSubmit={sendMessage}>
            <input readOnly={pending} placeholder="Type a message.." id="msg" value={msg} autoComplete="off" onInput={(e) => {
                    handleInput(e, setMsg);
            }}
            />
            <button type="submit" class="btn" >Send</button>
            </form>
        </div>
        </div>
    );
}

export default ChatBot;