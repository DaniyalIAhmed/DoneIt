import { createHomeStyles } from "@/assets/styles/home.style";
import { createSettingsStyles } from "@/assets/styles/setting.style";
import ButtonsContainer from "@/components/ButtonsContainer";
import EmptyState from "@/components/EmptyState";
import QueryInput from "@/components/QueryInput";
import { useAIContext } from "@/hooks/useAIContext";
import useTheme from "@/hooks/useTheme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AI = () => {
  const { colors } = useTheme();
  const settingStyle = createSettingsStyles(colors);
  const styles = createHomeStyles(colors);
  const { generatedTodo } = useAIContext();

  const todoItem = ({
    item: todo,
  }: ListRenderItemInfo<{ text: string; selected: boolean }>) => {
    console.log(generatedTodo);
    return (
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
            onPress={() => {todo.selected = !todo.selected}}
          >
            <LinearGradient
              colors={
                todo.selected
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                styles.checkboxInner,
                { borderColor: todo.selected ? "transparent" : colors.border },
              ]}
            >
              {todo.selected && (
                <Ionicons name="checkmark" size={18} color="#ffffff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.todoTextContainer}>
            <Text
              style={[
                styles.todoText,
              ]}
            >
              {todo.text}
            </Text>
            {/* <View style={[styles.todoActions, {marginTop: 16}]}>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={styles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={styles.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            </View> */}
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingStyle.container}
    >
      <SafeAreaView style={settingStyle.safeArea}>
        <View style={settingStyle.header}>
          <View style={settingStyle.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingStyle.iconContainer}
            >
              <MaterialIcons name="auto-awesome" size={28} color="#fff" />
            </LinearGradient>
            <Text style={settingStyle.title}>Ask AI</Text>
          </View>
        </View>
        <QueryInput />
        <ButtonsContainer />
        <FlatList
          data={generatedTodo}
          renderItem={todoItem}
          keyExtractor={() => Math.random().toString()}
          style={styles.todoList}
          contentContainerStyle={styles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AI;
