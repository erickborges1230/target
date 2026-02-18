import {StyleSheet} from "react-native";
import {colors, FontFamily} from "@/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  label: {
    color: colors.gray[500],
    fontFamily: FontFamily.medium,
    fontSize: 13,
  },
  input: {
    color: colors.black,
    fontFamily: FontFamily.regular,
    fontSize: 15,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
  },
});
