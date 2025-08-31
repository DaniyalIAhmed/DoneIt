import { createSettingsStyles } from "@/assets/styles/setting.style";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Switch, Text, View } from "react-native";

const Preferences = () => {
  const [autoSync, setAutoSync] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(false);
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const styles = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.section}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <LinearGradient
            colors={
              isDarkMode ? colors.gradients.primary : colors.gradients.danger
            }
            style={styles.settingIcon}
          >
            <Ionicons
              name={isDarkMode ? "sunny" : "moon"}
              size={20}
              color="#fff"
            />
          </LinearGradient>
          <Text style={styles.settingText}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={"#fff"}
          trackColor={{ false: colors.danger, true: colors.primary }}
        />
      </View>
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.warning}
            style={styles.settingIcon}
          >
            <Ionicons name={"notifications"} size={20} color="#fff" />
          </LinearGradient>
          <Text style={styles.settingText}>{"Notifications"}</Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          thumbColor={"#fff"}
          trackColor={{ false: colors.textMuted, true: colors.warning }}
        />
      </View>
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.success}
            style={styles.settingIcon}
          >
            <Ionicons name={"sync"} size={20} color="#fff" />
          </LinearGradient>
          <Text style={styles.settingText}>{"Auto Sync"}</Text>
        </View>
        <Switch
          value={autoSync}
          onValueChange={setAutoSync}
          thumbColor={"#fff"}
          trackColor={{ false: colors.textMuted, true: colors.success }}
        />
      </View>
    </LinearGradient>
  );
};

export default Preferences;
