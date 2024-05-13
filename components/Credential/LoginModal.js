
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal,TextInput, } from "react-native";
import Lgin from "../Modal/Lgin";
import Sign_up from "../Modal/Sign_up";
import { useContext } from "react";
import { AuthContext } from "../../redux/ContextApi/UserAuthProvider";


const CloseIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.closeButton}>
    <Image
      source={require("../../assets/closeImage.jpg")}
      style={{ width: 50, height: 50,padding:10 }}
    />
  </TouchableOpacity>
);

const LoginModal = ({ navigation, visible,setVisible}) => {

  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp,f_email, f_mobile, f_id, f_name, f_password  } = state;
  const [isShowlogin, setIsShowlogin] = useState(true);
  const handleIsshowLogin=()=>{
    setIsShowlogin(!isShowlogin)
  }
  const closeModal=()=>{
    setVisible(false)
    navigation.navigate("Tab1",{screen:"T1Screen1"})

  }
 

  
  return (
    <Modal animationType="none" visible={visible}>
      <View style={{ flex: 1 }}>
        <CloseIcon onPress={closeModal} />
        <View style={styles.container}>
          

          {
            isShowlogin ? <View style={styles.content}>
            {/* {React.cloneElement(component1, { closeModal })} */}
            <Lgin handleIsshowLogin={handleIsshowLogin} visible={visible} setVisible={setVisible}/>
          </View>:<View style={styles.content}>
              {/* {React.cloneElement(component2, { closeModal })} */}
              <Sign_up handleIsshowLogin={handleIsshowLogin}/>
            </View>
          }
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    // top: 10,
    right: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  resendButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  resendText: {
    color: "white",
    fontSize: 16,
  },
  autoFillButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  autoFillText: {
    color: "white",
    fontSize: 16,
  },
});

export default LoginModal;

