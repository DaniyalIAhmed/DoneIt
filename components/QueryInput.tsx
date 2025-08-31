import { createHomeStyles } from "@/assets/styles/home.style";
import { useAIContext } from "@/hooks/useAIContext";
import useTheme from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

const QueryInput = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getResponse } = useAIContext();

  const handleGenTodos = async () => {
    setIsLoading(true);
    if (prompt.trim()) {
      try {
        await getResponse(prompt.trim());
        setPrompt("");
      } catch (error) {
        Alert.alert("Error", "Could not add todo. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.inputSection}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Powered by LLaMA 3.3"
          value={prompt}
          onChangeText={setPrompt}
          onSubmitEditing={handleGenTodos}
          multiline
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleGenTodos}
          activeOpacity={0.8}
          disabled={isLoading || !prompt.trim()}
        >
          <LinearGradient
            colors={
              !prompt.trim() || isLoading
                ? colors.gradients.muted
                : colors.gradients.primary
            }
            style={[
              styles.addButton,
              !prompt.trim() && styles.addButtonDisabled,
            ]}
          >
            <AntDesign name="arrowright" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QueryInput;
