import {StyleSheet} from "react-native";

import {colors} from "@/theme/colors";
import {FontFamily} from "@/theme";

export const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    color: colors.white,
    fontFamily: FontFamily.regular,
  },
  value: {
    fontSize: 18,
    color: colors.white,
    fontFamily: FontFamily.regular,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
