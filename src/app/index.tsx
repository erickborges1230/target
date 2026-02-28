import {useCallback, useState} from "react";
import {View, StatusBar, Alert} from "react-native";
import {HomeHeader, HomeHeaderProps} from "@/app/components/HomeHeader";
import {router, useFocusEffect} from "expo-router";

import {Target, TargetProps} from "@/app/components/Target";
import {List} from "@/app/components/List";
import {Button} from "@/app/components/Button";

import {useTargetDataBase} from "@/app/database/useTargetDatabase";
import {useTransactionsDatabase} from "@/app/database/useTransactionDatabase";

import {Loading} from "@/app/components/Loading";
import {numberToCurrency} from "@/app/utils/numberTToCurrency";

export default function Index() {
  const [summary, setSummary] = useState<HomeHeaderProps>();
  const [isFetching, setFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);

  const targetDataBase = useTargetDataBase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDataBase.listByClosestTarget();

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
      return []; // ✅ garante o tipo correto. Sem isso gero erro undefined
    }
  }

  async function fetchSummary(): Promise<HomeHeaderProps | undefined> {
    try {
      const response = await transactionsDatabase.summary();
      if (!response) {
        throw new Error("Resumo não encontrado");
      }
      return {
        total: numberToCurrency(response.input - response.output),
        input: {
          label: "Entradas",
          value: numberToCurrency(response.input),
        },
        output: {
          label: "Saidas",
          value: numberToCurrency(response.output),
        },
      };
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o resumo");
      console.log(error);
    }
  }

  async function fetchData() {
    try {
      setFetching(true);
      const targetDataPromise = fetchTargets();
      const dataSummaryPromise = fetchSummary();

      const [targetData, dataSummary] = await Promise.all([
        targetDataPromise,
        dataSummaryPromise,
      ]);

      setTargets(targetData);
      setSummary(dataSummary);
    } finally {
      setFetching(false);
    }
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
      {summary && <HomeHeader data={summary} />}

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
