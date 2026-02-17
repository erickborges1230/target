import {colors, FontFamily} from "@/theme";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 324,
    paddingHorizontal: 24,
    paddingBottom: 18,
    justifyContent: "flex-end",
    gap: 24,
  },
  label: {
    fontSize: 14,
    color: colors.white,
    fontFamily: FontFamily.regular,
  },
  total: {
    fontSize: 32,
    color: colors.white,
    fontFamily: FontFamily.medium,
  },
  summary: {
    width: "100%",
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
