import {useCallback, useState} from "react";
import {View, Alert} from "react-native";
import {router, useLocalSearchParams, useFocusEffect} from "expo-router";

import {PageHeader} from "@/app/components/PageHeader";
import {Progress} from "@/app/components/Progress";
import {Button} from "@/app/components/Button";
import {List} from "@/app/components/List";
import {Loading} from "@/app/components/Loading";
import {Transaction, TransactioProps} from "@/app/components/Transaction";

import {TransactionTypes} from "@/app/utils/TransactionType";
import {useTargetDataBase} from "../database/useTargetDatabase";
import {numberToCurrency} from "../utils/numberTToCurrency";

const transactions: TransactioProps[] = [
  {
    id: "1",
    value: "R$ 300,00",
    date: "12/12/28",
    type: TransactionTypes.Output,
  },
  {
    id: "2",
    value: "R$ 400,00",
    date: "12/12/28",
    description: "CDP de 100% no banco CP",
    type: TransactionTypes.Input,
  },
];

export default function inPregress() {
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });
  const params = useLocalSearchParams<{id: string}>();

  const targetDatabase = useTargetDataBase();

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));
      //Verificando se existe
      if (!response) {
        Alert.alert("Erro", "Meta não encontrada.");
        router.back();
        return;
      }
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert("Erro", "Não possível carregar os detalhes da meta");
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDatailsPromise = fetchDetails();

    await Promise.all([fetchDatailsPromise]);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1, padding: 24, gap: 32}}>
      <PageHeader
        title={details.name}
        rightButton={{
          icon: "edit",
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
      />
      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({item}) => <Transaction data={item} onRemove={() => {}} />}
        emptyMessage="Nenhum valor. Toque para guardar mais dinheiro"
      />
      <Button
        title="Nova transão"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
