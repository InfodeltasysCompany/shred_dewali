import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../redux/ContextApi/UserAuthProvider";
import LoginModal from "../../components/Credential/LoginModal";

const ChatBlank = ({navigation}) => {
  
  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp,f_email, f_mobile, f_id, f_name, f_password  } = state;
  const [visible, setVisible] = useState(false)
  const hanldeChatPeopleOnClick =()=>{
    if(userIdApp && f_email && f_id){
      setVisible(false)
    }
    else{
      setVisible(true)
    }
    if(userIdApp && !f_email && !f_id ){
      navigation.navigate("Tab1",{screen:"T1Screen1"});
    }
  }
 
  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
        <LoginModal  visible={visible} setVisible={setVisible} navigation={navigation} />

      <View>
        <Image
          style={styles.image1}
          source={require("../../assets/chat.jpg")}
        />
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "500", color: "black", fontSize: 20 }}>
          No Conversation
        </Text>
        <Text style={{ color: "gray" }}>
          You did not made any conversatiion yet,
        </Text>
        <Text style={{ color: "gray" }}>Please select Username.</Text>
      </View>

      <View>
        <TouchableOpacity onPress={hanldeChatPeopleOnClick}>
          <Text style={{ fontSize: 19, color: "blue", marginTop: 12 }} >
            {" "}
            Chat People
          </Text>
          
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBlank;

const styles = StyleSheet.create({
  image1: {
    width: 400,
    height: 400,
  },
});
