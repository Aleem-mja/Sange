// // PaymentVerification.js

// import React, { useState, useEffect } from "react"; // Import useEffect from React
// import axios from "axios";
// import '../css/register.css';
// import Navbar4 from "../components/Navbar4";
// import Footer from "../components/Footer";

// const PaymentVerification = () => {
//   const [formData, setFormData] = useState({
//     studentName: "",
//     nicNumber: "",
//     accountNumber: "",
//     bank: "",
//     amount: "",
//     date: "",
//   });

//   const [studentInfo, setStudentInfo] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Fetch student info using the token from local storage
//     const token = localStorage.getItem('token');
//     if (token) {
//       const fetchStudentInfo = async () => {
//         try {
//           const response = await axios.get('/api/student/profile', {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           setStudentInfo(response.data.user);
//         } catch (error) {
//           console.error('Error fetching student info:', error);
//           setError('Error fetching student info');
//         }
//       };
//       fetchStudentInfo();
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/payment/verify", formData);
//       console.log(response.data);
//       // If payment details added successfully, show success alert
//       if (response.data.success) {
//         window.alert("Payment details added successfully!");
//       }
//       // Reset form after successful submission
//       setFormData({
//         studentName: "",
//         nicNumber: "",
//         accountNumber: "",
//         bank: "",
//         amount: "",
//         date: "",
//       });
//     } catch (error) {
//       console.error("Error submitting payment details:", error);
//       // Handle error message
//     }
//   };

//   return (
//     <>
//       <Navbar4 /><br/><br/>
//       <div className="container">
//         <form onSubmit={handleSubmit} className="payment-form">
//           {studentInfo && (
//             <>
//               <label>
//                 Student Name:
//                 <input
//                   type="text"
//                   name="studentName"
//                   value={studentInfo.name}
//                   onChange={handleChange}
//                   required
//                   readOnly
//                 />
//               </label><br/>
//               <label>
//                 NIC Number:
//                 <input
//                   type="text"
//                   name="nicNumber"
//                   value={studentInfo.nic}
//                   onChange={handleChange}
//                   maxLength="10"
//                   required
//                   readOnly
//                 />
//               </label>
//             </>
//           )}
//           <label>
//             Account Number:
//             <input
//               type="text"
//               name="accountNumber"
//               value={formData.accountNumber}
//               onChange={handleChange}
//               maxLength="12"
//               required
//             />
//           </label>
//           <label>
//             Bank:
//             <input
//               type="text"
//               name="bank"
//               value={formData.bank}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Amount:
//             <input
//               type="text"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Date:
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//       </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
//       <Footer />
//     </>
//   );
// };

// export default PaymentVerification;

import React, { useState } from "react";
import axios from "axios";
import "../css/register.css";
import Navbar4 from "../components/Navbar4";
import Footer from "../components/Footer";

const PaymentVerification = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    nicNumber: "",
    accountNumber: "",
    bank: "",
    amount: "",
    date: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    studentName: "",
    nicNumber: "",
    accountNumber: "",
    bank: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for different fields
    let newValue = value;
    let error = "";

    if (name === "studentName" || name === "bank") {
      newValue = value.replace(/[^a-zA-Z\s]/g, "");
      if (!newValue) {
        error = "Please enter a valid name";
      }
    } else if (name === "nicNumber" || name === "accountNumber") {
      newValue = value.replace(/[^0-9]/g, "");
      if (!newValue || newValue.length > 10) {
        error = "Please enter a valid input";
      }
    } else if (name === "amount") {
      newValue = value.replace(/[^0-9.]/g, "");
      if (!newValue) {
        error = "Please enter a valid amount";
      }
    }

    setValidationErrors({ ...validationErrors, [name]: error });
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/payment/verify", formData);
      console.log(response.data);
      if (response.data.success) {
        window.alert("Payment details added successfully!");
        setFormData({
          studentName: "",
          nicNumber: "",
          accountNumber: "",
          bank: "",
          amount: "",
          date: "",
        });
      }
    } catch (error) {
      console.error("Error submitting payment details:", error);
      // Handle error message
    }
  };

  return (
    <>
      <Navbar4/>
      <br />
      <br />
      <div className="container">
        <form onSubmit={handleSubmit} className="payment-form">
          <label>
            Student Name:
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
            <p className="error">{validationErrors.studentName}</p>
          </label>
          <br />
          <label>
            NIC Number:
            <input
              type="text"
              name="nicNumber"
              value={formData.nicNumber}
              onChange={handleChange}
              maxLength="10"
              required
            />
            <p className="error">{validationErrors.nicNumber}</p>
          </label>
          <br />
          <label>
            Account Number:
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              maxLength="12"
              required
            />
            <p className="error">{validationErrors.accountNumber}</p>
          </label>
          <br />
          <label>
            Bank:
            <input
              type="text"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              required
            />
            <p className="error">{validationErrors.bank}</p>
          </label>
          <br />
          <label>
            Amount:
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <p className="error">{validationErrors.amount}</p>
          </label>
          <br />
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]} // Restrict future dates
              required
            />
            <p className="error">{validationErrors.date}</p>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default PaymentVerification;
