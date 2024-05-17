import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const SearchModalContent = () => {

    return (
        <View>
            <View style={{margin:10,}}>
                <View style={{...styles.searchbox,flexDirection:'row',padding:0,paddingLeft:20,justifyContent:'space-between',alignItems:'center',paddingRight:20,}}>
                <TextInput
                placeholder="search your scrap here.."
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={true}
                keyboardType="web-search"
                style={{fontSize:20}}
                onFocus={() => {
                    // setIsSearchModalVisible(true);
                }}
            />  
            <AntDesign name='search1' size={30} color={"gray"}/>
                </View>
            
            </View>
            
            <Text>My name is vinit. I like momo very much..</Text>
              </View>
    )
}

export default SearchModalContent

const styles = StyleSheet.create({
    searchbox: {
        borderColor:"gray",
        borderWidth:2,
        borderRadius:8,
        height:55,
        width:"90%",
        marginLeft:40,
        // margin:10,
        marginRight:10,
        padding:20,
        fontSize:17
        
    },
    container1: {
        marginBottom: 8,
        borderBottomWidth: 1,
        paddingBottom: 8,
        borderBottomColor: "#CCC",
        flexDirection: "row",
      },
})