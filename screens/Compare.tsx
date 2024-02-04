import { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import AppStatusbar from "../components/StatusBar";
import CustomHeader from "../components/Header";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { getListPokemon } from "../services/pokeApi";
import { ListPokemon } from "../model/ResponseListPokemon";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import icClose from "../assets/icon/icClose.png";
import CardItem from "../components/CardItem";

export default function Compare() {
  const [offset, setOffset] = useState<number>(0); //offset page
  const [pokemon, setPokemon] = useState<ListPokemon[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMoreData, setLoadingMoreData] = useState<boolean>(false);
  // const [selectedFirst, setSelectedFirst] = useState<boolean>();
  // const [selectedSecond, setSelectedSecond] = useState<boolean>();
  // ref
  const bottomModalSelectPoke = useRef<BottomSheet>(null);
  const snapPoints = ["40%", "90%"];

  const limit = 25;
  const baseImageUri =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  let numColumns = Dimensions.get("window").width >= 768 ? 3 : 2;
  const itemWidth = Dimensions.get("window").width / numColumns;

  useEffect(() => {
    fetchPokeList();
  }, [offset]);

  const fetchPokeList = async () => {
    setLoading(true);
    await getListPokemon(offset, limit)
      .then((res) => {
        if (res == null) {
          setPokemon([]);
          setHasMore(false);
        } else {
          const data: ListPokemon[] = res.results;
          data.forEach((item, idx) => {
            const name = item.name;
            const urlDetail = item.url;
            const urlParts: string[] = urlDetail!.split("/");
            const idString: string = urlParts[urlParts.length - 2];
            const id: number = parseInt(idString, 10) || 0;
            setPokemon((prev) => [
              ...prev,
              { name, url: urlDetail, imageUri: `${baseImageUri}${id}.png` },
            ]);
          });
        }
      })
      .catch((err) => {
        console.error("Failed fetch poke list", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const openSelectModal = useCallback(() => {
    bottomModalSelectPoke.current?.snapToIndex(1);
  }, []);

  const closeSelectModal = useCallback(() => {
    bottomModalSelectPoke.current?.close();
  }, []);

  const renderItem = ({ item }: { item: ListPokemon }) => (
    <>
      <View className="my-2 mx-4 lg:my-4 lg:mx-6  flex-1 justify-center">
        <CardItem onPress={() => handleSelectedPoke(item)} pokemon={item} />
      </View>
    </>
  );

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setOffset((prev) => prev + 25);
      setLoadingMoreData(true);
    }
  };

  const renderSpinner = () => {
    return <ActivityIndicator size="small" color="#FB7216" className="p-2" />;
  };

  const handleSelectedPoke = (item: ListPokemon) => {
    console.log("selected item -> ", item);
  };

  return (
    <GestureHandlerRootView>
      <View className="bg-white h-full">
        <AppStatusbar />
        <CustomHeader title="Compare Pokemon" backButton={false} />
        <View className="mx-4 my-4 flex flex-row justify-evenly">
          <Pressable
            onPress={() => {
              openSelectModal();
            }}
          >
            <View className="bg-white w-36 h-48 rounded-2xl border border-gray-300 flex items-center justify-center">
              <Text className="text-center">Select First Pokemon</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              openSelectModal();
            }}
          >
            <View className="bg-white w-36 h-48 rounded-2xl border border-gray-300 flex items-center justify-center">
              <Text className="text-center">Select Second Pokemon</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <BottomSheet
        ref={bottomModalSelectPoke}
        snapPoints={snapPoints}
        index={-1}
        backdropComponent={renderBackdrop}
      >
        <View className="px-6 flex flex-row justify-between mb-3">
          <View className="flex flex-row w-full items-center">
            <Pressable onPress={() => closeSelectModal()}>
              <Image source={icClose} className="w-6 h-6 mr-4" />
            </Pressable>
            <Text className="text-lg font-bold">Select Pokemon</Text>
          </View>
        </View>
        <View className="h-0.5 bg-gray-200"></View>
        <BottomSheetFlatList
          data={pokemon}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={true}
          initialNumToRender={25}
          numColumns={numColumns}
          ListFooterComponent={loadingMoreData ? renderSpinner : null}
          getItemLayout={(data, index) => ({
            length: itemWidth,
            offset: itemWidth * index,
            index,
          })}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
