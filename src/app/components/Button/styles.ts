import {StyleSheet} from "react-native";
import {colors, FontFamily} from "@/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue[500],
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: colors.white,
  },
});
