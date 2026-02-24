import {useCallback, useState} from "react";
import {View, StatusBar, Alert} from "react-native";
import {HomeHeader} from "@/app/components/HomeHeader";
import {router, useFocusEffect} from "expo-router";

import {Target, TargetProps} from "@/app/components/Target";
import {List} from "@/app/components/List";
import {Button} from "@/app/components/Button";

import {useTargetDataBase} from "@/app/database/useTargetDatabase";
import {Loading} from "@/app/components/Loading";

import {numberToCurrency} from "@/app/utils/numberTToCurrency";

const sumary = {
  total: "R$ 2.000,00",
  input: {label: "Entradas", value: "R$ 1.000,00"},
  output: {label: "Saídas", value: "R$ 1.000,00"},
};

export default function Index() {
  const [isFetching, setFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);

  const targetDataBase = useTargetDataBase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDataBase.listBySavedValue();

      return response.map(item => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert("Erro", "Nao possivel carregar as metas.");
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();

    const [targetData] = await Promise.all([targetDataPromise]);

    setTargets(targetData);
    setFetching(false);
  }

  //Carreda os dados na tela automaticamente quando uma nova meta é criada.
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={sumary} />

      <List
        title="Metas"
        data={targets}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta. Clique na meta para criar"
        containerStyle={{paddingHorizontal: 24}}
      />
      <View style={{padding: 24, paddingBottom: 32}}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}
