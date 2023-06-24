import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export const DiscoverScreen = ({navigation}) => {
  return (
    <>
      <View style = {{marginTop: 100}}>
        <Text>DiscoverScreen</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.pop()}>
          <Text style={styles.buttonText}>go back to map screen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Posts')}>
          <Text style={styles.buttonText}>go to posts screen</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    backgroundColor: "#000000",
  },
  buttonText: {
    // color: Colors.secondary,
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
    backgroundColor: "#ffffff"
  },
});