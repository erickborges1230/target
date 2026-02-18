import {View, Text, Button} from "react-native";
import {router, useLocalSearchParams} from "expo-router";

import {PageHeader} from "../components/PageHeader";
import {Progress} from "../components/Progress";

const details = {
  current: "R$ 580,00",
  target: "R$ 1.790,00",
  percentage: 50,
};

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
    </View>
  );
}
