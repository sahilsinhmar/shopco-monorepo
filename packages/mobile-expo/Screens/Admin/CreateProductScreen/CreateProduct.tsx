import {
  Button,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Categories } from "../../../utils/constants/Categories";
import { ClothesTypes } from "../../../utils/constants/ClotheTypes";
import DropdownComponent from "../../../Components/Dropdown/Dropdown";
import MultiSelectComponent from "../../../Components/Dropdown/MultiSelectDropdown";
import { ClotheSizes } from "../../../utils/constants/Sizes";
import { Colors } from "../../../utils/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [clotheType, setClotheType] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const queryClient = useQueryClient();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSelectFile = async (event: any) => {
    let newImages: any = [];

    if (Platform.OS === "web") {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        newImages.push({
          uri: URL.createObjectURL(file),
          name: file.name,
          type: file.type,
        });
      }
    } else {
      let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!result.granted) {
        alert("Permission to access camera roll is required");
        return;
      }

      const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!imagePickerResult.canceled && imagePickerResult.assets) {
        newImages = imagePickerResult.assets;
      }
    }

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const createProduct = async () => {
    setIsLoading(true);
    setError("");
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !clotheType ||
      !sizes ||
      !colors
    ) {
      setError("Please add all the details");
      setIsLoading(false);
      return;
    }

    if (!images.length) {
      setError("Image is required");
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("category", category);
    data.append("type", clotheType);
    data.append("sizes", JSON.stringify(sizes));
    data.append("colors", JSON.stringify(colors));

    if (Platform.OS === "web") {
      images.forEach((image, index) => {
        data.append("images", image as any);
      });
    } else {
      images.forEach((image, index) => {
        // @ts-ignore
        data.append(`images`, {
          uri: image.uri,
          name: `image${index}.${
            image.uri.split(".")[image.uri.split(".").length - 1]
          }`,
          type: `image/${
            image.uri.split(".")[image.uri.split(".").length - 1]
          }`,
        });
      });
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URI}/api/v1/createproduct/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res?.data?.status === "SUCCESS") {
        navigation.goBack();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.msg);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleSubmit = async () => {
    mutation.mutate();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 30,
        paddingBottom: 150,
        backgroundColor: "white",
        alignItems: `${Platform.OS === "web" ? "center" : "stretch"}`,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            editable={!isLoading}
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            editable={!isLoading}
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price: (&#8377;)</Text>
          <TextInput
            editable={!isLoading}
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>

        <DropdownComponent
          data={Categories}
          value={category}
          handleChange={setCategory}
          label="Category"
          isLoading={isLoading}
        />

        <DropdownComponent
          data={ClothesTypes}
          value={clotheType}
          handleChange={setClotheType}
          label="Type"
          isLoading={isLoading}
        />
        <MultiSelectComponent
          data={ClotheSizes}
          // @ts-ignore
          handleAdd={setSizes}
          value={sizes}
          label="Sizes"
          isLoading={isLoading}
        />
        <MultiSelectComponent
          data={Colors}
          // @ts-ignore
          handleAdd={setColors}
          value={colors}
          label="Colors"
          isLoading={isLoading}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View>
            {Platform.OS === "web" ? (
              images.length < 3 && (
                <label htmlFor="file">
                  Add Images
                  <input
                    id="file"
                    type="file"
                    onChange={handleSelectFile}
                    multiple={true}
                  />
                </label>
              )
            ) : (
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {images &&
                  images.map((image, index) => (
                    <View key={index}>
                      <Image
                        source={{ uri: image.uri }}
                        style={{ width: 100, height: 100 }}
                      />
                      <Pressable
                        style={{ position: "absolute", top: 0, right: 0 }}
                        onPress={() => handleRemoveImage(index)}
                      >
                        <Entypo name="cross" size={24} color="black" />
                      </Pressable>
                    </View>
                  ))}
                {images.length < 3 && (
                  <Pressable
                    onPress={handleSelectFile}
                    style={{ alignSelf: "center" }}
                  >
                    <MaterialIcons name="add-a-photo" size={44} color="black" />
                  </Pressable>
                )}
              </View>
            )}
          </View>
        </View>
        <Pressable
          style={styles.btn}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {!isLoading ? (
            <Text
              style={{
                color: "white",
                textAlign: "center",
                // fontFamily: "inter-bold",
                fontSize: 18,
              }}
            >
              Add
            </Text>
          ) : (
            <ActivityIndicator color="#ffff" size={25} />
          )}
        </Pressable>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 2,
    backgroundColor: "white",
    alignItems: "center",

    minHeight: "100%",
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 6,
    paddingVertical: 30,
    gap: 20,
    maxWidth: Platform.OS === "web" ? 600 : "100%",
    minHeight: "100%",
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    width: "100%",
    gap: 3,
  },
  label: {
    fontSize: 15,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "black",
    padding: 9,
    borderRadius: 10,
  },
  error: {
    color: "red",
    fontSize: 10,
    textAlign: "center",
  },
});
