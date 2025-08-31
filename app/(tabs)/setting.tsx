import { createSettingsStyles } from "@/assets/styles/setting.style";
import DangerZone from "@/components/DangerZone";
import Preferences from "@/components/Preferences";
import ProgressStats from "@/components/ProgressStats";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { colors } = useTheme();
  const styles = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={styles.iconContainer}
            >
              <Ionicons name="settings-sharp" size={28} color="#fff" />
            </LinearGradient>
            <Text style={styles.title}>Settings</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ProgressStats/>
          <Preferences/>
          <DangerZone/>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;
