import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    TextInput,
    Button,
    ScrollView,
    ToastAndroid,
} from "react-native";
import { CheckBox } from 'react-native-elements';
import { AuthContext } from "../../redux/ContextApi/UserAuthProvider";

export const CloseIcon = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.closeButton}>
        <Image
            source={require("../../assets/closeImage.jpg")}
            style={{ width: 50, height: 50, padding: 10 }}
        />
    </TouchableOpacity>
);

const FeedBackModal = ({ closeModal, visible }) => {

    const [state, setState] = useContext(AuthContext);
    const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password } = state;
    const initialFeedbackType = {
        suggestion: false,
        complaint: false,
        question: false,
        praise: false
      };
    const [feedbackType, setFeedbackType] = useState(initialFeedbackType);
    const areAllFieldsFalse = (feedbackType) => {
        return Object.values(feedbackType).every(value => value === false);
    };

    const getTrueFields = (feedbackType) => {
        return Object.keys(feedbackType).filter(key => feedbackType[key] === true);
    };
    const [feedbackDescription, setFeedbackDescription] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');

    const handleCheckBoxChange = (type) => {
        setFeedbackType(prevState => ({ ...prevState, [type]: !prevState[type] }));
    };

    const handleSubmit = () => {
        // Validate required fields
        if (!feedbackDescription || !firstName || !lastName || !mobile  || !userIdApp) {
          ToastAndroid.showWithGravity(
            "Please fill in all required fields marked with *",
            ToastAndroid.LONG,
            ToastAndroid.TOP
          );
          return;
        }
        if (mobile.length <=9) {
            ToastAndroid.showWithGravity(
              "Mobile numbers should be 10 characters",
              ToastAndroid.LONG,
              ToastAndroid.TOP
            );
            return;
          }
          if (feedbackDescription.length <=9) {
            ToastAndroid.showWithGravity(
              "feedback should be length at least 10 character",
              ToastAndroid.LONG,
              ToastAndroid.TOP
            );
            return;
          }

      
        // Prepare form data
        const formdata = new FormData();
        formdata.append("user_id", userIdApp);
        formdata.append("mobile", mobile);
        
        // Append comments based on selected feedback types
        const trueFields = getTrueFields(feedbackType);
        const comments = trueFields.length ? `${trueFields.join(', ')} : ${feedbackDescription}` : feedbackDescription;
        formdata.append("comments", comments);
        
        formdata.append("address", address);
        formdata.append("name", `${firstName} ${lastName}`);
      
        // API endpoint URL
        const url = "https://shreddersbay.com/API/feedback_api.php?action=insert";
      
        // Send POST request
        fetch(url, {
          method: "POST",
          body: formdata,
          headers: {}
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log('Success:', data);
            ToastAndroid.showWithGravity(
                "Feedback Submitted successfully.",
                ToastAndroid.LONG,
                ToastAndroid.TOP
              );
            closeModal();
            setFeedbackDescription("");
            setFirstName("");
            setLastName("");
            setAddress("");
            setMobile("");
            setFeedbackType(initialFeedbackType);

          })
          .catch((error) => {
            console.error('Error:', error);
            ToastAndroid.showWithGravity(
              "Failed to submit feedback. Please try again later.",
              ToastAndroid.LONG,
              ToastAndroid.TOP
            );
          });
      };
      

    return (
        <Modal animationType="slide" visible={visible}>
            <View style={{ flex: 1 }}>
                <CloseIcon onPress={closeModal} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <Text style={styles.header}>Feedback Form</Text>
                        <Text style={styles.subtitle}>
                            We would love to hear your thoughts, suggestions, concerns, or problems with anything so we can improve!            </Text>

                        <View style={styles.field}>

                            <Text style={styles.label}>Feedback Type</Text>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    title="Suggestion"
                                    checked={feedbackType.suggestion}
                                    onPress={() => handleCheckBoxChange('suggestion')}
                                    containerStyle={styles.checkbox}
                                />
                                <CheckBox
                                    title="Complaint"
                                    checked={feedbackType.complaint}
                                    onPress={() => handleCheckBoxChange('complaint')}
                                    containerStyle={styles.checkbox}
                                />
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    title="Question"
                                    checked={feedbackType.question}
                                    onPress={() => handleCheckBoxChange('question')}
                                    containerStyle={styles.checkbox}
                                />
                                <CheckBox
                                    title="Praise"
                                    checked={feedbackType.praise}
                                    onPress={() => handleCheckBoxChange('praise')}
                                    containerStyle={styles.checkbox}
                                />
                            </View>
                        </View>

                        <View style={styles.field}>

                            <Text style={styles.label}>* Describe Your Feedback:</Text>

                            <TextInput
                                style={[styles.input, { height: 100 }]}
                                multiline={true}
                                placeholder="Describe your feedback here"
                                value={feedbackDescription}
                                onChangeText={text => setFeedbackDescription(text)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>* Name</Text>
                            <View style={styles.nameContainer}>
                                <TextInput
                                    style={[styles.input, { flex: 1, marginRight: 5 }]}
                                    placeholder="First Name"
                                    value={firstName}
                                    onChangeText={text => setFirstName(text)}
                                />
                                <TextInput
                                    style={[styles.input, { flex: 1, marginLeft: 5 }]}
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChangeText={text => setLastName(text)}
                                />
                            </View>
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>* Mobile</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your mobile number"
                                keyboardType="numeric"
                                value={mobile}
                                onChangeText={text => setMobile(text)}
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your address"
                                value={address}
                                onChangeText={text => setAddress(text)}
                            />
                        </View>

                        {/* <View style={styles.field}>
              <Text style={styles.label}>* E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your e-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View> */}

                        <View style={styles.submitButton}>
                            <Button title="Submit" onPress={handleSubmit} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        position: "absolute",
        // top: 40,
        // right: 20,
        zIndex: 1,
    },
    container: {
        flexGrow: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        // marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    field: {
        width: '100%',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        width: '100%'
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkbox: {
        flex: 1,
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginLeft: 0,
        marginRight: 0,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    submitButton: {
        marginTop: 20,
        width: '100%',
    },
});

export default FeedBackModal;
