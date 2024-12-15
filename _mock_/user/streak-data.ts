export const userStreakData = {
  currentStreak: 5, // Current consecutive days studied
  longestStreak: 15, // Longest streak ever achieved
  lastStudied: new Date("2024-12-05T18:45:00.000Z").toISOString(), // Last time the user studied
  daysStudiedThisWeek: {
    monday: {
      day: "Monday",
      dayShort: "M",
      date: new Date("2024-12-02T18:45:00.000Z").toISOString(),
      goalHrs: 2,
      hrsStudied: 1.5,
      streakScore: 0.75,
    },
    tuesday: {
      day: "Tuesday",
      dayShort: "T",
      date: new Date("2024-12-03T18:45:00.000Z").toISOString(),
      goalHrs: 2,
      hrsStudied: 2.5, // Exceeded the goal
      streakScore: 1.25,
    },
    wednesday: {
      day: "Wednesday",
      dayShort: "W",
      date: new Date("2024-12-04T18:45:00.000Z").toISOString(),
      goalHrs: 2,
      hrsStudied: 0.5,
      streakScore: 0.25,
    },
    thursday: {
      day: "Thursday",
      dayShort: "Th",
      date: new Date("2024-12-04T18:45:00.000Z").toISOString(),
      goalHrs: 2,
      hrsStudied: 2,
      streakScore: 1,
    },
    friday: {
      day: "Friday",
      dayShort: "F",
      date: new Date("2024-12-05T18:45:00.000Z").toISOString(),
      goalHrs: 2,
      hrsStudied: 3,
      streakScore: 1.5, // Bonus for extra time spent
    },
    saturday: {
      day: "Saturday",
      dayShort: "S",
      date: new Date("2024-12-06T18:45:00.000Z").toISOString(),
      goalHrs: 2,
      hrsStudied: 0,
      streakScore: 0, // Missed the study session
    },
    sunday: {
      day: "Sunday",
      dayShort: "Su",
      date: new Date("2024-12-07T18:45:00.000Z").toISOString(),
      goalHrs: 2,
      hrsStudied: 1.8,
      streakScore: 0.9,
    },
  },
  today: {
    date: new Date().toISOString(), // Current date
    goalHrs: 2, // Today's study goal
    hrsStudied: 1.2, // Hours studied so far today
    goalLeft: 0.8, // Remaining hours to meet today's goal
    activeTopics: ["Calculus", "Electromagnetism"], // Subjects currently being studied
    motivationalQuote: "The best way to predict the future is to create it.", // Boost for motivation
  },
  weekStartsOn: "Monday",
  positionInLeaderboard: 8, // Improved ranking
  badgesAwarded: [
    "Rookie Explorer", // Starter badge
    "Newton's Apprentice", // For excelling in Physics challenges
    "Pythagoras Prodigy", // For completing geometry-related milestones
    "Einstein Enthusiast", // For scoring high on complex problem-solving
    "Curie Challenger", // Dedicated badge for perseverance
  ],
  achievements: [
    {
      name: "Quantum Leap", // A big leap in streak improvement
      description: "Achieved a 7-day streak for the first time!",
      awardedOn: new Date("2024-12-01T12:00:00.000Z").toISOString(),
    },
    {
      name: "Math Marathon",
      description: "Solved 50 complex math problems in a week.",
      awardedOn: new Date("2024-11-27T14:00:00.000Z").toISOString(),
    },
    {
      name: "Curious Chemist",
      description: "Spent 10+ hours studying Chemistry this month.",
      awardedOn: new Date("2024-11-25T09:00:00.000Z").toISOString(),
    },
  ],
};
