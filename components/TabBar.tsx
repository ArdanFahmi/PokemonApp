import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { navigate } from "../RootNavigation";
import icHome from "../assets/icon/icHome.png";
import icCompare from "../assets/icon/icCompare.png";
import icCompareOn from "../assets/icon/icCompareOn.png";
import icHomeOn from "../assets/icon/icHomeOn.png";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View className="flex flex-row h-16 lg:h-24 bg-white">
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            className="bg-wite flex-1 justify-center items-center"
          >
            <TouchableOpacity onPress={onPress}>
              <View className="items-center">
                <Image
                  className="w-7 h-7 lg:w-12 lg:h-12"
                  source={
                    route.name === "Home"
                      ? isFocused
                        ? icHomeOn
                        : icHome
                      : route.name === "Compare"
                      ? isFocused
                        ? icCompareOn
                        : icCompare
                      : null
                  }
                />
                <Text className="lg:text-xl">{route.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
export default TabBar;
