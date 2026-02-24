import {StyleSheet} from "react-native";
import {colors, FontFamily} from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 72,
  },
  title: {
    marginTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray[100],
    fontFamily: FontFamily.medium,
    fontSize: 18,
    color: colors.black,
  },
  empty: {
    fontSize: 13,
    color: colors.gray[500],
    fontFamily: FontFamily.regular,
    marginTop: 24,
  },
});
