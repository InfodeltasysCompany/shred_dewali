// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet, Modal,TextInput, } from "react-native";

import { Button, Modal, Text, View } from "react-native";



// export const CloseIcon = ({ onPress }) => (
//     <TouchableOpacity onPress={onPress} style={styles.closeButton}>
//       <Image
//         source={require("../../assets/closeImage.jpg")}
//         style={{ width: 50, height: 50,padding:10 }}
//       />
//     </TouchableOpacity>
//   );


// const FullPageModal = ({closeModal}) => {
//   return (
//     <Modal animationType="none" visible={true}>
//       <View style={{ flex: 1 }}>
//         <CloseIcon onPress={closeModal} />
//         <View
//           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
          
//           <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//           >
//             <View>
//                 <Text>
//                     I have account in hdfc life bank..
//                 </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// export default FullPageModal

// const styles = StyleSheet.create({
//     closeButton: {
//         position: "absolute",
//         // top: 10,
//         right: 1,
//       },
//       container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       },
//       title: {
//         fontSize: 20,
//         fontWeight: "bold",
//         marginBottom: 20,
//       },
//       input: {
//         borderWidth: 1,
//         borderColor: "black",
//         width: "80%",
//         padding: 10,
//         marginBottom: 20,
//         fontSize: 18,
//       },
//       resendButton: {
//         backgroundColor: "blue",
//         padding: 10,
//         borderRadius: 5,
//         marginBottom: 10,
//       },
//       resendText: {
//         color: "white",
//         fontSize: 16,
//       },
//       autoFillButton: {
//         backgroundColor: "green",
//         padding: 10,
//         borderRadius: 5,
//       },
//       autoFillText: {
//         color: "white",
//         fontSize: 16,
//       },
// })

// Step 1: Modal component
 export  const FullPageModal = ({ onClose }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={onClose}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>Modal Content</Text>
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </Modal>
    );
  };