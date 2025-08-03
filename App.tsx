import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Vibration,
} from "react-native";
import { StatusBar } from "expo-status-bar";

// Pomodoro Timer App
export default function App() {
  // State variables - easy to understand
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  // Timer reference to stop/start the timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer logic - runs every second when timer is active
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished!
      handleTimerComplete();
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  // Handle when timer completes
  const handleTimerComplete = () => {
    setIsRunning(false);
    Vibration.vibrate(1000); // Vibrate phone

    if (!isBreak) {
      // Work session completed
      setSessions(sessions + 1);
      setIsBreak(true);
      setTimeLeft(5 * 60); // 5 minute break
      Alert.alert(
        "Work Session Complete! 🎉",
        "Great job! Take a 5-minute break.",
        [{ text: "OK" }]
      );
    } else {
      // Break completed
      setIsBreak(false);
      setTimeLeft(25 * 60); // Back to 25 minutes
      Alert.alert("Break Complete! 💪", "Ready for your next work session?", [
        { text: "OK" },
      ]);
    }
  };

  // Start or pause the timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
    setSessions(0);
  };

  // Convert seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🍅 Pomodoro Timer</Text>
        <Text style={styles.subtitle}>
          {isBreak ? "Break Time" : "Focus Time"}
        </Text>
      </View>

      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.timerLabel}>{isBreak ? "Break" : "Work"}</Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={toggleTimer}
        >
          <Text style={styles.buttonText}>
            {isRunning ? "⏸️ Pause" : "▶️ Start"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={resetTimer}
        >
          <Text style={styles.buttonText}>🔄 Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Session Counter */}
      <View style={styles.sessionContainer}>
        <Text style={styles.sessionText}>Sessions Completed: {sessions}</Text>
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>💡 How it works:</Text>
        <Text style={styles.instructionDetail}>• Work for 25 minutes</Text>
        <Text style={styles.instructionDetail}>• Take a 5-minute break</Text>
        <Text style={styles.instructionDetail}>
          • Repeat for maximum productivity!
        </Text>
      </View>
    </SafeAreaView>
  );
}

// Styles - clean and modern design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#a8a8a8",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  timerText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#4ecdc4",
    fontFamily: "monospace",
  },
  timerLabel: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#4ecdc4",
  },
  secondaryButton: {
    backgroundColor: "#ff6b6b",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sessionContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  sessionText: {
    fontSize: 16,
    color: "#ffffff",
    backgroundColor: "#2d2d44",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  instructions: {
    backgroundColor: "#2d2d44",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4ecdc4",
    marginBottom: 10,
  },
  instructionDetail: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 5,
  },
});
