import {View, Button} from "react-native";

import {PageHeader} from "./components/PageHeader";
import {Input} from "./components/Input";
import {CurrencyInput} from "./components/CurrencyInput";

export default function Target() {
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
        />

        <CurrencyInput label="valor alvo" value={0} />

        <Button title="Salvar" />
      </View>
    </View>
  );
}
