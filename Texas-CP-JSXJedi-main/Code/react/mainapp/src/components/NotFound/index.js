import React from "react";
import image from "../../images/grogu12.png"
const NotFound=(imageUrl) => {
    const styles={
        NotFoundContainer:{
            textAlign:"center",
        },
        NotFoundText:{
            fontSize:"2rem",
            fontWeight:"bold",
            color: "#5f7d65",
            border:"2px solid #5f7d60",
            padding:"10px",
            marginBottom:"20px"
        },
        NotFoundImage:{
            maxWidth:"20%",
            margin: "0 auto",

            
        },
        funnyMessage: {
            fontSize:"1.5rem",
            marginTop:"10px",
        },

        };

        const funnyMessage="Grogu ate this page! It's not lost, just digesting...";
    

    return(
        <div style={styles.NotFoundContainer}>
            <h1 style={styles.NotFoundText}>404 Page Not Found!</h1>
            <img
            style={styles.NotFoundImage}
            src={image}
            alt="404 image"/>
<p style={styles.funnyMessage}>{funnyMessage}</p>
        </div>
    );
};
export default NotFound;