
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const OTPScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState(Array(10).fill(""));
  const [otpSent, setOTPSent] = useState(false);
  const [otp, setOTP] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const phoneNumberInputs = Array(10)
    .fill(0)
    .map((_, i) => useRef(null));
  const otpInputs = Array(6)
    .fill(0)
    .map((_, i) => useRef(null));

  // Function to handle phone number input change
  const handlePhoneNumberChange = (value, index) => {
    if (/^\d{0,1}$/.test(value)) {
      const newPhoneNumber = [...phoneNumber];
      newPhoneNumber[index] = value;
      setPhoneNumber(newPhoneNumber);
      if (value !== "" && index < 9) {
        focusNextPhoneNumberInput(index);
      }
    }
  };

  // Function to focus on the next phone number input field
  const focusNextPhoneNumberInput = (index) => {
    phoneNumberInputs[index + 1].current.focus();
  };

  // Function to handle sending OTP
  const handleSendOTP = () => {
    // Combine the phone number digits into a single string
    const formattedPhoneNumber = phoneNumber.join("");
    // Implement your OTP sending logic here with the formattedPhoneNumber
    console.log("Sending OTP to:", formattedPhoneNumber);
    setOTPSent(true);
    startTimer();
  };

  // Function to start timer for resend OTP
  const startTimer = () => {
    setTimer(30);
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(intervalId);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
  };

  // Function to handle OTP input change
  const handleOTPChange = (value, index) => {
    // Ensure OTP is only 6 digits
    if (/^\d{0,1}$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      if (value !== "" && index < 5) {
        focusNextOTPInput(index);
      }
    }
  };

  // Function to focus on the next OTP input field
  const focusNextOTPInput = (index) => {
    otpInputs[index + 1].current.focus();
  };

  // Function to handle OTP resend
  const handleResendOTP = () => {
    // Implement your resend OTP logic here
    console.log("Resend OTP");
    startTimer();
  };

  // Function to handle OTP verification
  const handleVerifyOTP = () => {
    // Implement your OTP verification logic here
    const enteredOTP = otp.join("");
    console.log("Verifying OTP:", enteredOTP);
  };

  return (
    <View>
      {!otpSent ? (
        <View style={styles.container}>
          <Text style={styles.title}>Enter Phone Number</Text>
          <View style={styles.phoneNumberContainer}>
            {phoneNumber.map((digit, index) => (
              <TextInput
                key={index}
                ref={phoneNumberInputs[index]}
                style={styles.phoneNumberInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handlePhoneNumberChange(value, index)}
                onSubmitEditing={() => focusNextPhoneNumberInput(index)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.sendOTPButton}
            onPress={handleSendOTP}
          >
            <Text style={styles.sendOTPText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Enter OTP</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={otpInputs[index]}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOTPChange(value, index)}
                onSubmitEditing={() => focusNextOTPInput(index)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendOTP}
          >
            <Text style={styles.resendText}>
              {timer > 0 ? `Resend OTP (${timer})` : "Resend OTP"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerifyOTP}
          >
            <Text style={styles.verifyText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    //   margin:50,
    //   padding:30
  },
  phoneNumberContainer: {
    flexDirection: "row",

    marginBottom: 10,
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: 25,
    height: 35,
    fontSize: 20,
    borderRadius: 8,
    textAlign: "center",
    marginHorizontal: 5,

    margin: 50,
  },
  sendOTPButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  sendOTPText: {
    color: "white",
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: 40,
    height: 40,
    fontSize: 18,
    borderRadius: 8,
    textAlign: "center",
    margin: 5,
  },
  resendButton: {
    backgroundColor: "green",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 10,
  },
  resendText: {
    color: "white",
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: "orange",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  verifyText: {
    color: "white",
    fontSize: 16,
  },
});

export default OTPScreen;
