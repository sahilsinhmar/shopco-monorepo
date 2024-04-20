import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function SkeletonProductCard() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LinearGradient
          colors={["#e0e0e0", "#f5f5f5", "#e0e0e0"]}
          style={styles.image}
        />
      </View>
      <View style={styles.infocontainer}>
        <LinearGradient
          colors={["#e0e0e0", "#f5f5f5", "#e0e0e0"]}
          style={styles.skeletonText}
        />
        <LinearGradient
          colors={["#e0e0e0", "#f5f5f5", "#e0e0e0"]}
          style={[styles.skeletonText, { width: "70%" }]}
        />
        <LinearGradient
          colors={["#e0e0e0", "#f5f5f5", "#e0e0e0"]}
          style={[styles.skeletonText, { width: "50%" }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    gap: 5,
    maxWidth: "50%",
  },
  imageContainer: {},
  image: {
    width: "100%",
    height: 300,
    borderWidth: 1,
  },
  infocontainer: {
    flexDirection: "column",
    gap: 4,
    padding: 10,
  },
  skeletonText: {
    height: 16,
    borderRadius: 8,
  },
});
