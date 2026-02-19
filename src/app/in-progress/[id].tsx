import {View, Text} from "react-native";
import {router, useLocalSearchParams} from "expo-router";

import {PageHeader} from "@/app/components/PageHeader";
import {Progress} from "@/app/components/Progress";
import {Button} from "@/app/components/Button";
import {List} from "@/app/components/List";
import {Transaction, TransactioProps} from "@/app/components/Transaction";

import {TransactionTypes} from "@/app/utils/TransactionType";

const details = {
  current: "R$ 580,00",
  target: "R$ 1.790,00",
  percentage: 50,
};

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
  const params = useLocalSearchParams<{id: string}>();
  return (
    <View style={{flex: 1, padding: 24, gap: 32}}>
      <PageHeader
        title="Apple Watch"
        rightButton={{
          icon: "edit",
          onPress: () => {},
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
