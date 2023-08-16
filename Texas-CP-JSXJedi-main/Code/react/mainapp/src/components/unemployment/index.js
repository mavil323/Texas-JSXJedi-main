import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

export default function Unemployment() {
  return (
    <ChakraProvider>
      <div>
      
        <div className="heading">
          <h1>Unemployment Benefits</h1>
          <div className="actionButtons">
            <button className="btn btn-primary">Apply</button>
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
        <div className="content">
          <div className="content-subsection">
            <div className="content-subsection-heading">
              <h1>Apply for Unemployment Benefits</h1>
            </div>

            <p>
              If you have lost your job or had your hours reduced, you may be
              eligible for unemployment benefits.
            </p>

            <div className="content-subsection-heading">
              <h3>You Will Need</h3>
            </div>

            <div className="content-list">
              <ul>
                <li>Your Social Security Number</li>
                <li>Your Driver's License or State ID</li>
                <li>Your Employment History</li>
                <li>Your Bank Account Information</li>
                <li>
                  Your Alien Registration Number (if you are not a US Citizen)
                </li>
              </ul>
            </div>
          </div>
          <div className="content-subsection">
            <div className="content-subsection-heading">
              <h1>Request Payment</h1>
            </div>

            <p>
              If you have an active claim, you'll need to request payment each
              week in order to get paid. Or else, you won't get paid.
            </p>

            <div className="content-subsection-heading">
              <h1>You Will Need</h1>
            </div>
            <div className="content-list">
              <ul>
                <li>Earnings amount for each week</li>
                <li>Work search activities for each week</li>
                <li>Saved bank account routing information</li>
              </ul>
            </div>
          </div>
          <div className="content-subsection">
            <div className="content-subsection-heading">
              <h1>Submit an Appeal</h1>
            </div>

            <p>
              An appeal is your written notice that you disagree with a TX
              Assist decision and want your case decided through the appeal
              process. Once a appeal decision is made, it is the final decision.
            </p>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}
