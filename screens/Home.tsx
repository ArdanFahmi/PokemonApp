import { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { ListPokemon } from "../model/ResponseListPokemon";
import CustomHeader from "../components/Header";
import { getListPokemon } from "../services/pokeApi";
import CardItem from "../components/CardItem";
import { navigate } from "../RootNavigation";
import LoadingModal from "../components/LoadingModal";
import AppStatusbar from "../components/StatusBar";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMoreData, setLoadingMoreData] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0); //offset page
  const [pokemon, setPokemon] = useState<ListPokemon[]>([]);
  const [hasMore, setHasMore] = useState(true);

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
    try {
      const res = await getListPokemon(offset, limit);
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
    } catch (error) {
      console.error("Error fetch ", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTransaction = ({ item }: { item: ListPokemon }) => (
    <>
      <View className="my-2 mx-4 lg:my-4 lg:mx-6  flex-1 justify-center">
        <CardItem
          onPress={() => navigate("detailPokemon", { pokemon: item })}
          pokemon={item}
        />
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

  return (
    <SafeAreaView className="bg-white h-full">
      <AppStatusbar />
      <LoadingModal isVisible={loading} />
      <CustomHeader title="PokeApp - Ardan Fahmi" backButton={false} />
      <FlatList
        data={pokemon}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.url}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={true}
        initialNumToRender={25}
        ListFooterComponent={loadingMoreData ? renderSpinner : null}
        numColumns={numColumns}
        getItemLayout={(data, index) => ({
          length: itemWidth,
          offset: itemWidth * index,
          index,
        })}
      />
    </SafeAreaView>
  );
}
