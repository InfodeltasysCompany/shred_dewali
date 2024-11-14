

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { BASE_URL } from '../ReuseComponent/Env';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function handlePushNotifications(user_id, firebase_id, request_number) {
  console.log("Calling handlePushNotifications... and the passed data is=>", user_id, firebase_id, request_number);

  const deviceInfo = await fetchDeviceDetails();
  const token = await registerForPushNotifications();

  if (token) {
    await sendPushTokenToAPI(token, deviceInfo, user_id, firebase_id, request_number);
  } else {
    console.error("Failed to obtain push notification token.");
  }
}

async function fetchDeviceDetails() {
  return {
    brand: Device.brand || '',
    modelName: Device.modelName || '',
    osName: Device.osName || '',
    osVersion: Device.osVersion || '',
    deviceName: Device.deviceName || '',
    manufacturer: Device.manufacturer || '',
  };
}

async function registerForPushNotifications() {
  if (!Device.isDevice) {
    alert('Must use a physical device for Push Notifications');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notifications!');
    return null;
  }

  const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  console.log('Expo Push Token:', token);
  return token;
}

async function sendPushTokenToAPI(token, deviceInfo, user_id, firebase_id, request_number) {
  try {
    const formData = new FormData();
    formData.append('android_notify_token', token);
    formData.append('modelName', deviceInfo.modelName);
    formData.append('osName', deviceInfo.osName);
    formData.append('user_id', user_id);
    formData.append('firebase_id', firebase_id);
    formData.append('request_number', request_number);

    const response = await fetch(`${BASE_URL}/Notify_Token.php`, {
      method: 'POST',
      body: formData,
    });

    const responseText = await response.text(); // Get raw response text
    console.log('API Response Text:', responseText); // Log the raw response

    if (!response.ok) {
      console.error('API Response Error:', response.status, responseText);
      return;
    }

    if (responseText) {
      const data = JSON.parse(responseText);
      console.log('API Response:', data);
    }
  } catch (error) {
    console.error('Error sending push token to API:', error);
  }
}

