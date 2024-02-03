import { View, Text } from "react-native";
import React from "react";
import { Modal } from "react-native";

export default function LoadingModal({ isVisible }: { isVisible: boolean }) {
  return (
    <Modal animationType="fade" visible={isVisible} transparent={true}>
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="bg-white p-4 lg:p-8 rounded-xl items-center">
          <Text className="lg:text-2xl">Please Wait...</Text>
        </View>
      </View>
    </Modal>
  );
}
