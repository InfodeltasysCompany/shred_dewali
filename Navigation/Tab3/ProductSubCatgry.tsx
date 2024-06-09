import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from "react-native";
import { TextInput } from "react-native-paper";
import ProductImageAdd from "./ProductImageAdd";

export const CloseIcon = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.closeButton}>
        <Image
            source={require("../../assets/closeImage.jpg")}
            style={{ width: 50, height: 50, padding: 10 }}
        />
    </TouchableOpacity>
);


const ProductSubCatgry = ({ closeModal, visible, p_id, navigation }) => {
    const [data, setData] = useState([]);
    const [submetalType, setSubmetaltype] = useState<string>('Sub Metal Type');
    const [selectedSubMetal, setSelectedSubMetal] = useState('');
    const [selectedSubMetalPrice, setselectedSubMetalPrice] = useState('');
    const [isDropdownenabled, setisDropdownenabled] = useState(false);
    const [textTitle, settextTitle] = useState('');
    const [textDescription, setTextDescription] = useState('');
    const [textPrice, setTextPrice] = useState('');
    const [textWeight, setTextWeight] = useState('');
    const [submetalError, setsubmetalError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [weightError, setweightError] = useState(false);
    const [isImageAddmodalVisible, setIsImageAddmodalVisible] = useState(false);
    const [filledformPost, setFilledformPost] = useState(null);

    const displayForm = useCallback(async () => {
        // setReset1(resetBtn);
        const url = "https://shreddersbay.com/API/product_api.php?action=select_id";
        const formData = new FormData();
        formData.append('p_id', p_id);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("responseData=>", responseData);
                setData(responseData); // Set the correct data
                if (responseData.length > 1) {
                    setisDropdownenabled(!isDropdownenabled);

                } else {
                    setSelectedSubMetal(responseData[0]?.p_type_name ?? 'Unknown')
                    setselectedSubMetalPrice(responseData[0]?.price ?? 'Unknown')

                }

            } else {
                console.error('Post API Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    }, [p_id]);

    useFocusEffect(
        useCallback(() => {
            displayForm();
        }, [displayForm])
    );


    const onChangeTextTitle = (text) => {
        settextTitle(text);
        if (text.length >= 10) {
            setTitleError(false);
        } else {
            setTitleError(true);
        }
    };

    const onChangeTextdescription = (text) => {
        setTextDescription(text)
        if (text.length >= 10) {
            setDescriptionError(false);
        } else {
            setDescriptionError(true);
        }
    }
    const onChangeTextPrice = (text) => {
        setTextPrice(text)
        if (text == '') {
            setPriceError(true);
        } else {
            setPriceError(false);
        }
    }
    const onChangeTextWeight = (text) => {
        setTextWeight(text)
        if (text == '') {
            setweightError(true);
        } else {
            setweightError(false);
        }
    }
    const handleErrors = () => {
        if (selectedSubMetal == '') {
            setsubmetalError(true);
        } else {
            setsubmetalError(false);
        }
        if (!(textTitle.length >= 10) || (textTitle == '')) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }
        if (!(textDescription.length >= 10) || (textDescription == '')) {
            setDescriptionError(true);
        } else {
            setDescriptionError(false)
        }
        if (textPrice == '') {
            setPriceError(true);
        } else {
            setPriceError(false);
        }
        if (textWeight == '') {
            setweightError(true);
        } else {
            setweightError(false);
        }

    }
    const handleNext = () => {
        // console.log("type",navigation)
        if (selectedSubMetal && selectedSubMetalPrice && textTitle && textDescription && textWeight && textPrice) {
            setFilledformPost({
                selectedSubMetal,
                textTitle,
                textDescription,
                textWeight,
                textPrice,
                p_id,
            })
            setIsImageAddmodalVisible(!isImageAddmodalVisible);
        } else {
            handleErrors();
        }
    }
    const setSelectedsubmetal1 = (itemValue) => {
        setSelectedSubMetal(itemValue)

        const selectedItem = data.find((item) => item.p_id === itemValue);
        setselectedSubMetalPrice(selectedItem.price);

    }
    ////////////////////////////
    const handleImageAddModal = () => {
        setIsImageAddmodalVisible(!isImageAddmodalVisible);
    }
    ///////////////////////////
    const resetBtn = () => {

        settextTitle("");
        setTextDescription("");
        setTextPrice("");
        setTextWeight("");
    }

    return (
        <Modal animationType="none" visible={visible}>
            <View style={{ flex: 1 }}>
                <ProductImageAdd closeModal={handleImageAddModal} visible={isImageAddmodalVisible} navigation={navigation} formfilledpost={filledformPost} setformfilledPost={setFilledformPost} />
                <AntDesign name="close" size={35} color={"gray"} onPress={closeModal} style={styles.closeIcon} />
                <View style={{ flex: 1, }}>
                    <View>
                        <View style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>Include some details</Text>
                        </View>
                        <View
                            style={{
                                marginTop: 25,
                                borderBottomWidth: 2,
                                borderBottomColor: "#21005d",
                                margin: 20,
                            }}
                        >
                            <Picker
                                selectedValue={selectedSubMetal}
                                style={{
                                    height: 80,
                                    width: 350,
                                    alignSelf: "center",


                                }}
                                itemStyle={{
                                    fontSize: 22,
                                    color: "blue",
                                    backgroundColor: "white",
                                }}
                                onValueChange={(itemValue) =>
                                    setSelectedsubmetal1(itemValue)
                                }
                                mode="dropdown" // Set mode to "dropdown" explicitly
                                enabled={isDropdownenabled}
                            >
                                <Picker.Item label={`${submetalType}`} value="" />
                                {data.map((item, index) => (
                                    <Picker.Item
                                        label={item?.p_type_name ?? 'Unknown'} // Add null check here
                                        value={item?.p_type_name ?? ''}
                                        key={index}
                                    />
                                ))}
                            </Picker>
                            {submetalError && <Text style={{ color: 'red', marginBottom: -30, }}>* Required</Text>
                            }
                        </View>
                        {!(selectedSubMetalPrice == '') && <View style={{
                            borderBottomWidth: 2,
                            borderBottomColor: "#21005d", marginTop: 30, margin: 20,
                        }}>
                            <Text style={{ margin: 10, fontSize: 15, color: 'blue' }}>Minimum set Price : -- {selectedSubMetalPrice}</Text>
                        </View>}


                        <TextInput
                            label="Title"
                            mode="flat" // Change mode to contained
                            value={textTitle}
                            keyboardType="default"
                            onChangeText={(text) => onChangeTextTitle(text)}
                            style={{ backgroundColor: 'white', margin: 20, marginBottom: 10 }}

                        />
                        {titleError && <Text style={{ color: 'red', marginBottom: -20, margin: 20, marginTop: 0, }}>A minimum length of 10 characters is required.</Text>}


                        <TextInput
                            label="Discription"
                            mode="flat" // Change mode to contained
                            value={textDescription}
                            keyboardType="default"
                            onChangeText={(text) => onChangeTextdescription(text)}
                            style={{ backgroundColor: 'white', margin: 20, marginBottom: 0 }}
                        />
                        {descriptionError && <Text style={{ color: 'red', marginBottom: -15, margin: 20, marginTop: 8, }}>A minimum length of 10 characters is required.</Text>}


                        <TextInput
                            label="Enter Price"
                            mode="flat" // Change mode to contained
                            value={textPrice}
                            onChangeText={(text) => onChangeTextPrice(text)}
                            style={{ backgroundColor: 'white', margin: 20, marginBottom: 0 }}
                            keyboardType="numeric"
                        />
                        {priceError && <Text style={{ color: 'red', marginBottom: -15, margin: 20, marginTop: 8, }}>* Required</Text>}

                        <TextInput
                            label="Enter Weight"
                            mode="flat" // Change mode to contained
                            value={textWeight}
                            onChangeText={(text) => onChangeTextWeight(text)}
                            style={{ backgroundColor: 'white', margin: 20, marginBottom: 0, }}
                            keyboardType="numeric"

                        />
                        {weightError && <Text style={{ color: 'red', marginBottom: -15, margin: 20, marginTop: 8, }}>* Required</Text>}

                        {/* <TouchableOpacity style={{ backgroundColor: '#00457E', height: 60, width: '90%', alignSelf: 'center', borderRadius: 8, marginTop: 25, alignItems: 'center', justifyContent: 'center' }} onPress={resetBtn}>
                            <Text style={{ color: 'white', fontSize: 27, fontWeight: '600' }}>Reset</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={{ backgroundColor: '#00457E', height: 60, width: '90%', alignSelf: 'center', borderRadius: 8, marginTop: 25, alignItems: 'center', justifyContent: 'center' }} onPress={handleNext}>
                            <Text style={{ color: 'white', fontSize: 27, fontWeight: '600' }}>Next</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {/* Other content */}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        position: "absolute",
        right: 1,
    },
    closeIcon: {
        position: 'absolute',
        // top: 10,
        // right: 10,
        margin: 15,
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

export default ProductSubCatgry;
