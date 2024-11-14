import React from "react";
import { View, StyleSheet } from "react-native";
import Skeleton from "../../../ReuseComponent/Skeleton"; // Make sure the correct path is used

const OrderDetailSkeleton = () => {
    return (
        <View style={styles.container}>


            <View style={styles.image}>
                <Skeleton type="text" width="100%" height={300} css={{ marginTop: 10 }} />
            </View>



            <View style={styles.columnsContainer}>
                {/* First column */}
                <View style={styles.column}>
                    <View style={styles.columnleft}>
                        <Skeleton type="text" width="100%" height={60} css={{ marginTop: 10 }} />
                        {/* <Skeleton type="text" width="100%" height={50} css={{ marginTop: 10 }} /> */}
                    </View>

                </View>

                {/* Second column */}



            </View>
            <View style={styles.columnsContainer}>
                {/* First column */}
                <View style={styles.column}>
                    <View style={styles.columnleft}>
                        <Skeleton type="text" width="100%" height={30} css={{ marginTop: 10 }} />
                        <Skeleton type="text" width="100%" height={30} css={{ marginTop: 10 }} />
                    </View>

                    {/* Additional Skeletons in the first column */}
                    <View style={styles.columnleft}>
                        <Skeleton type="text" width="100%" height={30} css={{ marginTop: 10 }} />
                        <Skeleton type="text" width="100%" height={30} css={{ marginTop: 10 }} />
                    </View>
                </View>

                {/* Second column */}
                <View style={styles.column}>
                    <View style={styles.columnright}>
                        <Skeleton type="text" width="100%" height={30} css={{ marginTop: 10 }} />
                        <Skeleton type="text" width="100%" height={30} css={{ marginTop: 10 }} />
                    </View>

                    {/* Additional Skeletons in the second column */}
                    <View style={styles.columnright}>
                        <Skeleton type="text" width="100%" height={30} css={{ marginTop: 10 }} />
                        <Skeleton type="text" width="100%" height={30} css={{ marginTop: 10 }} />
                    </View>

                </View>






            </View>


            <View style={{ ...styles.columnsContainer, }}>
                {/* First column */}
                <View style={styles.column}>
                    <View style={styles.columnleft}>
                        <Skeleton type="text" width="100%" height={32} css={{}} />
                        <Skeleton type="text" width="100%" height={32} css={{ marginTop: 10 }} />
                    </View>

                    {/* Additional Skeletons in the first column */}
                    <View style={styles.columnleft}>
                        <Skeleton type="text" width="100%" height={32} css={{ marginTop: 10 }} />
                        <Skeleton type="text" width="100%" height={32} css={{ marginTop: 10 }} />
                    </View>
                </View>

                {/* Second column */}
                <View style={styles.column}>
                    <View style={styles.columnright}>
                        <Skeleton type="text" width="100%" height={32} css={{}} />
                        <Skeleton type="text" width="100%" height={32} css={{ marginTop: 10 }} />
                    </View>

                    {/* Additional Skeletons in the second column */}
                    <View style={styles.columnright}>
                        <Skeleton type="text" width="100%" height={32} css={{ marginTop: 10 }} />
                        <Skeleton type="text" width="100%" height={32} css={{ marginTop: 10 }} />
                    </View>

                </View>






            </View>
        </View>
    );
};

// Styles to manage the layout of columns and rows
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
    },

    image: {
// marginBottom:30,
marginTop:-25
    },
    columnsContainer: {
        flexDirection: 'row',  // Position columns side by side
        justifyContent: 'space-between',  // Space the columns evenly
        width: '100%',  // Ensure the container takes full width
    },

    column: {
        flex: 1,  // Ensure each column takes equal space
        padding: 5,
    },

    columnleft: {

        justifyContent: 'space-between',  // Space out the skeletons within the row
        // marginBottom: 10,  // Add some space between rows
    },

    columnright: {
        justifyContent: 'space-between',  // Space out the skeletons within the row
        // marginBottom: 10,  // Add some 
    }
});

export default OrderDetailSkeleton;
