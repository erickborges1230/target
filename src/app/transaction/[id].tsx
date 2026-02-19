import {View, Text} from "react-native";
import {useLocalSearchParams, router} from "expo-router";

import {Input} from "@/app/components/Input";
import {PageHeader} from "@/app/components/PageHeader";
import {CurrencyInput} from "@/app/components/CurrencyInput";
import {TransactionType} from "../components/TransactionType";
import {Button} from "@/app/components/Button";
import {useState} from "react";
import {TransactionTypes} from "../utils/TransactionType";

export default function Transaction() {
  const [type, selType] = useState(TransactionTypes.Input);
  const params = useLocalSearchParams<{id: string}>();

  return (
    <View style={{flex: 1, padding: 24}}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta financeira. 
        Se  esforce para guardar e evirar gastos"
      />
      <View style={{marginTop: 32, gap: 24}}>
        <TransactionType selected={type} onChange={selType} />
        <CurrencyInput label="Valor (R$)" value={0} />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no Erick"
        />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
