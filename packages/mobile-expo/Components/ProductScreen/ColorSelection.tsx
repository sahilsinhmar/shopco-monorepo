import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { colorMapping } from "../../utils/constants/Colors";

interface Props {
  colors: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorSelection: React.FC<Props> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
  return (
    <View style={styles.colorContainer}>
      <Text style={styles.sectionTitle}>Colors</Text>
      <View style={styles.colorItemsContainer}>
        {colors.map((color, index) => {
          const backgroundColor = colorMapping[color];

          return (
            <Pressable
              onPress={() => onSelectColor(color)}
              key={index}
              style={[
                styles.colorButton,
                { backgroundColor },
                selectedColor === color && styles.colorButtonSelected,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colorContainer: {
    flexDirection: "column",
    gap: 4,
  },
  colorItemsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  colorButton: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    borderWidth: 0.3,
    borderColor: "transparent",
  },
  colorButtonSelected: {
    borderColor: "black",
    borderWidth: 2,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ColorSelection;
