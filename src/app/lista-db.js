import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";


const db = SQLite.openDatabaseSync("tarefas.db");

db.execSync(`
  CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL
  );
`);

function listar() {
  return db.getAllSync("SELECT * FROM tarefas ORDER BY id DESC");
}

function adicionar(texto) {
  db.runSync("INSERT INTO tarefas (texto) VALUES (?)", [texto]);
}

export default function ListaDb() {
  const [texto, setTexto] = useState("");
  const [lista, setLista] = useState([]);

  function carregar() {
    setLista(listar());
  }

  useEffect(() => {
    carregar();
  }, []);

  function salvar() {
    adicionar(texto);
    setTexto("");
    carregar();
  }

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Bordel" }} />

      <TextInput
        style={styles.campo}
        value={texto}
        onChangeText={setTexto}
        placeholder="Digite o melhor nome para o seu Bordel aqui ;)"
      />
      <Button title="Adicionar" onPress={salvar} />

      <FlatList
        style={styles.lista}
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Text style={styles.item}>{item.texto}</Text>}
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
    borderColor: "#D9DDE3",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 12,
  },

  lista: {
    flex: 1,
    marginTop: 16,
  },

  item: {
    backgroundColor: "#F1F3F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    fontSize: 15,
    color: "#111827",
  },
});
