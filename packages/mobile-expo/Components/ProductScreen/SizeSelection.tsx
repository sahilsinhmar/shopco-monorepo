import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

const SizeSelection: React.FC<Props> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <View style={styles.sizeContainer}>
      <Text style={styles.sectionTitle}>Sizes</Text>
      <View style={styles.sizeItemsContainer}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => onSelectSize(size)}
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.sizeButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === size && styles.sizeTextSelected,
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sizeContainer: {
    flexDirection: "column",
    gap: 4,
  },
  sizeItemsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  sizeButton: {
    backgroundColor: "white",
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "black",
  },
  sizeButtonSelected: {
    backgroundColor: "black",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  sizeTextSelected: {
    color: "white",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default SizeSelection;
