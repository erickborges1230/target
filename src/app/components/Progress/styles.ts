import {StyleSheet} from "react-native";
import {colors, FontFamily} from "@/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: colors.gray[500],
    marginBottom: 5,
  },
  status: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  valeu: {
    fontSize: 18,
    fontFamily: FontFamily.medium,
    color: colors.black,
    flex: 1,
  },
  target: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: colors.gray[500],
  },
  percentage: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: colors.blue[500],
  },
  progress: {
    marginTop: 16,
    width: "100%",
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.gray[300],
    overflow: "hidden", //Para garantir que a barra de progresso não ultrapasse os limites do contêiner
  },
  currentProgress: {
    height: 5,
    backgroundColor: colors.blue[500],
  },
});
