import {View, StatusBar} from "react-native";
import {HomeHeader} from "./components/HomeHeader";
import {router} from "expo-router";

import {Target} from "@/app/components/Target";
import {List} from "./components/List";
import {Button} from "./components/Button";

const sumary = {
  total: "R$ 2.000,00",
  input: {label: "Entradas", value: "R$ 1.000,00"},
  output: {label: "Saídas", value: "R$ 1.000,00"},
};

const targets = [
  {
    id: "1",
    name: "Comprar uma cadeira gamer",
    percentage: "40%",
    current: "R$ 8000,00",
    target: "R$ 2.500,00",
  },
  {
    id: "2",
    name: "Comprar uma cadeira de jogos",
    percentage: "40%",
    current: "R$ 8000,00",
    target: "R$ 2.500,00",
  },
  {
    id: "3",
    name: "Fazer uma viagem para o para",
    percentage: "40%",
    current: "R$ 8000,00",
    target: "R$ 2.500,00",
  },
];

export default function Index() {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={sumary} />

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
