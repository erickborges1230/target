import {Text, View, Button} from "react-native";
import {router} from "expo-router";

import {PageHeader} from "./components/PageHeader";

export default function Target() {
  return (
    <View style={{flex: 1, padding: 24}}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcaçar os seu objativos"
      />

      <Button title="Voltar para Home" onPress={() => router.back()} />
    </View>
  );
}
