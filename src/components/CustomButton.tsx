import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
} from "react-native";
import CustomText from "./CustomText";

interface CustomButtonProps extends PressableProps {
  title: string;
  variant: "primary" | "danger";
}

const CustomButton = ({
  title,
  style,
  variant,
  disabled,
  ...rest
}: CustomButtonProps) => {
  const getBackgroundColorDefault = useCallback(() => {
    switch (variant) {
      case "primary":
        return styles.buttonPrimary;
      case "danger":
        return styles.buttonDanger;
    }
  }, [variant]);

  const getBackgroundColorDisabled = useCallback(() => {
    switch (variant) {
      case "primary":
        return styles.buttonPrimarayDisabled;
      case "danger":
        return styles.buttondangerDisabled;
    }
  }, [variant, disabled]);

  return (
    <Pressable
      style={[
        styles.button,
        getBackgroundColorDefault(),
        disabled ? getBackgroundColorDisabled() : {},
        style as object,
      ]}
      {...rest}
    >
      <CustomText style={styles.buttonText}>{title}</CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 10,
  },
  buttonPrimary: { backgroundColor: "#2b7fff" },
  buttonPrimarayDisabled: { backgroundColor: "#51a2ff" },
  buttonDanger: { backgroundColor: "#fb2c36" },
  buttondangerDisabled: { backgroundColor: "#ff6467" },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});

export default CustomButton;
