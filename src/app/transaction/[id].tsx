import {View, Alert} from "react-native";
import {useLocalSearchParams, router} from "expo-router";

import {Input} from "@/app/components/Input";
import {PageHeader} from "@/app/components/PageHeader";
import {CurrencyInput} from "@/app/components/CurrencyInput";
import {TransactionType} from "../components/TransactionType";
import {Button} from "@/app/components/Button";
import {useState} from "react";
import {TransactionTypes} from "@/app/utils/TransactionType";

import {useTransactionsDatabase} from "@/app/database/useTransactionDatabase";

export default function Transaction() {
  const [amount, setAmount] = useState<number | null>(0);
  const [type, selType] = useState(TransactionTypes.Input);
  const [isCreating, setIsCreating] = useState(false);
  const [observation, setObservation] = useState("");

  const params = useLocalSearchParams<{id: string}>();

  const transactionsDatabase = useTransactionsDatabase();

  async function handleCreate() {
    try {
      if (!amount || amount <= 0) {
        return Alert.alert(
          "Atenção",
          "Preencha o valor. Valor dever ser maior que zero.",
        );
      }
      setIsCreating(true);

      await transactionsDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        observation,
      });

      Alert.alert("Sucesso", "Transão salva com sucesso", [
        {
          text: "Ok",
          onPress: router.back,
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação");
      console.log(error);
      setIsCreating(false);
    }
  }

  return (
    <View style={{flex: 1, padding: 24}}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta financeira. 
        Se  esforce para guardar e evirar gastos"
      />
      <View style={{marginTop: 32, gap: 24}}>
        <TransactionType selected={type} onChange={selType} />
        <CurrencyInput
          label="Valor (R$)"
          value={amount}
          onChangeValue={setAmount}
        />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no Erick"
          onChangeText={setObservation}
        />
        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  );
}
