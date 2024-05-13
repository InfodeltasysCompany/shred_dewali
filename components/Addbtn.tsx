import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'

export const Addbtndef = ({color}) => {
    return (
        <View style={styles.container}>
            <Feather name="plus-circle" size={30} color={color} /> 
            {/* <AntDesign name="pluscircle" size={35} color={color} /> */}



        </View>
    )
}
export const Addbtnchanged = ({color}) => {
    return (
        <View style={styles.container}>
            <AntDesign name="pluscircle" size={30} color={color} />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        flex:1,
    }
});