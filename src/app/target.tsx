import {useState, useEffect} from "react";
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
  const [amount, setAmount] = useState<number | null>(null);

  const params = useLocalSearchParams<{id?: string}>();
  const targetDatabase = useTargetDataBase();

  function handleSave() {
    if (!name.trim() || amount === null || amount <= 0) {
      return Alert.alert(
        "Atenção",
        "Preencha o nome e o valor precisa ser maior que zero.",
      );
    }
    setProcessing(true);

    if (params.id) {
      update();
    } else {
      create();
    }
  }

  async function update() {
    if (amount === null) return;
    try {
      await targetDatabase.update({
        id: Number(params.id),
        name,
        amount,
      });
      Alert.alert("Sucesso", "Meta atualizada com sucesso", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a meta");
      console.log(error);
    } finally {
      setProcessing(false);
    }
  }

  async function create() {
    if (amount === null) return;
    try {
      await targetDatabase.create({name, amount});
      Alert.alert("Nova Meta", "Meta criada com sucesso", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a meta");
      console.log(error);
    } finally {
      setProcessing(false);
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);
      if (!response) {
        Alert.alert("Erro", "Meta não encontrada.");
        router.back();
        return;
      }
      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta");
      console.log(error);
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id]);

  return (
    <View style={{flex: 1, padding: 24}}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcaçar os seu objativos"
      />
      <View style={{marginTop: 32, gap: 24}}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para Boa Vista, Comprar um carro"
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
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
