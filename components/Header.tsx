import { CommonActions, useNavigation } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { NoParamNavigationProps } from "../navigation/stackParamList";
import { Pressable, View, Text, Image } from "react-native";
import icLeft from "../assets/icon/icLeft.png";

type HeaderProps = {
  title?: string;
  backButton?: boolean;
};
export default function CustomHeader({
  title,
  backButton,
}: PropsWithChildren<HeaderProps>) {
  const navigation = useNavigation<NoParamNavigationProps>();
  return (
    <View>
      <View className="bg-white p-4 flex flex-row justify-between">
        <View className="flex flex-row items-center">
          {backButton ? (
            <Pressable
              onPress={() => navigation.dispatch(CommonActions.goBack())}
            >
              <Image className="w-6 h-6 lg:w-12 lg:h-12" source={icLeft} />
            </Pressable>
          ) : (
            <></>
          )}
          <Text className="font-bold text-lg mx-2 lg:text-2xl">{title}</Text>
        </View>
      </View>
      <View className="h-0.5 bg-gray-200"></View>
    </View>
  );
}
