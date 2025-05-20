import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { Controller } from "react-hook-form";
import CustomText from "./CustomText";
import { signInSchema } from "../app/(auth)/sign-in";
import { signUpSchema } from "../app/(auth)/sign-up";

interface CustomTextInputProps extends TextInputProps {
  control: any;
  name: string;
}

const CustomTextInput = ({
  style,
  name,
  control,
  ...rest
}: CustomTextInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[
              styles.input,
              style,
              error ? { borderColor: "crimson" } : { borderColor: "#ccc" },
            ]}
            {...rest}
          />

          <CustomText style={styles.error}>{error && error.message}</CustomText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontFamily: "circular",
    fontSize: 16,
  },
  error: {
    color: "crimson",
    height: 20,
  },
});

export default CustomTextInput;
