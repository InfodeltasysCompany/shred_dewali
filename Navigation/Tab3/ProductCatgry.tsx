import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, ScrollView, Alert } from "react-native";
import ProductSubCatgry from "./ProductSubCatgry";
import { AntDesign } from "@expo/vector-icons";

// Define the type for the items
interface Item {
  source: any;
  label: string;
  p_id?: string; // Optional product_id
}


const defaultItems: Item[] = [
  { source: require('../../assets/steel.jpeg'), label: 'STEEL' },
  { source: require('../../assets/pump.jpg'), label: 'Pump' },
  { source: require('../../assets/lead1.jpg'), label: 'Lead' },
  { source: require('../../assets/brass2.jpg'), label: 'Brass' },
  { source: require('../../assets/Computer.jpg'), label: 'Computer Part' },
  { source: require('../../assets/plastic.jpeg'), label: 'plastic' },
  { source: require('../../assets/railway.jpeg'), label: 'RAILWAY' },
  { source: require('../../assets/cycle.jpg'), label: 'CYCLE' },
  { source: require('../../assets/bike.jpg'), label: 'BIKE' },
  { source: require('../../assets/ship.jpg'), label: 'SHIP' },
  { source: require('../../assets/iron.jpeg'), label: 'IRON' },
  { source: require('../../assets/aluminum.jpeg'), label: 'ALUMINIUM' },
  { source: require('../../assets/newpaper.jpeg'), label: 'PAPER' },
  { source: require('../../assets/car.jpg'), label: 'CAR' },
  { source: require('../../assets/cable.jpeg'), label: 'wire' },

];
const CloseIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.closeButton}>
    <Image
      source={require("../../assets/closeImage.jpg")}
      style={{ width: 50, height: 50 }}
    />
  </TouchableOpacity>
);

const ProductCatgry = ({ navigation, visible }) => {

  const [items, setItems] = useState<Item[]>(defaultItems);
  // const [reset1, setReset1] = useState(() => {
  //   return () => {
  //     console.log("Default function for reset1");
  //   };
  // });

  // const [reset2, setReset2] = useState(() => {
  //   return () => {
  //     console.log("Default function for reset2");
  //   };
  // });
  const getCatagory = async () => {
    const url = "https://shreddersbay.com/API/product_api.php?action=select";

    try {
      const result = await fetch(url);
      const jsonResult = await result.json();
      // console.log("jsonResult=>", jsonResult);
      const updatedItems = defaultItems.map((item, index) => {
        if (jsonResult[index]) {
          return {
            ...item,
            label: jsonResult[index].p_name,
            p_id: jsonResult[index].p_id,
          };
        }
        return item;
      });

      setItems(updatedItems);
    } catch (error) {
      console.log("error=>", error);
    }
  };

  const onCloseMethod = () => {
    console.log("Closing modal...");

    navigation.navigate("Tab1", { screen: "T1Screen1" });

    // Alert.alert(
    //     'Confirmation',
    //     'Are you sure you want to discard this Ad ?',
    //     [
    //       {
    //         text: 'Cancel',
    //         style: 'cancel',
    //       },
    //       {
    //         text: 'OK',
    //         onPress: () => {
    //           // If user confirms, navigate to the Main screen
    //           navigation.navigate("Tab1",{screen:"T1Screen1"});

    //         },
    //       },
    //     ]
    //   );



  };


  const [issubcatmodalVisible, setIssubcatmodalVisible] = useState(false);
  const [subCatID, setsubCatID] = useState('');
  const checkModalAndProductId = (id: string) => {
    if (subCatID == '') {
      setsubCatID(id);
    } else {
      setsubCatID('');
    }
    setIssubcatmodalVisible(!issubcatmodalVisible);
  }

  useEffect(() => {
    getCatagory();
  }, []);

  return (
    <Modal animationType="none" visible={visible}>
      <ProductSubCatgry closeModal={checkModalAndProductId} visible={issubcatmodalVisible} p_id={subCatID} navigation={navigation} />
      <View style={{ flex: 1, margin: 10 }}>
        {/* <CloseIcon onPress={onCloseMethod} /> */}
        <AntDesign name="close" size={35} color={"gray"} onPress={onCloseMethod} />
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -28 }}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>What you are offering</Text>

        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ScrollView>
            <View style={styles.container}>
              {items.map((item, index) => (
                <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => checkModalAndProductId(item.p_id)}>
                  <Image source={item.source} style={styles.icon} />
                  <Text style={styles.text}>{item.label}</Text>
                </TouchableOpacity>
              ))}
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
    right: 1,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemContainer: {
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
    marginVertical: 40,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
  },
  text: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default ProductCatgry;
