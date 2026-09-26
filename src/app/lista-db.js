import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("tarefas.db");

db.execSync(`


  CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL,
    cor TEXT
  );
`);

function listar() {
  return db.getAllSync("SELECT * FROM tarefas ORDER BY id DESC");
}

function adicionar(texto, cor) {
  db.runSync(
    "INSERT INTO tarefas (texto, cor) VALUES (?, ?)",
    [texto, cor]
  );
}

function excluir(id) {
  db.runSync("DELETE FROM tarefas WHERE id = ?", [id]);
}

export default function ListaDb() {
  const [texto, setTexto] = useState("");
  const [cor, setCor] = useState("");
  const [lista, setLista] = useState([]);

  function carregar() {
    setLista(listar());
  }

  useEffect(() => {
    carregar();
  }, []);

  function salvar() {
    adicionar(texto, cor);

    setTexto("");
    setCor("");

    carregar();
  }

  function remover(id) {
    excluir(id);
    carregar();
  }

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Tarefas no banco" }} />

      <TextInput
        style={styles.campo}
        value={texto}
        onChangeText={setTexto}
        placeholder="Digite o melhor nome para o seu Bordel aqui ;)"
      />

      <TextInput
        style={styles.campo}
        value={cor}
        onChangeText={setCor}
        placeholder="Indique para nós a cor mais instigante do seu estabelecimento"
      />

      <Button title="Adicionar" onPress={salvar} />

      <FlatList
        style={styles.lista}
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemTexto}>
                Tarefa: {item.texto}
              </Text>

              <Text style={styles.itemTexto}>
                Cor: {item.cor}
              </Text>
            </View>

            <Button
              title="Excluir"
              onPress={() => remover(item.id)}
            />
          </View>
        )}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  itemTexto: {
    fontSize: 15,
    color: "#111827",
    marginBottom: 5,
  },
});