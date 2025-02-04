import { View } from "react-native";
import React from "react";
import useTheme from "#/hooks/useTheme";
import { userStreakData } from "#/_mock_/user/streak-data";
import Text from "./text";

const UserStreak = () => {
  const { colors, theme } = useTheme();
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 16, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text variant="h1" weight="bold">
          For you
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            borderWidth: 1.618,
            borderBottomWidth: 4.618,
            borderColor: theme === "dark" ? "#333" : "#eee",
            borderRadius: 100,
            paddingHorizontal: 20,
            paddingVertical: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              backgroundColor: theme === "dark" ? "#333" : "#eee",
              borderRadius: 10,
              width: 16,
              height: 30,
              overflow: "hidden",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: colors.primary,
                height: 10,
                width: "100%",
              }}
            />
          </View>
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 16 }}>
          Complete a bundle to start a streak
        </Text>
      </View>
      <View
        style={{
          marginTop: 16,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {Object.values(userStreakData.daysStudiedThisWeek)
          .slice(0, 5)
          .map((day) => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
              key={day.streakScore * day.goalHrs}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme === "dark" ? "#333" : "#eee",
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                <StreakIcon day={day} />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  color:
                    new Date(day.date).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                      ? "#000"
                      : "#9CA3AF",
                  fontWeight:
                    new Date(day.date).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                      ? "600"
                      : "400",
                }}
              >
                {day.dayShort}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default UserStreak;

const StreakIcon = ({
  day,
}: {
  day: (typeof userStreakData.daysStudiedThisWeek)[keyof typeof userStreakData.daysStudiedThisWeek];
}) => {
  const { colors, theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "column",
        gap: 4,
        backgroundColor: theme === "dark" ? "#333" : "#eee",
        borderRadius: 10,
        width: 16,
        height: 30,
        overflow: "hidden",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          opacity: (day.streakScore / day.goalHrs) * 30,
          width: "100%",
        }}
      />
    </View>
  );
};
