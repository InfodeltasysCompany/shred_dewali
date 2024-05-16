import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const SearchModalContent = () => {

    return (
        <View>
            <TextInput
                placeholder="search your scrap here.."
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={true}
                style={styles.searchbox}
                onFocus={() => {
                    // setIsSearchModalVisible(true);
                }}
            />  
            <Text>My name is vinit. I like momo very much..</Text>
              </View>
    )
}

export default SearchModalContent

const styles = StyleSheet.create({
    searchbox: {

    }
})