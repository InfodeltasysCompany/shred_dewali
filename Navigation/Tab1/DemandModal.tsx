import React, { useContext, useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, Alert, TouchableOpacity, Button } from 'react-native';
import { AuthContext } from '../../redux/ContextApi/UserAuthProvider';
import LoginModal from '../../components/Credential/LoginModal';
import { TextInput } from 'react-native-paper';
import { BASE_URL } from '../../ReuseComponent/Env';

function DemandModal({ item, Open, onClose, navigation }) {
     const [requirement, setRequirement] = useState(item.requirement || '');
     const [address, setAddress] = useState(item.address || '');
     const [state] = useContext(AuthContext);
     const { userIdApp } = state;

     // Function to handle form submission
     // const handleSubmit = async () => {
     //      if (userIdApp !== "") {

     //           if (requirement !== "" || address !== "") {

     //                const formData = new FormData();
     //                formData.append('requirement', requirement);
     //                formData.append('address', address);
     //                formData.append('user_id', userIdApp);

     //                try {
     //                     const response = await fetch(`${BASE_URL}/requirement_api.php?action=insert`, { // Replace with your API endpoint
     //                          method: 'POST',
     //                          body: formData,
     //                          headers: {
     //                               'Content-Type': 'multipart/form-data',
     //                          },
     //                     });

     //                     const result = await response.json();
     //                     if (response.ok) {
     //                          Alert.alert('Success', 'Data submitted successfully!');
     //                          onClose(); // Close modal after submission
     //                          setRequirement("");
     //                          setAddress("")
     //                     } else {
     //                          Alert.alert('Error', result.message || 'Failed to submit data');
     //                     }
     //                } catch (error) {
     //                     console.error('Error submitting data:', error);
     //                     Alert.alert('Error', 'Something went wrong. Please try again.');
     //                }
     //           } else {
     //                Alert.alert("please fill all the field. requirement and address")
     //           }
     //      } else {
     //           handleCloseLoginMOdal();
     //      }
     // };
     useEffect(()=>{if(isLoginModalVisible){
          setIsLoginModalVisible(!isLoginModalVisible)
     }},[userIdApp])
     useEffect(()=>{setRequirement(""); setAddress("")},[Open])


     const handleSubmit = async () => {
          if (userIdApp && userIdApp.trim() !== "") { // Ensure userIdApp is not empty, null, or undefined
              if (requirement.trim() !== "" && address.trim() !== "") { // Ensure both fields are filled
                  const formData = new FormData();
                  formData.append('requirement', requirement);
                  formData.append('address', address);
                  formData.append('user_id', userIdApp);
      
                  try {
                      const response = await fetch(`${BASE_URL}/requirement_api.php?action=insert`, { 
                          method: 'POST',
                          body: formData,
                          headers: {
                              'Content-Type': 'multipart/form-data',
                          },
                      });
      
                      const result = await response.json();
                      if (response.ok) {
                          Alert.alert('Success', 'Data submitted successfully!');
                          onClose(); // Close modal after submission
                          setRequirement("");
                          setAddress("");
                      } else {
                          Alert.alert('Error', result.message || 'Failed to submit data');
                      }
                  } catch (error) {
                      console.error('Error submitting data:', error);
                      Alert.alert('Error', 'Something went wrong. Please try again.');
                  }
              } else {
                  Alert.alert("Please fill all the fields: requirement and address");
              }
          } else {
              handleCloseLoginMOdal(); // Show login modal if user is not logged in
          }
      };
      
     const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
     const handleCloseLoginMOdal = () => {
          setIsLoginModalVisible(!isLoginModalVisible);
     }

     return (
          <Modal
               animationType="slide"
               transparent={true}
               visible={Open}
               onRequestClose={onClose}
          >
               <View style={styles.overlay}>
                    <View style={styles.modalView}>
                         {/* Close button (X) in the top right corner */}
                         <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                              <Text style={styles.closeButtonText}>X</Text>
                         </TouchableOpacity>

                         {/* Data display section */}
                         <View style={styles.dataSection}>
                              <View style={{ marginVertical: 10 }}>
                                   <Text style={{ fontSize: 25, fontWeight: "600", fontFamily: 'san-sarif', }}>Requirement</Text>
                              </View>

                              <View style={styles.infoBox}>
                                   {/* Name */}
                                   <View style={styles.infoRow}>
                                        <Text style={styles.label}>Name:</Text>
                                        <Text style={styles.value}>{item.name}</Text>
                                   </View>

                                   {/* Email */}
                                   <View style={styles.infoRow}>
                                        <Text style={styles.label}>Email:</Text>
                                        <Text style={styles.value}>{item.email}</Text>
                                   </View>

                                   {/* Requirement */}
                                   <View style={styles.infoRow}>
                                        <Text style={styles.label}>Requirement:</Text>
                                        <Text style={styles.value}>{item.requirement}</Text>
                                   </View>

                                   {/* Address */}
                                   <View style={styles.infoRow}>
                                        <Text style={styles.label}>Address:</Text>
                                        <Text style={styles.value}>{item.address}</Text>
                                   </View>

                                   {/* Created At */}
                                   <View style={styles.infoRow}>
                                        <Text style={styles.label}>Created At:</Text>
                                        <Text style={styles.value}>{item.created_at}</Text>
                                   </View>
                              </View>



                         </View>

                         {/* Input fields for editing requirement and address */}
                         <View style={styles.demandinput}>
                              <View style={{ marginVertical: 10 }}>
                                   <Text style={{ fontSize: 20, fontWeight: "500", fontFamily: 'sans-sarif', textAlign: 'center' }}>Fill Your Requirement?</Text>
                              </View>

                              <View style={{ marginBottom: 10 }}>
                                   <TextInput
                                        // style={styles.input}
                                        label="Requirement"
                                        mode='outlined'
                                        value={requirement}
                                        onChangeText={setRequirement}
                                   />
                                   <TextInput
                                        // style={styles.input}
                                        placeholder="Address"
                                        mode='outlined'
                                        value={address}
                                        label="Address"
                                        onChangeText={setAddress}
                                   />
                              </View>

                              <Button title="Submit" onPress={handleSubmit} />
                         </View>


                    </View>
               </View>
               <LoginModal navigation={navigation} visible={isLoginModalVisible} setVisible={handleCloseLoginMOdal} />
          </Modal>
     );
}

