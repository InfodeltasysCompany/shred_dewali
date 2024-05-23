// // import { useState } from 'react';
// // import { Button, Image, View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
// // import * as ImagePicker from 'expo-image-picker';

// // export default function ResolveImagePost() {
// //     const [image, setImage] = useState(null);
// //     const [imgasset, setImgasset] = useState(null);

// //     const pickImage = async () => {
// //         // No permissions request is necessary for launching the image library
// //         let result = await ImagePicker.launchImageLibraryAsync({
// //             mediaTypes: ImagePicker.MediaTypeOptions.All,
// //             allowsEditing: true,
// //             aspect: [4, 3],
// //             quality: 1,
// //         });

// //         // console.log(result);
// //         const name = new Date().toLocaleString();

// //         if (!result.canceled) {
// //             setImage(result.assets[0].uri);
// //             setImgasset({
// //                 uri: result.assets[0].uri,
// //                 name: name,
// //                 filename: name,
// //                 type: result.assets[0].type

// //             })
// //         }
// //     };

// //     const handleSubmit = async () => {

// //         try {
// //             // Add a check to prevent multiple submissions
// //             // If already submitting, return early to avoid duplicate submissions
// //             //   console.log("capturedImage:-", capturedImage,selectedImage);



// //             //   if (user_id && (capturedImage || selectedImage) && textInputValue && price && p_id) {
// //             //     const weight = parseInt(textInputValue);
// //             //     const price1 = parseInt(price);

// //             ////
// //             const currentDate = new Date();

// //             // Get individual date components
// //             const year = currentDate.getFullYear();
// //             const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0
// //             const day = currentDate.getDate().toString().padStart(2, '0');
// //             const hours = currentDate.getHours().toString().padStart(2, '0');
// //             const minutes = currentDate.getMinutes().toString().padStart(2, '0');
// //             const seconds = currentDate.getSeconds().toString().padStart(2, '0');

// //             // Concatenate date and time in the desired format
// //             const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// //             const randomNumber = Math.floor(Math.random() * 10).toString();
// //             console.log("the randomNumber is :-", randomNumber);
// //             const user_id = 2479;
// //             const textInputValue = 123;
// //             const p_id = 101;
// //             const price = 321;

// //             try {
// //                 const formData = new FormData();

// //                 //   let imageUri: string | null = capturedImage || selectedImage;

// //                 //   if (imageUri) {
// //                 //     const filename = `${currentDateTime}:${randomNumber}.jpg`;

// //                 //     const image = {
// //                 //       uri: imageUri,
// //                 //       name: filename,
// //                 //       type: 'image/jpg', // Adjust the type according to your image
// //                 //     };

// //                 //     formData.append('file', image as any);
// //                 //     // formData.append('file', "hellot");

// //                 //   }

// //                 formData.append("file", imgasset as any)

// //                 formData.append('user_id', user_id.toString());
// //                 formData.append('weight', textInputValue.toString());
// //                 formData.append('price', price.toString())
// //                 formData.append('prod_id', p_id.toString());
// //                 console.log(formData);


// //                 const url = 'https://shreddersbay.com/API/cart_api.php?action=insert';
// //                 // const url =
// //                 //   "https://shreddersbay.com/API/auctioncart_api.php?action=insert";
// //                 const uploadResponse = await fetch(url, {
// //                     method: 'POST',
// //                     body: formData,
// //                     headers: {
// //                         'Content-Type': 'multipart/form-data',
// //                         // Add any necessary headers here
// //                     },
// //                 });
// //                 // console.log("the multiple of weight and price is :-", (weight * price1).toString());

// //                 if (uploadResponse.ok) {


// //                     console.log(uploadResponse.status);
// //                     // setIsAddScrap(false)
// //                     Alert.alert("Add Scrap Successfully.")

// //                 } else {
// //                     console.error('Failed to upload image');
// //                 }
// //             } catch (error) {
// //                 console.error('Error uploading image: ', error);
// //             }
// //             //   } else {
// //             //     Alert.alert('Please choose all necessary fields like: choose product, weight, choose or capture Image');
// //             //   }


// //         } catch (error) {
// //             console.error('Error during handleSubmit:', error);
// //         }
// //     };
// //     return (
// //         <View style={styles.container}>
// //             <Text>this is vinit...</Text>
// //             {image &&
// //                 <View>
// //                     <Image source={{ uri: image }} style={styles.image} />
// //                 </View>
// //             }
// //             {/* <Button title="Pick an image from camera roll" onPress={pickImage}  /> */}
// //             <TouchableOpacity style={{ backgroundColor: "blue", height: 130, width: 260, alignItems: 'center', justifyContent: 'center', marginTop: 200 }} onPress={pickImage}>
// //                 <Text style={{ color: 'white', fontSize: 35, }}> Open Galarry </Text>
// //             </TouchableOpacity>
// //             {/* {
// //       <View>
// //       <Image source={{ uri: image }} style={styles.image} />
// //       </View>
// //       } */}
// //             <View>
// //                 <TouchableOpacity style={{ height: 60, width: 150, backgroundColor: 'blue', marginTop: 30, alignItems: 'center', justifyContent: 'center' }} onPress={handleSubmit}>
// //                     <Text style={{ color: 'white', fontSize: 35 }}>Submit</Text>
// //                 </TouchableOpacity>
// //             </View>
// //         </View>
// //     );
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         alignItems: "center",
// //         justifyContent: "center",
// //     },
// //     image: {
// //         width: 200,
// //         height: 200,
// //     },
// // });




// import React, { useState } from 'react';
// import { Button, Image, View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function ResolveImagePost() {
//   const [image, setImage] = useState(null);
//   const [imgasset, setImgasset] = useState(null);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       const name = new Date().toLocaleString();
//       console.log(name)
//       let  t= "12345678"
//       setImgasset({
//         uri: result.assets[0].uri,
//         name: t,
//         // filename: name,
//         type: result.assets[0].type
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       // Add a check to prevent multiple submissions
//       // If already submitting, return early to avoid duplicate submissions
//       if (!imgasset) {
//         return;
//       }

//       const { user_id, textInputValue, p_id, price } = getFormData();

//       const formData = new FormData();
//       formData.append("file", imgasset as any);
//       formData.append('user_id', user_id.toString());
//       formData.append('weight', textInputValue.toString());
//       formData.append('price', price.toString());
//       formData.append('prod_id', p_id.toString());

//       const url = 'https://shreddersbay.com/API/cart_api.php?action=insert';
//       const uploadResponse = await fetch(url, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (uploadResponse.ok) {
//         Alert.alert("Add Scrap Successfully.");
//       } else {
//         console.error('Failed to upload image');
//       }
//     } catch (error) {
//       console.error('Error during handleSubmit:', error);
//     }
//   };

//   const getFormData = () => {
    
//     const user_id = 2479;
//     const textInputValue = 123;
//     const p_id = 101;
//     const price = 321;
//     return { user_id, textInputValue, p_id, price };
//   };

//   return (
//     <View style={styles.container}>
//       <Text>this is vinit...</Text>
//       {image && <Image source={{ uri: image }} style={styles.image} />}
//       <TouchableOpacity style={styles.button} onPress={pickImage}>
//         <Text style={styles.buttonText}> Open Gallery </Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}> Submit </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     width: 200,
//     height: 200,
//   },
//   button: {
//     height: 60,
//     width: 150,
//     backgroundColor: 'blue',
//     marginTop: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 35,
//   },
// });



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ResolveImagePost = () => {
  return (
    <View>
      <Text>ResolveImagePost</Text>
    </View>
  )
}

export default ResolveImagePost

const styles = StyleSheet.create({})