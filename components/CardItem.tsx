import { Pressable, View, Image, Text } from "react-native";
import { ListPokemon } from "../model/ResponseListPokemon";
import { formatCapital } from "../utils/common";

type CardItemProps = {
  onPress: () => void;
  pokemon: ListPokemon;
};

const CardItem = ({ onPress, pokemon }: CardItemProps) => {
  return (
    <View className="bg-white rounded-2xl w-36 h-48 lg:w-72 lg:h-96 flex flex-col border border-gray-300 ">
      <Pressable onPress={onPress}>
        <View className="bg-white rounded-2xl w-full h-full flex flex-col">
          <View className="items-center">
            <Image
              source={{ uri: pokemon.imageUri }}
              className="aspect-square h-36 lg:h-48 items-center"
            />
          </View>
          <Text className="text-center font-bold text-lg mx-2 lg:text-2xl">
            {formatCapital(pokemon.name)}
            
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CardItem;
