import { createHomeStyles } from "@/assets/styles/home.style";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from 'expo-status-bar';

type Todo = Doc<"todos">;

function formatDate(timestamp: number): string {
  const date = new Date(timestamp); // Convert timestamp to Date object
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };

  // Format the date as 'DD-MM-YY'
  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

export default function Index() {
  const { colors } = useTheme();

  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editingText, setEditingText] = useState("");

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodos);
  const deleteTodo = useMutation(api.todos.deleteTodos);
  const updateTodo = useMutation(api.todos.updateTodos);
  const styles = createHomeStyles(colors);

  const isLoading = todos === undefined;
  if (isLoading) return <LoadingSpinner />;
  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.error("Error toggling todo:", error);
      Alert.alert("Error", "Could not toggle todo. Please try again.");
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteTodo({ id });
        },
      },
    ]);
  };

  const handleEditTodo = async (todo: Todo) => {
    setEditingText(todo.text);
    setEditingId(todo._id);
  };
  const handleSaveEdit = async () => {
    if(editingId && editingText.trim() !== "") {
      try {
        await updateTodo({ id: editingId, text: editingText.trim() });
        setEditingId(null);
        setEditingText("");
      } catch (error) {
        console.error("Error updating todo:", error);
        Alert.alert("Error", "Could not update todo. Please try again.");
      }
  }};
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const todoItem = ({ item: todo }: { item: Todo }) => (
    <View style={styles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={styles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.checkbox}
          activeOpacity={0.7}
          onPress={() => handleToggleTodo(todo._id)}
        >
          <LinearGradient
            colors={
              todo.isComplete
                ? colors.gradients.success
                : colors.gradients.muted
            }
            style={[
              styles.checkboxInner,
              { borderColor: todo.isComplete ? "transparent" : colors.border },
            ]}
          >
            {todo.isComplete && (
              <Ionicons name="checkmark" size={18} color="#ffffff" />
            )}
          </LinearGradient>
        </TouchableOpacity>
        {editingId === todo._id ? (
          <View style={styles.editContainer}>
            <TextInput
            style={styles.editInput}
            value={editingText}
            onChangeText={setEditingText}
            autoFocus
            multiline
            placeholder="Edit your todo..."
            placeholderTextColor={colors.textMuted}
            />
            <View style={styles.editButtons}>
              <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.success} style={styles.editButton}>
                  <Ionicons name="checkmark" size={16} color="#ffffff" />
                  <Text style={styles.editButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.muted} style={styles.editButton}>
                  <Ionicons name="close" size={16} color="#ffffff" />
                  <Text style={styles.editButtonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.todoTextContainer}>
            <Text
              style={[
                styles.todoText,
                todo.isComplete && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {todo.text}
            </Text>
            <Text
              style={[
                styles.todoDate,
                todo.isComplete && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {formatDate(todo._creationTime)}
            </Text>
            <View style={styles.todoActions}>
              <TouchableOpacity onPress={() => handleEditTodo(todo)} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={styles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteTodo(todo._id);
                }}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={styles.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar
        barStyle={colors.statusBarStyle}
        // hidden={true}
      />
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <TodoInput />

        <FlatList
          data={todos}
          renderItem={todoItem}
          keyExtractor={(item) => item._id}
          style={styles.todoList}
          contentContainerStyle={styles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
        {/* <StatusBar style="auto" /> */}
      </SafeAreaView>
    </LinearGradient>
  );
}
