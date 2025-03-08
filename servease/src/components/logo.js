import { Image, StyleSheet } from "react-native";

const BigLogo = () => {
  return (
    <Image
      source={require("../../assets/Servease-Logo.jpg")}
      style={styles.bigLogo}
    ></Image>
  );
};

const SmallLogo = () => {
  return (
    <Image
      source={require("../../assets/Servease-Logo.jpg")}
      style={styles.smallLogo}
    ></Image>
  );
};

const styles = StyleSheet.create({
  bigLogo: {
    width: 340,
    height: 90,
  },
  smallLogo: {
    width: 170,
    height: 100,
    left: -35,
    top: -10
  },
});

export { BigLogo, SmallLogo };
