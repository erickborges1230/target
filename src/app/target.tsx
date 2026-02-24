import {useState} from "react";
import {Alert, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";

import {PageHeader} from "./components/PageHeader";
import {Input} from "./components/Input";
import {CurrencyInput} from "./components/CurrencyInput";
import {Button} from "@/app/components/Button";

import {useTargetDataBase} from "@/app/database/useTargetDatabase";

export default function Target() {
  const [isProcessing, setProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<any>(0);

  const params = useLocalSearchParams<{id?: string}>();
  const targetDatabase = useTargetDataBase();

  function handleSalve() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert(
        "Atenção",
        "Prencha name e valor precisar ser maior que zero.",
      );
    }
    setProcessing(true);

    if (params.id) {
      //update
    } else {
      create();
    }
  }

  async function create() {
    try {
      await targetDatabase.create({name, amount});
      Alert.alert("Nova Meta", "Meta criada com sucesso", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não possível criar a meta");
      console.log(error);
      setProcessing(false);
    }
  }

  return (
    <View style={{flex: 1, padding: 24}}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcaçar os seu objativos"
      />
      <View style={{marginTop: 32, gap: 24}}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para para Boa Vista, Comprar"
          onChangeText={setName}
          value={name}
        />

        <CurrencyInput
          label="valor alvo (R$)"
          value={amount}
          onChangeValue={setAmount}
        />

        <Button
          title="Salvar"
          onPress={handleSalve}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
