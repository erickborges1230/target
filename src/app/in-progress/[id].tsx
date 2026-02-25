import {useCallback, useState} from "react";
import {View, Alert} from "react-native";
import {router, useLocalSearchParams, useFocusEffect} from "expo-router";
import dayjs from "dayjs";

import {PageHeader} from "@/app/components/PageHeader";
import {Progress} from "@/app/components/Progress";
import {Button} from "@/app/components/Button";
import {List} from "@/app/components/List";
import {Loading} from "@/app/components/Loading";
import {Transaction, TransactioProps} from "@/app/components/Transaction";

import {numberToCurrency} from "@/app/utils/numberTToCurrency";
import {TransactionTypes} from "@/app/utils/TransactionType";

import {useTargetDataBase} from "@/app/database/useTargetDatabase";
import {useTransactionsDatabase} from "@/app/database/useTransactionDatabase";

export default function inPregress() {
  const [transactions, setTransactions] = useState<TransactioProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });
  const params = useLocalSearchParams<{id: string}>();

  const targetDatabase = useTargetDataBase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargetDetails() {
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

  async function fetchTransitions() {
    try {
      const response = await transactionsDatabase.listByTargetId(
        Number(params.id),
      );
      setTransactions(
        response.map(item => ({
          id: String(item.id),
          value: numberToCurrency(item.amount),
          date: dayjs(item.created_at).format("DD/MM/YYYY [às] HH:mm:ss"),
          description: item.observation,
          type:
            item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input,
        })),
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as transações");
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDatailsPromise = fetchTargetDetails();
    const fetchTransitionsPromise = fetchTransitions();

    await Promise.all([fetchDatailsPromise, fetchTransitionsPromise]);
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
