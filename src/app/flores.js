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

const db = SQLite.openDatabaseSync("flores.db");

db.execSync(`


  CREATE TABLE IF NOT EXISTS flores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto VARCHAR(255) NOT NULL,
    cor VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL
  );
`);

function listar() {
  return db.getAllSync("SELECT * FROM flores ORDER BY id DESC");
}

function salvar(texto, cor, tipo) {
  db.runSync(
    "INSERT INTO flores (texto, cor, tipo) VALUES (?, ?, ?)",
    [texto, cor, tipo]
  );
}

function excluir(id) {
  db.runSync("DELETE FROM flores WHERE id = ?", [id]);
}

function edita(texto, cor, tipo, id) {
  db.runSync("UPDATE flores SET texto = ?, cor = ?, tipo = ? WHERE id = ?", [
    texto,
    cor,
    tipo, 
    id,
  ]);
}

export default function ListaDb() {
  const [texto, setTexto] = useState("");
  const [cor, setCor] = useState("");
  const [tipo, setTipo] = useState("");
  const [lista, setLista] = useState([]);
  const [idEditando, setIdEditando] = useState(0);

  function carregar() {
    setLista(listar());
  }

  useEffect(() => {
    carregar();
  }, []);

  function guardarOuEditar() {
    if (idEditando === 0) {
      salvar(texto, cor, tipo);
    } else {
      edita(texto, cor, tipo, idEditando);
    }
    setTexto("");
    setCor("");
    setTipo("");
    setIdEditando(0);
    carregar();
  }

  function remover(id) {
    excluir(id);
    carregar();
  }  

  function editar(flores) {
    setIdEditando(flores.id);
    setTexto(flores.texto);
    setCor(flores.cor);
    setTipo(flores.tipo);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Floricultura" }} />

      <TextInput
        style={styles.campo}
        value={texto}
        onChangeText={setTexto}
        placeholder="Digite o melhor nome para sua flor aqui ;)"
      />

      <TextInput
        style={styles.campo}
        value={cor}
        onChangeText={setCor}
        placeholder="Indique para nós a cor predominante da sua flor."
      />

      <TextInput
        style={styles.campo}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Me diga o nome ciêntifico dela."
      />


      <Button title="Salvar" onPress={guardarOuEditar} />

      <FlatList
        style={styles.lista}
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemTexto}>
                Nome: {item.texto}
              </Text>

              <Text style={styles.itemTexto}>
                Cor: {item.cor}
              </Text>

            <Text style={styles.itemTexto}>
                Tipo: {item.tipo}
              </Text>
            </View>

            <Button
              title="Editar"
              onPress={() => {editar(item);
              }}
            />

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