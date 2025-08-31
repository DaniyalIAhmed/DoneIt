import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import { useAIContext } from "@/hooks/useAIContext";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ButtonsContainer = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const addTodo = useMutation(api.todos.createTodos);
  const { generatedTodo, setGeneratedTodo } = useAIContext();

  const handleSave = () => {
    if (!generatedTodo) return;
    for (let todo of generatedTodo) {
      if (todo.selected) {
        addTodo({ text: todo.text });
      }
    }
    setGeneratedTodo(generatedTodo.filter((todo) => !todo.selected));
  };

  const handleTrash = () => {
    if (!generatedTodo) return;
    setGeneratedTodo(generatedTodo.filter((todo) => todo.selected));
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity>
        <View style={styles.todoActions}>
          <TouchableOpacity onPress={handleSave} activeOpacity={0.8}>
            <LinearGradient
              colors={colors.gradients.success}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <AntDesign name="save" size={14} color="#ffffff" />
              <Text style={{ color: "white", marginLeft: 5 }}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleTrash} activeOpacity={0.8}>
            <LinearGradient
              colors={colors.gradients.muted}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Ionicons name="trash" size={14} color="#ffffff" />
              <Text style={{ color: "white", marginLeft: 5 }}>Trash</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonsContainer;
