import {View, Text, ColorValue} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import {styles} from "./styles";

export type SumaryProps = {
  label: string;
  value: string;
};

type Props = {
  data: SumaryProps;
  icon: {
    name: keyof typeof MaterialIcons.glyphMap;
    color: ColorValue;
  };
  isLeft?: boolean;
};

export function Summary({data, icon, isLeft = false}: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isLeft && {justifyContent: "flex-end"}]}>
        <MaterialIcons name={icon.name} size={24} color={icon.color} />
        <Text style={styles.label}>{data.label}</Text>
      </View>
      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
}
