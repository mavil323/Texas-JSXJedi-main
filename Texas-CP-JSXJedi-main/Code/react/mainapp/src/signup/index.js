import React from "react";
import "./index.css";
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios"

function SignUp() {
  const [formData, setFormData] = React.useState({});
  const navigate = useNavigate()

  const handleSignUp = (event) => {
    event.preventDefault();
  
    const data = {
      first_name: formData.firstName || '',
      middle_name: formData.middleInitial || '',
      last_name: formData.lastName || '',
      email: formData.email,
      username: formData.username,
      password: formData.password,
      security_question_1: formData.securityQuestion1 || '',
      security_answer_1: formData.answer || '',
      confirm_answer_1: formData.confirmAnswer || '',
      security_question_2: formData.securityQuestion2 || '',
      security_answer_2: formData.answer2 || '',
      confirm_answer_2: formData.confirmAnswer2 || '',
    };

      console.log('Making axiso request with the following data:')
      console.log(data);
   
    axios.post('https://texas-jsxjedi-api.azurewebsites.net/signup', data)
      .then((response) => {
        console.log('User sign up successful:', response.data);
        navigate("/login")
      })
      .catch((error) => {
        console.error('User sign up failed:', error);
      });
  };
  

  // React.useEffect(() => {
  //   console.log(formData);
  //   console.log(formData.securityQuestion1,)
  // }, [formData]);

  return (
    <div className="SignUp">
      <div className="header">
        <h1>Create Your Profile</h1>
        <div className="header-links">
          <p>Already have a profile?</p>
          < Link to="/login">Login</Link>
        </div>
      </div>
      <div className="form">
        <form onSubmit={handleSignUp}>
          <div className="section-heading">
            <p>Personal Information</p>
          </div>
          <div className="section-one">
            <label className="label">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                }}
              />
            </label>
            <label className="label">
              <input
                type="text"
                placeholder="Middle Initial"
                value={formData.middleInitial}
                onChange={(e) => {
                  setFormData({ ...formData, middleInitial: e.target.value });
                }}
              />
            </label>
            <label className="label">
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                }}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </label>
          </div>
          <div className="section-heading">
            <p>Logon Information</p>
          </div>
          <div className="section-two">
            <label className="label">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
              />
            </label>
            <label className="label">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </label>
            <label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                }}
              />
            </label>
          </div>
          <div className="section-heading">
            <p>Security Information</p>
          </div>
          <div className="section-three">
            <label className="label">
              <select
                placeholder="Security Question 1"
                value={formData.securityQuestion1}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    securityQuestion1: e.target.value,
                  });
                }}
              >
                <option value="1">What is your favorite color?</option>
                <option value="2">What is your favorite food?</option>
                <option value="3">What is your favorite movie?</option>
                <option value="4">What is your favorite book?</option>
              </select>
            </label>
            <label className="label">
              <input
                type="text"
                placeholder="Answer"
                value={formData.answer}
                onChange={(e) => {
                  setFormData({ ...formData, answer: e.target.value });
                }}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Confim Answer"
                value={formData.confirmAnswer}
                onChange={(e) => {
                  setFormData({ ...formData, confirmAnswer: e.target.value });
                }}
              />
            </label>
          </div>
          <div className="section-four">
            <label className="label">
              <select
                placeholder="Security Question 2"
                value={formData.securityQuestion2}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    securityQuestion2: e.target.value,
                  });
                }}
              >
                <option value="1">What is your favorite color?</option>
                <option value="2">What is your favorite food?</option>
                <option value="3">What is your favorite movie?</option>
                <option value="4">What is your favorite book?</option>
              </select>
            </label>
            <label className="label">
              <input
                type="text"
                placeholder="Answer"
                value={formData.answer2}
                onChange={(e) => {
                  setFormData({ ...formData, answer2: e.target.value });
                }}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Confim Answer"
                value={formData.confirmAnswer2}
                onChange={(e) => {
                  setFormData({ ...formData, confirmAnswer2: e.target.value });
                }}
              />
            </label>
          </div>
          <div className="button">
            <button type="submit">Create Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
