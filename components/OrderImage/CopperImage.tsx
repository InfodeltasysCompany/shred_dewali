import { StyleSheet, Text, View ,Image, ScrollView} from 'react-native'
import React from 'react'


const CopperImage = () => {
  return (


    

<View>

      <Text style={styles.text2}>CopperImage</Text>
      

      <View style={styles.container2}>

        <View style={styles.container3}>
            <View  style={styles.container5}>
            <Image source={require('../../assets/copper1.jpeg')} style={styles.icon} />
                <Text  style={styles.text3}> BUCKET</Text>
            </View>

            <View  style={styles.container5}>
            <Image source={require('../../assets/copper.jpeg')} style={styles.icon} />
                <Text  style={styles.text3}>WIRE</Text>
            </View>
        </View>
       
            <View style={styles.container3}> 
                    <View  style={styles.container5}>
                    <Image source={require('../../assets/screw.jpeg')} style={styles.icon} />
                    <Text  style={styles.text3}>PIPE</Text>
                    </View>

                    <View  style={styles.container5}>
                    <Image source={require('../../assets/wire1.jpeg')} style={styles.icon} />
                        <Text  style={styles.text3}>ROLL</Text>
                    </View>

            </View>
       
      </View>

</View>



    
  
  )
}

export default CopperImage

const styles = StyleSheet.create({


    text3:{
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 6,

    },
     icon:{
        width: 140,
        height: 140,
        alignSelf: 'center',
        borderRadius: 10,
            },

    container5:{
       flex: 1,
       padding: 5,
       borderWidth: 0.7,
       backgroundColor: 'lightgrey',
       borderRadius: 10,
       margin: 8,
    },

    container6:{
        flex: 1,
        padding: 5,
        borderWidth: 0.7,
        backgroundColor: '#D6CC99',
        borderRadius: 10,
        margin: 10,
     },

 
    container3:{
        flexDirection: 'row',
       
     },

     container2:{

     },
    text2:{
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