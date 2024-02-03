import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppStackParamList = {
  bottom: { screen: string } | undefined;
  home: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<AppStackParamList, "home">;

export type NoParamNavigationProps = HomeScreenProps["navigation"];
