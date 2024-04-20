import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const OrderListCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "100%", flexDirection: "row", padding: 5 }}>
          <LinearGradient
            colors={["#ececec", "#f5f5f5", "#ececec"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.imageSkeleton}
          />
          <LinearGradient
            colors={["#ececec", "#f5f5f5", "#ececec"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.textSkeleton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.8,
    borderColor: "gray",
    padding: 5,
    marginBottom: 10,
  },
  skeleton: {
    height: 10,
    width: 100,
    marginBottom: 5,
    borderRadius: 5,
  },
  imageSkeleton: {
    height: 100,
    width: "30%",
    borderRadius: 5,
    marginRight: 10,
  },
  textSkeleton: {
    height: "100%",
    width: "68%",
    marginBottom: 5,
    borderRadius: 5,
  },
});

export default OrderListCardSkeleton;
