import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { Alert, ToastAndroid } from "react-native";
// import { getAuth } from 'firebase/auth';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const auth = getAuth();
const provider = new GoogleAuthProvider();

const firebaseSignup = async (email, password, handleMe = (num) => console.log(`This is default callback ${num}`)) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Firebase user id is =>", user.uid);

    // Send verification email
    await sendEmailVerification(user);

    // Call the callback (handleSubmit) with the Firebase UID
    handleMe(user.uid);

    // Show an alert for verification email
    Alert.alert('Verification email sent. Please check your inbox.');
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert(`Error: ${error.message}`);
  }
};



// const handleGoogleLogin = async (handleMe = (num) => console.log(`This is default callback ${num}`)) => {
//      try {
//        // Wait for the signInWithPopup to resolve and get the user data
//        const data = await signInWithPopup(auth, provider);
   
//        // Set state or perform actions with the user data
//        setValue(data.user.email);
//        console.log("Google sign-in data:", data);
//        setFirebaseuid(data.user.uid);
//        console.log("Firebase UID is:", data.user.uid);
   
//        // Pass the user object to the callback
//        await handleMe(data.user); // Passing data.user as the argument
   
//      } catch (error) {
//        // Handle any errors that occur during the sign-in process
//        console.error('Error during Google sign-in:', error);
//      }
//    };
   

// const handleGoogleLogin = (handleMe = (num) => console.log(`This is default callback ${num}`)) => {
//      signInWithPopup(auth, provider)
//        .then((data) => {
//          // Set state or perform actions with the user data
//          setValue(data.user.email);
//          console.log("Google sign-in data:", data);
//          setFirebaseuid(data.user.uid);
//          console.log("Firebase UID is:", data.user.uid);
   
//          // Pass the user object to the callback
//          handleMe(data.user); // Passing data.user as the argument
//        })
//        .catch((error) => {
//          // Handle any errors that occur during the sign-in process
//          console.error('Error during Google sign-in:', error);
//        });
//    };
   
   GoogleSignin.configure({
     // Your configuration here
     androidClientId:"254504701779-vp42q40e3bvl60pvjag9ioku9lungl7r.apps.googleusercontent.com",
      webClientId:"254504701779-9qs5blu4jcikc6a704n2hdc5ktjmja7a.apps.googleusercontent.com",
      iosClientId:"254504701779-e6jge18cdt0im72ap9sus5bb09ha6625.apps.googleusercontent.com",
      offlineAccess: false,
      scopes:['profile','email']


   });
   const handleGoogleLogin = (handleMe = (num) => console.log(`This is default callback ${num}`)) => {
     GoogleSignin.signIn()
       .then((googleUser) => {
         const credential = provider.credential(googleUser.idToken);
         return signInWithCredential(auth, credential);
       })
       .then((userCredential) => {
         const user = userCredential.user;
         setValue(user.email); // Update the UI state with user email
         console.log("Google sign-in data:", user);
         setFirebaseuid(user.uid); // Store Firebase UID
         console.log("Firebase UID is:", user.uid);
         handleMe(user); // Pass user object to the callback
       })
       .catch((error) => {
         // Handle DEVELOPER_ERROR or any other error
         console.error('Error during Google sign-in:', error);
         alert('Google Sign-In Error: ' + error.message); // Show an alert
       });
   };
   
const firebaseSignIn = (email, password, callMe = (a,b) => console.log("Default callback executed",a,b)) => {
     signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
               const user = userCredential.user;

               if (user.emailVerified) {
                    console.log('User is signed in and email is verified:', user.uid);
                    // setState(prevState => ({ ...prevState, userCred: responseData,
                    //      gUserCred:JSON.stringify(responseData),
                    //      userIdApp:userId,
                    //      f_email:responseData["0"].email,
                    //      // f_mobile:null,
                    //      // f_id:null,
                    //      f_name:responseData["0"].name,
                    //      // f_password:null 
                    //      f_id:responseData["0"].firebase_uid,
                    //    }));
                    callMe(email,password);
                    Alert.alert('User SignIn Successfully!');
               }

               else {
                    console.log('Email is not verified');
                    alert('Please verify your email before signing in.');
               }
          })
          .catch((error) => {
               // setError(error.message);
              //  console.error('SignIn error:', error);
               ToastAndroid.show(error, ToastAndroid.SHORT);

          });
}
export {firebaseSignup, firebaseSignIn,handleGoogleLogin}