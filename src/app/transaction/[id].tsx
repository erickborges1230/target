import {View, Text, Button} from "react-native";
import {useLocalSearchParams, router} from "expo-router";

import {PageHeader} from "@/app/components/PageHeader";

export default function Transaction() {
  const params = useLocalSearchParams<{id: string}>();

  return (
    <View style={{flex: 1, padding: 24}}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta financeira. 
        Se  esforce para guardar e evirar gastos"
      />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
