import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Contagem() {

  const [contagem, setContagem] = useState(0);


  useEffect(() => {
    console.log("contagem mudou para", contagem);
  }, [contagem]);


  function aumentarContagem() {
    setContagem(contagem + 1);
  }

  function diminuirContagem() {
    setContagem(contagem - 1);
  }

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Contador" }} />


      <View style={styles.cartao}>
        <Button title="+" onPress={aumentarContagem} />

        <Text style={styles.contagem}>{contagem}</Text>

        <Button title='-' onPress={diminuirContagem} />
      </View>

      <View style={styles.rodape}>
        <Button title="VOLTAR" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  cartao: {
    backgroundColor: "#F1F3F6",
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 2,
    gap: 8,
  },

  contagem: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2354D6",
  },

  rodape: {
    marginTop: "auto",
    marginBottom: 16,
  },
});