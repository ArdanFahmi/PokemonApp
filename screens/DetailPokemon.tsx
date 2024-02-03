import { View, ScrollView, Image, Text, Pressable } from "react-native";
import AppStatusbar from "../components/StatusBar";
import CustomHeader from "../components/Header";
import { DetailPokemonProps } from "../navigation/stackParamList";
import { formatCapital } from "../utils/common";
import { useEffect, useState } from "react";
import { getAbilities, getPokemonById } from "../services/pokeApi";
import { Ability, ResponsePokeByid } from "../model/ResponsePokeById";
import { SvgUri } from "react-native-svg";
import { BarChart } from "react-native-chart-kit";
import { ChartData } from "../model/ChartData";
import LoadingModal from "../components/LoadingModal";

const DetailPokemon = ({ route }: DetailPokemonProps) => {
  const dataParam = route.params;
  const name = dataParam.pokemon.name;
  const url = dataParam.pokemon.url;
  const urlParts: string[] = url.split("/");
  const idString: string = urlParts[urlParts.length - 2];

  const [loading, setLoading] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<ResponsePokeByid>();
  const [selectedVariant, setSelectedVariant] = useState<string>("HOME");
  const [typesName, setTypesName] = useState<string[]>([]);
  const [statData, setStatData] = useState<ChartData>();
  const [abilities, setAbilities] = useState<Ability[]>([]);

  useEffect(() => {
    fetchPokeDetail(idString);
  }, []);

  const fetchPokeDetail = async (id: string) => {
    setLoading(true);
    await getPokemonById(id)
      .then((res) => {
        const typeNames = res.types.map(
          (type) => type.type.name.charAt(0) + type.type.name.slice(1)
        );
        setTypesName(typeNames);
        setPokemon(res);
        const stats = res.stats;
        const abilities = res.abilities;
        const newData: ChartData = {
          labels: [],
          datasets: [
            {
              data: [],
            },
          ],
        };
        if (stats.length > 0) {
          stats.forEach((item) => {
            const name = item.stat.name;
            const valueStat = item.base_stat;

            newData.labels.push(name);
            newData.datasets[0].data.push(valueStat);
          });
        }
        setStatData(newData);
        if (abilities.length > 0) {
          abilities.forEach((item) => {
            const url = item.ability.url;
            const urlParts: string[] = url.split("/");
            const idString: string = urlParts[urlParts.length - 2];

            fetchAbilities(idString).then((txtDesc) => {
              if (txtDesc !== "") {
                setAbilities((prev) => [
                  ...prev,
                  {
                    ability: {
                      name: item.ability.name,
                      url: url,
                    },
                    is_hidden: item.is_hidden,
                    slot: item.slot,
                    short_description: txtDesc,
                  },
                ]);
              }
            });
          });
        }
      })
      .catch((err) => {
        console.error("Error fetch ", err);
      })
      .finally(() => setLoading(false));
  };

  const fetchAbilities = async (id: string) => {
    var rspDescText: string = "";
    await getAbilities(id)
      .then((res) => {
        if (res.flavor_text_entries.length > 0) {
          rspDescText = res.flavor_text_entries[0].flavor_text;
        }
      })
      .catch((err) => {
        rspDescText = "";
        console.error("Error fetch abilities ", err);
      })
      .finally(() => {
        setLoading(false);
      });
    return rspDescText;
  };

  const handleSelectedVariant = (varId: string) => {
    setSelectedVariant(varId);
  };

  return (
    <View className="bg-white h-full">
      <AppStatusbar />
      <LoadingModal isVisible={loading} />
      <CustomHeader title="Detail Pokemon" backButton={true} />
      <ScrollView>
        <View className="items-center">
          {selectedVariant == "HOME" ? (
            <Image
              source={{ uri: pokemon?.sprites.other.home.front_default }}
              className="aspect-square h-44 lg:h-48"
            />
          ) : (
            <SvgUri
              width="160"
              height="160"
              uri={pokemon!.sprites.other.dream_world.front_default}
            />
          )}
          <Text className="text-center font-bold text-lg mx-2 mt-2 lg:text-2xl">
            {formatCapital(name)}
          </Text>
        </View>
        <View className="flex-row items-center justify-center my-2">
          <Pressable
            onPress={() => {
              handleSelectedVariant("HOME");
            }}
          >
            <Text
              className={`border rounded-xl px-2 py-1 mx-2 ${
                selectedVariant == "HOME"
                  ? "border-[#FB7216] bg-[#fec6a1]"
                  : "border-[#BDBDBD]"
              } `}
            >
              Original
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleSelectedVariant("DREAM_WORLD");
            }}
          >
            <Text
              className={`border rounded-xl px-2 py-1 mx-2 ${
                selectedVariant == "DREAM_WORLD"
                  ? "border-[#FB7216] bg-[#fec6a1]"
                  : "border-[#BDBDBD]"
              } `}
            >
              Dream World
            </Text>
          </Pressable>
        </View>
        <View className="mx-4 rounded-2xl border border-gray-300">
          <Text className="font-bold text-xl mx-4">About</Text>
          <View className="mx-4 flex flex-row">
            <Text className="text-base">Species : </Text>
            <Text className="text-base">{pokemon?.species.name}</Text>
          </View>
          <View className=" mx-4 flex flex-row">
            <Text className="text-base">Weight : </Text>
            <Text className="text-base">{pokemon?.weight}</Text>
          </View>
          <View className=" mx-4 flex flex-row">
            <Text className="text-base">Height : </Text>
            <Text className="text-base">{pokemon?.height}</Text>
          </View>
          <View className="mb-1 mx-4 flex flex-row">
            <Text className="text-base">Types : </Text>
            <Text className="text-base">{typesName.join(", ")}</Text>
          </View>
        </View>
        <View className="mx-4 my-2 items-center">
          {statData ? (
            // my suggestion is better to use progress bar
            <BarChart
              data={statData}
              yAxisLabel=""
              yAxisSuffix=""
              width={320}
              height={200}
              chartConfig={{
                backgroundGradientFrom: "#1E2923",
                backgroundGradientTo: "#08130D",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
          ) : (
            <></>
          )}
        </View>
        <View className="mx-4 rounded-2xl border border-gray-300">
          <Text className="font-bold text-xl mx-4">Abilities</Text>
          <View className="mx-4">
            {abilities !== null ? (
              abilities?.map((item, idx) => {
                return (
                  <View key={idx}>
                    <Text className="text-base">• {item.ability.name}</Text>
                    <Text className="text-base">
                      {"  "}
                      {item.short_description}
                    </Text>
                  </View>
                );
              })
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default DetailPokemon;
