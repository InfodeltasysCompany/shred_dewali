import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import * as Location from "expo-location";


const getUserId = async (): Promise<string | null> => {
  try {
    const storedData = await AsyncStorage.getItem("UserCred");

    if (storedData !== null) {
      const userDataObject = JSON.parse(storedData);

      // Check if the '0' key exists and 'id' field is present in the object
      if (userDataObject && userDataObject["0"] && userDataObject["0"].id) {
        const userId = userDataObject["0"].id;
        // console.log("User ID:", userId);
        return userId;
      } else {
        console.log("No user data or ID found.");
        return null;
      }
    } else {
      console.log("No data found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    return null;
  }
};

const getApiResponse = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url); // Perform GET request to the specified URL

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json(); // Parse response body as JSON

    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error fetching API data:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};
const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    // setErrorMsg("Permission to access location was denied");
    return null; // Return null if permission is denied
  }

  let location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  console.log("long:-", longitude, "lat:-", latitude);
  let reverseGeocode = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });
  // console.log("reverseGeocode:-", reverseGeocode);

  const address = reverseGeocode[0];
  // setLocation(location);
  return address; // Return the address
};
const postData = async (formData: FormData, apiUrl: string): Promise<any> => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        // Add any additional headers if required
      },
    });

    if (!response.ok) {
      // Handle non-2xx responses
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    throw error;
  }
};

const deleteAllExceptLast = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      // You can add headers or other options here if required
    });

    if (!response.ok) {
      throw new Error("Failed to delete data",apiUrl);
    }

    console.log("Data deleted successfully",apiUrl);
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
function handleFinalSubmitSAddress(formData, url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        // Add any necessary headers here (e.g., for authorization)
        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        // 'Content-Type': 'multipart/form-data', // This header is automatically set for FormData
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data if needed
        console.log("Success:", data);
        resolve(data); // Resolve the promise with the response data
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        reject(error); // Reject the promise with the error
      });
  });
}




export {
  getUserId,
  getApiResponse,
  getCurrentLocation,
  postData,
  deleteAllExceptLast,
  handleFinalSubmitSAddress,
};
