import {StyleSheet} from "react-native";
import {colors, FontFamily} from "@/theme";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  info: {
    flex: 1,
    gap: 7,
  },
  value: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: colors.black,
  },
  description: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: colors.gray[500],
  },
});
