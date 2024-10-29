1. preview or .apk command:-
  eas build --profile preivew --platform android
2. development build command:-
  eas build --profile development --platform android
3. distribution or .aab command:-
  eas build --profile distribution --platform android
note:- before making new distribution build we need to change or increase in app.json
  "versionCode": 14,
  "version": "1.0.14",
then only it will accept in playstore console.
for making update for OTA (on the air) when there is small changes the command is:-
   eas update --message "new changes" --profile distribution
