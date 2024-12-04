import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';  // Import Firebase Authentication
import { realtimeDb } from '../../../Config/Firebaseconfig';

const AllChats = () => {
  const [user, setUser] = useState<any | null>(null);  // State to store user details
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState<string | null>(null);  // State to handle error messages

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();  // Get the authentication instance
      const currentUser = auth.currentUser;  // Get the authenticated user

      if (!currentUser) {
        console.error("User is not authenticated.");
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      const userID = currentUser.uid;  // Get the authenticated user's UID

      try {
        // Fetch user details from Firebase Realtime Database
        const userRef = ref(realtimeDb, `users/${userID}`);
        const userSnapshot = await get(userRef);

        if (!userSnapshot.exists()) {
          console.error("User details not found for ID:", userID);
          setError("User details not found.");
          setLoading(false);
          return;
        }

        const userDetails = userSnapshot.val();  // Get user data from snapshot
        setUser(userDetails);  // Set the fetched user data in state
        setLoading(false);  // Set loading to false after the fetch
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);  // Runs once when the component mounts

  // Loading or error states
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Chats</Text>

      {user ? (
        <View style={styles.userDetails}>
          <Text>User Name: {user.name}</Text>
          <Text>User Email: {user.email}</Text>
          {/* Add more details as necessary */}
        </View>
      ) : (
        <Text>No user data found.</Text>
      )}
    </View>
  );
};

export default AllChats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userDetails: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});