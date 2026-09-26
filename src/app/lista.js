import { Stack } from "expo-router";
import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Lista() {
  const [texto, setTexto] = useState("");
  const [lista, setLista] = useState([]);

  function adicionar() {
    setLista([...lista, texto]);
    setTexto("");
  }

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      
      

      <TextInput
        style={styles.campo}
        value={texto}
        onChangeText={setTexto}
      />
      
      <Button title="Adicionar" onPress={adicionar} />

      <FlatList
        style={styles.lista}
        data={lista}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
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

  campo: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 16,
  },

  lista: {
    flex: 1,
    marginTop: 16,
  },

  item: {
    backgroundColor: "#2c3038",
    padding: 16,
    marginBottom: 8,
    fontSize: 15,
    color: "#f5f5f5",
  },
});
