import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import CustomText from "../../components/CustomText";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";

const HomeScreen = () => {
  const { signOut, user } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.dismissAll();
      router.back();
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <CustomText style={{ fontSize: 20 }}>HomeScreen</CustomText>
      <CustomText style={{ fontSize: 16 }}>
        User : {user?.emailAddresses[0].emailAddress}
      </CustomText>
      <CustomButton title="Sign out" variant="danger" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