export default DemandModal;

const styles = StyleSheet.create({
     overlay: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
     },
     modalView: {
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          width: '80%',
          position: 'relative', // To position the close button
     },
     closeButton: {
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'gray',
          borderRadius: 50,
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
     },
     closeButtonText: {
          color: 'white',
          fontWeight: 'bold',
     },
     dataSection: {
          marginBottom: 20,
          alignItems: 'center',
          marginTop: 20,


     },
     modalText: {
          marginBottom: 5,
          textAlign: 'center',
     },

     button: {
          borderRadius: 20,
          padding: 10,
          elevation: 2,
          margin: 10,
          width: '100%',
     },
     buttonSubmit: {
          backgroundColor: '#28a745',

          width: '100%',
     },
     demandinput: {
          width: '100%',

     },

     demandItem: {
          display: 'flex',
          gap: 30,
          flexDirection: 'row',
          alignItems: 'center',
     },
     textStyle: {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
     },
     infoBox: {
          width: "100%",
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 4,
          padding: 14,
     },
     infoRow: {
          flexDirection: 'row',  // Align label and value horizontally
          justifyContent: 'flex-start',
          marginBottom: 10,      // Space between rows
     },
     label: {
          fontWeight: 'bold',
          width: '40%',          // Control width of the label
          color: '#000',         // Black color for label
     },
     value: {
          color: 'gray',    // Light gray for value text
          width: '60%',          // Remaining width for the value
          textAlign: 'left',
     },

});
