import { View, SafeAreaView, StatusBar } from "react-native";

const AppStatusbar = () => {
  return (
    <View className={`transparent`}>
      <SafeAreaView>
        <StatusBar backgroundColor="transparent" barStyle={"dark-content"} />
      </SafeAreaView>
    </View>
  );
};

export default AppStatusbar;
