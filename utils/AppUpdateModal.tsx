import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Button, StyleSheet, Linking } from 'react-native';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import Constants from 'expo-constants';
import { app } from '../Config/Firebaseconfig'; // Adjust the path if necessary

const AppUpdateModal = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [latestVersion, setLatestVersion] = useState(null);
  const [dbVersion, setDbVersion] = useState(null); // Track the version from Firebase
  const currentVersion = Constants.expoConfig.version; // Get current app version from Expo config

  // Function to check the version and update Firebase if needed
  const checkVersion = (dbVersion) => {
    console.log(`Current version: ${currentVersion}, DB version: ${dbVersion}`);

    if (dbVersion > currentVersion) {
      // Display the update modal if a newer version is available
      setLatestVersion(dbVersion);
      setShowUpdateModal(true);
    } else if (dbVersion < currentVersion) {
      // Update Firebase with the current version if it's newer
      const db = getDatabase(app);
      const versionRef = ref(db, 'version');
      console.log(`Updating version in Firebase to: ${currentVersion}`);
      set(versionRef, currentVersion);
    } else {
      console.log('Versions are the same, no update needed.');
      setShowUpdateModal(false);
    }
  };

  useEffect(() => {
    const db = getDatabase(app);
    const versionRef = ref(db, 'version'); // Reference to the 'version' field in Firebase

    // Real-time listener for version changes
    const unsubscribe = onValue(versionRef, (snapshot) => {
      if (snapshot.exists()) {
        const dbVersion = snapshot.val();
        console.log('Received DB version: ', dbVersion);
        setDbVersion(dbVersion);
        checkVersion(dbVersion);
      } else {
        console.log('Version not found, setting initial version');
        // If the version field doesn't exist, initialize it with the current version
        const versionRef = ref(db, 'version');
        set(versionRef, currentVersion);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {showUpdateModal && (
        <Modal visible={showUpdateModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                A new version {latestVersion} is available! Please update from version {currentVersion}.
              </Text>
              <Button
                title="Update Now"
                onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.shreddersbay&pcampaignid=web_share')}
              />
            </View>
          </View>
        </Modal>
      )}
      <Text>Welcome to ShreddersBay!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
});

export default AppUpdateModal;
