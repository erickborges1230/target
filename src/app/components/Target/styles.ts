import {StyleSheet} from "react-native";
import {colors, FontFamily} from "@/theme";

export const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  name: {
    fontSize: 14,
    color: colors.black,
    fontFamily: FontFamily.medium,
  },
  status: {
    fontSize: 11,
    color: colors.gray[500],
    fontFamily: FontFamily.regular,
  },
});
