import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'


const Aluminium = () => {
    return (
        <View>
            <Text style={styles.text2}>Aluminum Image</Text>


            <View style={styles.container2}>

                <View style={styles.container3}>
                    <View style={styles.container6}>
                        <Image source={require('../../assets/aluminum.jpeg')} style={styles.icon} />
                        <Text style={styles.text3}> PIPE</Text>
                    </View>

                    <View style={styles.container6}>
                        <Image source={require('../../assets/screw.jpeg')} style={styles.icon} />
                        <Text style={styles.text3}>SCREW</Text>
                    </View>
                </View>

                <View style={styles.container3}>
                    <View style={styles.container6}>
                        <Image source={require('../../assets/aluminium1.jpeg')} style={styles.icon} />
                        <Text style={styles.text3}>WIRE</Text>
                    </View>

                    <View style={styles.container6}>
                        <Image source={require('../../assets/foel.jpeg')} style={styles.icon} />
                        <Text style={styles.text3}>FOEL PAPER</Text>
                    </View>

                </View>

            </View>

        </View>
    )
}

export default Aluminium

const styles = StyleSheet.create({

    text3: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 6,

    },
    icon: {
        width: 140,
        height: 140,
        alignSelf: 'center',
        borderRadius: 10,
    },

    container5: {
        flex: 1,
        padding: 5,
        borderWidth: 0.7,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        margin: 8,
    },

    container6: {
        flex: 1,
        padding: 5,
        borderWidth: 0.7,
        backgroundColor: '#D6CC99',
        borderRadius: 10,
        margin: 10,
    },


    container3: {
        flexDirection: 'row',

    },

    container2: {

    },
    text2: {
        fontSize: 22,
        color: 'black',
        marginTop: 15,
        marginBottom: 30,
        paddingTop: 20,
        fontWeight: 'bold',

        borderTopWidth: 0.5,
        borderTopColor: 'gray',

    }
})