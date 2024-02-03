import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ListPokemon } from "../model/ResponseListPokemon";

export type AppStackParamList = {
  bottom: { screen: string } | undefined;
  home: undefined;
  ["detailPokemon"]: {
    pokemon: ListPokemon;
  };
};

export type HomeScreenProps = NativeStackScreenProps<AppStackParamList, "home">;

export type NoParamNavigationProps = HomeScreenProps["navigation"];

export type DetailPokemonProps = NativeStackScreenProps<
  AppStackParamList,
  "detailPokemon"
>;
