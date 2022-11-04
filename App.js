import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

function App() {
  // const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [videoname, setVideoname] = useState("");
  const [about, setAbout] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const postVideo = async () => {

    let formData = new FormData();
    formData.append("videoname", videoname);
    formData.append("about", about);
    if (image !==null){
      formData.append('image', {
        uri:uri,
        type:type
      })
    }
    await axios("http://192.168.45.7:8000/api/tweets/uploadvideos/", {
      method: "POST",
      headers: new Headers({
        Authorization:
          "Token " +
          "e574ac4002ace168599704cb89d18d05e94ea0c5ad619f1c8d6d9e381d77e41e",

        "Content-Type": "multipart/form-data",
      }),
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        // ADD THIS THROW error
        throw error;
      });
  };

  return (
    <View className="App">
      <Text
        style={{
          marginTop: 20,
          textAlign: "center",
          fontSize: 20,
          color: "green",
        }}
      >
        Hey Nick, its a good morning.
      </Text>
      <View>
        <TextInput
          type="text"
          placeholder="Enter video name."
          name="videoname"
          value={videoname}
          onChangeText={(text) => setVideoname(text)}
          style={{ fontSize: 25, color: "purple", textAlign: "center" }}
        />
        <TextInput
          type="text"
          placeholder="About the video"
          name="about"
          value={about}
          onChangeText={(text) => setAbout(text)}
          style={{ fontSize: 25, color: "purple", textAlign: "center" }}
        />
         <Button title="choose image" onPress={pickImage}  onChangeText={(image) => setImage(image)}/>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
        <Button onPress={postVideo} title="Post"></Button>
      </View>

      {/* <Button title="upload"></Button> */}
    </View>
  );
}

export default App;


// import React, { useState } from "react";

// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// import * as ImagePicker from "expo-image-picker";

// const App = () => {
//   const [image, setImage] = useState(null);

//   const uploadImage = async () => {
//     // Check if any file is selected or not
//     if (image != null) {
//       // If file selected then create FormData
//       const fileToUpload = image;
//       const data = new FormData();
     
//       data.append("file_attachment", fileToUpload);
//       // Please change file upload URL
//       let res = await fetch("http://192.168.45.7:8000/api/tweets/uploadvideos/", {
//         method: "POST",
//         body: data,
//         headers: new Headers({
//           Authorization:
//             "Token " +
//             "e574ac4002ace168599704cb89d18d05e94ea0c5ad619f1c8d6d9e381d77e41e",
//           "Content-Type": "multipart/form-data",
//         }),
//       });
//       let responseJson = await res.json();
//       if (responseJson.status == 1) {
//         alert("Upload Successful");
//       }
//     } else {
//       // If no file selected the show alert
//       alert("Please Select File first");
//     }
//   };

//   const selectFile = async () => {
//     // Opening Document Picker to select one file
//     try {
//       const res = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });
//       console.log(result);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//     } catch (err) {
//       setSingleFile(null);
//       // Handling any exception (If any)
//       if (DocumentPicker.isCancel(err)) {
//         // If user canceled the document selection
//         alert("Canceled");
//       } else {
//         // For Unknown Error
//         alert("Unknown Error: " + JSON.stringify(err));
//         throw err;
//       }
//     }
//   };
//   return (
//     <View style={styles.mainBody}>
//       <View style={{ alignItems: "center" }}>
//         <Text style={{ fontSize: 30, textAlign: "center" }}>
//           React Native File Upload Example
//         </Text>
//         <Text
//           style={{
//             fontSize: 25,
//             marginTop: 20,
//             marginBottom: 30,
//             textAlign: "center",
//           }}
//         >
//           www.aboutreact.com
//         </Text>
//       </View>
//       {/*Showing the data of selected Single file*/}
//       {singleFile != null ? (
//         <Text style={styles.textStyle}>
//           File Name: {singleFile.name ? singleFile.name : ""}
//           {"\n"}
//           Type: {singleFile.type ? singleFile.type : ""}
//           {"\n"}
//           File Size: {singleFile.size ? singleFile.size : ""}
//           {"\n"}
//           URI: {singleFile.uri ? singleFile.uri : ""}
//           {"\n"}
//         </Text>
//       ) : null}
//       <TouchableOpacity
//         style={styles.buttonStyle}
//         activeOpacity={0.5}
//         onPress={selectFile}
//       >
//         <Text style={styles.buttonTextStyle}>Select File</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.buttonStyle}
//         activeOpacity={0.5}
//         onPress={uploadImage}
//       >
//         <Text style={styles.buttonTextStyle}>Upload File</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainBody: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   buttonStyle: {
//     backgroundColor: "#307ecc",
//     borderWidth: 0,
//     color: "#FFFFFF",
//     borderColor: "#307ecc",
//     height: 40,
//     alignItems: "center",
//     borderRadius: 30,
//     marginLeft: 35,
//     marginRight: 35,
//     marginTop: 15,
//   },
//   buttonTextStyle: {
//     color: "#FFFFFF",
//     paddingVertical: 10,
//     fontSize: 16,
//   },
//   textStyle: {
//     backgroundColor: "#fff",
//     fontSize: 15,
//     marginTop: 16,
//     marginLeft: 35,
//     marginRight: 35,
//     textAlign: "center",
//   },
// });

// export default App;
