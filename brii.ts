import fs from "fs";
import path from "path";

import {
  ColorSchemeSelect,
  CourseSelect,
  LearningPathSelect,
  LevelSelect,
} from "#/server/schema.types";

const data = [
  {
    id: crypto.randomUUID(),
    slug: "foundational-math",
    title: "Foundational Math",
    description: "Master problem solving essentials in math",
    imageUrl:
      "https://ds055uzetaobb.cloudfront.net/category-images/foundational-math-lI90N2.png",
    isEnrolled: true,
    percentComplete: 1,
    wasRecommended: false,

    levels: [
      {
        number: 1,
        courses: [
          {
            desktopOnly: false,
            id: "vOK1Omw3mOSpWhOBK",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/pre-algebra-OzcAr4.png",
            percentComplete: 100,
            retiringOn: null,
            slug: "pre-algebra",
            title: "Solving Equations",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "0BnrB37W3BSzKcxxY",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/visual_algebra_course_card-251yed.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "systems-of-equations",
            title: "Visual Algebra",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 2,
        courses: [
          {
            desktopOnly: false,
            id: "jZ5vZbVlbZTGjcbG5",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/VariablesCourseCard_960x960-75LzA9.png",
            percentComplete: 5,
            retiringOn: null,
            slug: "using-variables",
            title: "Real-World Algebra",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "ep5DpklqkpSpJID86",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/introduction-to-algebra-6aL7ww.png",
            percentComplete: 2,
            retiringOn: null,
            slug: "introduction-to-algebra",
            title: "Understanding Graphs",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 3,
        courses: [
          {
            desktopOnly: false,
            id: "xa0qa6wA6acNOCpyE",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/geometry-fundamentals-R3GX1g.png",
            percentComplete: 99,
            retiringOn: null,
            slug: "geometry-fundamentals",
            title: "Geometry",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "LdY7dLzGLduoAH6yd",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/graphing-and-modeling-R2ewSf.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "graphing-and-modeling",
            title: "Functions",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 4,
        courses: [
          {
            desktopOnly: false,
            id: "LdY7dLzGLdulesNME",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/vectors-Grpuo7.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "vectors",
            title: "Vectors and Linear Algebra",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "306p0v5zv0ukqCKnl",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/Trigonometry-gkk2Ei.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "trigonometry",
            title: "Trigonometry",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 5,
        courses: [
          {
            desktopOnly: false,
            id: "8d6kdJweJdu0vTOJQ",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/calculus-nutshell-1DhUxj.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "calculus-nutshell",
            title: "Calculus",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
    ],
    colorScheme: {
      s100: "#ECF0FF",
      s200: "#DAE2FF",
      s300: "#ABBDFF",
      s500: "#456DFF",
      s700: "#294BC6",
      __typename: "ColorScheme",
    },
    suggestedCourseSlug: "pre-algebra",
    __typename: "LearningPath",
  },
  {
    id: crypto.randomUUID(),
    slug: "science",
    title: "Science",
    description: "See the science in the world around you",
    imageUrl:
      "https://ds055uzetaobb.cloudfront.net/category-images/science-WrzOSf.png",
    isEnrolled: true,
    percentComplete: 1,
    wasRecommended: false,

    levels: [
      {
        number: 1,
        courses: [
          {
            desktopOnly: false,
            id: "mjMzjn6qnjF1wiN3J",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/puzzle-science-Te3zoj.png",
            percentComplete: 7,
            retiringOn: null,
            slug: "puzzle-science",
            title: "Scientific Thinking",
            upgraded: true,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 2,
        courses: [
          {
            desktopOnly: false,
            id: "d35Z3a4ba3IXfxE",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/physics-everyday-RwrOIH.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "physics-everyday",
            title: "Physics of the Everyday",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "QNBpNXYZXNIqH3qj",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/dynamics-bootcamp-bOTYeo.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "dynamics-bootcamp",
            title: "Classical Mechanics",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 3,
        courses: [
          {
            desktopOnly: false,
            id: "EOKxOdlqdOSAQFrq",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/Brilliant-Kurzgesagt_Logo_02_1_1-o6XxYQ.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "nutshell",
            title: "Kurzgesagt – Beyond the Nutshell",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "xa0qa6wA6acNDT7K",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/electromagnetism-AzFMTl.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "electromagnetism",
            title: "Electricity and Magnetism",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 4,
        courses: [
          {
            desktopOnly: false,
            id: "Or4OrzbWzrSKRtyq",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/Quantum_Mechanics_with_Sabine-xyAhEq.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "sabine",
            title: "Quantum Mechanics with Sabine",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "np3zpQXYQpSrqTQM",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/special-relativity-ZZpyj9.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "special-relativity",
            title: "Special Relativity",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 5,
        courses: [
          {
            desktopOnly: false,
            id: "GXKVX4Ed4XFvMTrr",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/quantum-computing-UHpCJ1.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "quantum-computing",
            title: "Quantum Computing",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
    ],
    colorScheme: {
      s100: "#FEF9E9",
      s200: "#FDF3D3",
      s300: "#FCE49D",
      s500: "#F7C325",
      s700: "#B78900",
      __typename: "ColorScheme",
    },
    suggestedCourseSlug: "puzzle-science",
    __typename: "LearningPath",
  },
  {
    id: crypto.randomUUID(),
    slug: "data-analysis",
    title: "Data Analysis",
    description: "Know your stuff in probability and data analysis",
    imageUrl:
      "https://ds055uzetaobb.cloudfront.net/category-images/data-analysis-FD1qKK.png",
    isEnrolled: true,
    percentComplete: 0,
    wasRecommended: false,

    levels: [
      {
        number: 1,
        courses: [
          {
            desktopOnly: false,
            id: "AZKkZ0YR0ZTWaTbB",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/visual-exploration-BLJTGf.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "visual-exploration",
            title: "Exploring Data Visually",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "RRErROdpORTvJTJ7",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/capstone-making-money-witih-airbnb-NDlGk9.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "capstone-making-money-witih-airbnb",
            title: "Case Study: Unlocking Rental Value on Airbnb",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 2,
        courses: [
          {
            desktopOnly: false,
            id: "D7jk7Y4bY7FloFExO",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/probability-fundamentals-9v92rY.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "probability-fundamentals",
            title: "Introduction to Probability",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "LdY7dLzGLduWvsqV",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/capstone-twitterx-viral-tracking-rt01GG.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "capstone-twitterx-viral-tracking",
            title: "Case Study: Going Viral on X",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 3,
        courses: [
          {
            desktopOnly: false,
            id: "6q6ZqM5WMqfj1U6m",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/probabilistic-prediction-cAC5U1.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "probabilistic-prediction",
            title: "Predicting with Probability",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "LdY7dLzGLduWoTEj",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/capstone-spotify-L7f7vf.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "capstone-spotify",
            title: "Case Study: Topping the Charts with Spotify",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 4,
        courses: [
          {
            desktopOnly: false,
            id: "JqbDqEVlEqfJkhXA",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/explaining-variation-LbNO6h.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "explaining-variation",
            title: "Building Regression Models",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "EOKxOdlqdOSLkuO7",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/capstone-pricing-electric-vehicles-5KzO8N.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "capstone-pricing-electric-vehicles",
            title: "Case Study: Maximizing Electric Car Value",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 5,
        courses: [
          {
            desktopOnly: false,
            id: "KYq0YRmBRYUkOiaq",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/clusteringCourseCard_960x960-MMVpvJ.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "clustering",
            title: "Clustering",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
    ],
    colorScheme: {
      s100: "#FFF4E9",
      s200: "#FFE8D3",
      s300: "#FFCC9C",
      s500: "#FF8D23",
      s700: "#CE6809",
      __typename: "ColorScheme",
    },
    suggestedCourseSlug: "clustering",
    __typename: "LearningPath",
  },
  {
    id: crypto.randomUUID(),
    slug: "computer-science",
    title: "Programming & CS",
    description: "Speak the language of computers",
    imageUrl:
      "https://ds055uzetaobb.cloudfront.net/category-images/computer-science-9mKBqy.png",
    isEnrolled: true,
    percentComplete: 10,
    wasRecommended: false,

    levels: [
      {
        number: 1,
        courses: [
          {
            desktopOnly: false,
            id: "RRErROdpORTk4T6jJ",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/Size960_by_960_1-6W4HJ6.png",
            percentComplete: 25,
            retiringOn: null,
            slug: "thinking-in-code",
            title: "Thinking in Code",
            upgraded: true,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "yRrYRXkDXRTLnTWmW",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/creative-coding-XgYZa1.png",
            percentComplete: 1,
            retiringOn: null,
            slug: "creative-coding",
            title: "Programming with Variables",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 2,
        courses: [
          {
            desktopOnly: false,
            id: "oZX3Z4Nd4ZTQaFqy8",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/programming-python-dmduOj.png",
            percentComplete: 21,
            retiringOn: null,
            slug: "programming-python",
            title: "Programming with Python",
            upgraded: true,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "d35Z3a4ba3IZyiBO",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/computer-science-algorithms-nwHk4m.png",
            percentComplete: 26,
            retiringOn: null,
            slug: "computer-science-algorithms",
            title: "Introduction to Algorithms",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 3,
        courses: [
          {
            desktopOnly: false,
            id: "jZ5vZbVlbZTXJF7v",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/python-next-steps-E549hB.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "python-next-steps",
            title: "Next Steps in Python",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "d35Z3a4ba3IqdivMQ",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/computer-science-essentials-p1VhGo.png",
            percentComplete: 13,
            retiringOn: null,
            slug: "computer-science-essentials",
            title: "Next Steps in Computer Science",
            upgraded: true,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 4,
        courses: [
          {
            desktopOnly: false,
            id: "xa0qa6wA6ackvuYj",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/Text_Analysis_in_Python-rcga5J.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "python-text-analysis",
            title: "Applied Python",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: true,
            id: "Xopao3Rn3oc0Bf0wB",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/Designing_Programs_Course_Card-Bkn4k5.png",
            percentComplete: 0,
            retiringOn: "2024-12-20",
            slug: "designing-programs",
            title: "Event-Driven Programming",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 5,
        courses: [
          {
            desktopOnly: false,
            id: "jZ5vZbVlbZTapfM",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/intro-neural-networks-MS8bJL.png",
            percentComplete: 6,
            retiringOn: null,
            slug: "intro-neural-networks",
            title: "Introduction to Neural Networks",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
    ],
    colorScheme: {
      s100: "#F5EFFF",
      s200: "#EBE0FF",
      s300: "#D3B8FF",
      s500: "#9D62FF",
      s700: "#7139CC",
      __typename: "ColorScheme",
    },
    suggestedCourseSlug: "thinking-in-code",
    __typename: "LearningPath",
  },
  {
    id: crypto.randomUUID(),
    slug: "logical-reasoning",
    title: "Logical Reasoning",
    description: "Sharpen your reasoning skills",
    imageUrl:
      "https://ds055uzetaobb.cloudfront.net/category-images/LLP__Logic_1-NvgXlb.png",
    isEnrolled: false,
    percentComplete: 9,
    wasRecommended: false,

    levels: [
      {
        number: 1,
        courses: [
          {
            desktopOnly: false,
            id: "D7jk7Y4bY7F6kcEW3",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/logic-deduction-M7p41u.png",
            percentComplete: 16,
            retiringOn: null,
            slug: "logic-deduction",
            title: "Logic",
            upgraded: true,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 2,
        courses: [
          {
            desktopOnly: false,
            id: "8d6kdJweJdu0aS3A",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/logical-languages-gR02Vh.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "logical-languages",
            title: "Logic II",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 3,
        courses: [
          {
            desktopOnly: false,
            id: "z1zd1OA3O1SV4sdQd",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/basic-math-VkbtTP.png",
            percentComplete: 4,
            retiringOn: null,
            slug: "basic-math",
            title: "Everyday Math",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 4,
        courses: [
          {
            desktopOnly: false,
            id: "pxXDxl3QlxTWQiqN4",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/math-fundamentals-VTRUJP.png",
            percentComplete: 17,
            retiringOn: null,
            slug: "math-fundamentals",
            title: "Mathematical Thinking",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
    ],
    colorScheme: {
      s100: "#ECF0FF",
      s200: "#DAE2FF",
      s300: "#ABBDFF",
      s500: "#456DFF",
      s700: "#294BC6",
      __typename: "ColorScheme",
    },
    suggestedCourseSlug: "logic-deduction",
    __typename: "LearningPath",
  },
  {
    id: crypto.randomUUID(),
    slug: "technology",
    title: "Technology",
    description: "Deepen your knowledge of how things work",
    imageUrl:
      "https://ds055uzetaobb.cloudfront.net/category-images/LLP__Technology_1-xnKgrD.png",
    isEnrolled: false,
    percentComplete: 0,
    wasRecommended: false,

    levels: [
      {
        number: 1,
        courses: [
          {
            desktopOnly: false,
            id: "RRErROdpORTvQu87",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/how-llms-work-z7ovbF.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "how-llms-work",
            title: "How LLMs Work",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 2,
        courses: [
          {
            desktopOnly: false,
            id: "Y8pb8xL4x8S1Xuv1",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/how-computers-work-MYnrqg.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "how-computers-work",
            title: "How Technology Works",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 3,
        courses: [
          {
            desktopOnly: false,
            id: "D7jk7Y4bY7FllHdy",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/search-fundamentals-uj5hA1.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "search-fundamentals",
            title: "Search Engines",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 4,
        courses: [
          {
            desktopOnly: false,
            id: "kZ8DZqmBqZTqNu6O",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/cryptocurrency-ksKqSq.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "cryptocurrency",
            title: "Cryptocurrency",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 5,
        courses: [
          {
            desktopOnly: false,
            id: "GXKVX4Ed4XFvMTrr",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/quantum-computing-UHpCJ1.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "quantum-computing",
            title: "Quantum Computing",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: true,
            id: "Xopao3Rn3oc0Bf0wB",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/Designing_Programs_Course_Card-Bkn4k5.png",
            percentComplete: 0,
            retiringOn: "2024-12-20",
            slug: "designing-programs",
            title: "Event-Driven Programming",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
    ],
    colorScheme: {
      s100: "#F5EFFF",
      s200: "#EBE0FF",
      s300: "#D3B8FF",
      s500: "#9D62FF",
      s700: "#7139CC",
      __typename: "ColorScheme",
    },
    suggestedCourseSlug: "how-llms-work",
    __typename: "LearningPath",
  },
  {
    id: crypto.randomUUID(),
    slug: "advanced-math",
    title: "Advanced Math",
    description: "Dive into key ideas in calculus, linear algebra, and beyond",
    imageUrl:
      "https://ds055uzetaobb.cloudfront.net/category-images/advanced-math-jZJZQD.png",
    isEnrolled: false,
    percentComplete: 0,
    wasRecommended: false,

    levels: [
      {
        number: 1,
        courses: [
          {
            desktopOnly: false,
            id: "8d6kdJweJdu0vTOJQ",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/calculus-nutshell-1DhUxj.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "calculus-nutshell",
            title: "Calculus",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 2,
        courses: [
          {
            desktopOnly: false,
            id: "LdY7dLzGLdulesNME",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/vectors-Grpuo7.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "vectors",
            title: "Vectors and Linear Algebra",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 3,
        courses: [
          {
            desktopOnly: false,
            id: "xa0qa6wA6acbs7B",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/group-theory-FRXERp.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "group-theory",
            title: "Group Theory",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
    ],
    colorScheme: {
      s100: "#ECF0FF",
      s200: "#DAE2FF",
      s300: "#ABBDFF",
      s500: "#456DFF",
      s700: "#294BC6",
      __typename: "ColorScheme",
    },
    suggestedCourseSlug: "calculus-nutshell",
    __typename: "LearningPath",
  },
  {
    id: crypto.randomUUID(),
    slug: "mind-bending-math",
    title: "Mind-Bending Math",
    description: "Stretch your mind to infinity",
    imageUrl:
      "https://ds055uzetaobb.cloudfront.net/category-images/LLP__Mind-bending_math_1-SoMhRX.png",
    isEnrolled: false,
    percentComplete: 2,
    wasRecommended: false,

    levels: [
      {
        number: 1,
        courses: [
          {
            desktopOnly: false,
            id: "pxXDxl3QlxTWQiqN4",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/math-fundamentals-VTRUJP.png",
            percentComplete: 17,
            retiringOn: null,
            slug: "math-fundamentals",
            title: "Mathematical Thinking",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 2,
        courses: [
          {
            desktopOnly: false,
            id: "EOKxOdlqdOSVRUW4",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/infinity-CnRf3x.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "infinity",
            title: "Infinity",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "1RVZRxpXxRT7qtOE",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/math-history-GhpXZA.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "math-history",
            title: "Math History",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 3,
        courses: [
          {
            desktopOnly: false,
            id: "oZX3Z4Nd4ZTQOSqd3",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/basic-2d-geometry-gYZzuQ.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "basic-2d-geometry",
            title: "Geometric Thinking",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 4,
        courses: [
          {
            desktopOnly: false,
            id: "Y8pb8xL4x8SdvCOW",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/knowledge-and-uncertainty-LErS9z.png",
            percentComplete: 1,
            retiringOn: null,
            slug: "knowledge-and-uncertainty",
            title: "Bayesian Probability",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "kZ8DZqmBqZTqnTed8",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/casino-UkzVaI.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "casino-games",
            title: "Casino Probability",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 5,
        courses: [
          {
            desktopOnly: false,
            id: "0BnrB37W3BSq1SQ5a",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/basic-number-theory-zlit1P.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "basic-number-theory",
            title: "Number Theory",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
    ],
    colorScheme: {
      s100: "#ECF0FF",
      s200: "#DAE2FF",
      s300: "#ABBDFF",
      s500: "#456DFF",
      s700: "#294BC6",
      __typename: "ColorScheme",
    },
    suggestedCourseSlug: "math-fundamentals",
    __typename: "LearningPath",
  },
  {
    id: crypto.randomUUID(),
    slug: "puzzles",
    title: "Puzzles",
    description: "Put your problem solving skills to the test",
    imageUrl:
      "https://ds055uzetaobb.cloudfront.net/category-images/LLP__Puzzles_1-9nNewq.png",
    isEnrolled: false,
    percentComplete: 0,
    wasRecommended: false,

    levels: [
      {
        number: 1,
        courses: [
          {
            desktopOnly: false,
            id: "1RVZRxpXxRTYlT1Zo",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/100_Puzzles-adq1kX.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "puzzles-100",
            title: "100 Days of Puzzles",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 2,
        courses: [
          {
            desktopOnly: false,
            id: "7Y6ZYK5WKYUldioY",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/strategic-puzzles-long-set-0NgdQ0.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "strategic-puzzles-long-set",
            title: "Strategy Puzzles",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 3,
        courses: [
          {
            desktopOnly: false,
            id: "JqbDqEVlEqfmNuDO",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/foundation-puzzles-long-set-Ew8Zyz.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "foundation-puzzles-long-set",
            title: "Mathematics Puzzles",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "qn5znBw4BnFNDiExn",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/science-puzzles-long-set-qYZNE6.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "science-puzzles-long-set",
            title: "Science Puzzles",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 4,
        courses: [
          {
            desktopOnly: false,
            id: "awrEwpY6pwsOyFYr",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/advanced-math-puzzles-long-set-uMum8R.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "advanced-math-puzzles-long-set",
            title: "Advanced Math Puzzles",
            upgraded: false,
            __typename: "Course",
          },
          {
            desktopOnly: false,
            id: "d35Z3a4ba3I3Ri5Gq",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/advanced-science-long-set-tkpOtZ.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "advanced-science-long-set",
            title: "Advanced Science Puzzles",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
      {
        number: 5,
        courses: [
          {
            desktopOnly: false,
            id: "AZKkZ0YR0ZTk0tLld",
            imageUrl:
              "https://ds055uzetaobb.cloudfront.net/brioche/chapter/math-competition-fundamentals-RwT0fZ.png",
            percentComplete: 0,
            retiringOn: null,
            slug: "math-competition-fundamentals",
            title: "Contest Math",
            upgraded: false,
            __typename: "Course",
          },
        ],
        __typename: "LearningPathLevel",
      },
    ],
    colorScheme: {
      s100: "#ECF0FF",
      s200: "#DAE2FF",
      s300: "#ABBDFF",
      s500: "#456DFF",
      s700: "#294BC6",
      __typename: "ColorScheme",
    },
    suggestedCourseSlug: "puzzles-100",
    __typename: "LearningPath",
  },
];

const mod = data.map((path) => {
  return {
    id: path.id,
    slug: path.slug,
    title: path.title,
    description: path.description,
    colorScheme: { s300: path.colorScheme.s300, s500: path.colorScheme.s500 },
    percentComplete: path.percentComplete,
    imageUrl: path.imageUrl,
    suggestedCourseSlug: path.suggestedCourseSlug,
    isEnrolled: path.isEnrolled,
    wasRecommended: path.wasRecommended,
    levels: path.levels.map((level) => {
      return {
        number: level.number,
        courses: level.courses.map((course) => {
          return {
            id: course.id,
            imageUrl: course.imageUrl,
            percentComplete: course.percentComplete,
            slug: course.slug,
            title: course.title,
            isUpdated: course.upgraded,
          } as unknown as typeof course;
        }),
      } as typeof level;
    }),
  };
});

const learningPaths: LearningPathSelect[] = data.map((path) => ({
  id: path.id,
  slug: path.slug,
  title: path.title,
  description: path.description,
  imageUrl: path.imageUrl,
  isEnrolled: path.isEnrolled,
  percentComplete: path.percentComplete,
  wasRecommended: path.wasRecommended,
  suggestedCourseSlug: path.suggestedCourseSlug,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const levels: LevelSelect[] = data.flatMap((path) =>
  path.levels.map((level) => ({
    id: crypto.randomUUID(),
    pathId: learningPaths.find((p) => p.slug === path.slug)?.id ?? "NOT_FOUND",
    number: level.number,
  }))
);

const courses: CourseSelect[] = data.flatMap((path) =>
  path.levels.flatMap((level) =>
    level.courses.map((course) => ({
      id: course.id,
      levelId: levels.find((l) => l.number === level.number)?.id ?? "NOT_FOUND",
      title: course.title,
      slug: course.slug,
      imageUrl: course.imageUrl,
      percentComplete: course.percentComplete,
      isUpdated: course.upgraded,
      desktopOnly: course.desktopOnly,
      retiringOn: null,
      pathId:
        learningPaths.find((p) => p.slug === path.slug)?.id ?? "NOT_FOUND",
    }))
  )
);

const colorSchemes: ColorSchemeSelect[] = data.map((path) => ({
  id: crypto.randomUUID(),
  pathId: learningPaths.find((p) => p.slug === path.slug)?.id ?? "NOT_FOUND",
  s300: path.colorScheme.s300,
  s500: path.colorScheme.s500,
  s100: `${path.colorScheme.s500}44`,
  s200: `${path.colorScheme.s500}88`,
  s700: `${path.colorScheme.s500}CC`,
}));

const seedData = {
  learningPaths,
  levels,
  courses,
  colorSchemes,
};

// Helper function to format value for SQL
const formatSqlValue = (value: any): string => {
  if (value === null) return "NULL";
  if (typeof value === "string") return `'${value.replace(/'/g, "''")}'`;
  if (value instanceof Date) return `'${value.toISOString()}'`;
  return value.toString();
};

// Generate INSERT statements for each table
const generateSqlInserts = (seedData: any) => {
  let sqlStatements = [];

  // Learning Paths

  sqlStatements.push(
    `-- Learning Paths\n` +
      seedData.learningPaths
        .map((path) => {
          const columns = Object.keys(path).join(", ");
          const values = Object.values(path).map(formatSqlValue).join(", ");
          return `INSERT INTO morse_learning_paths (morse_${columns}) VALUES (${values});`;
        })
        .join("\n")
  );

  // Levels
  sqlStatements.push(
    `\n-- Levels\n` +
      seedData.levels
        .map((level) => {
          const columns = Object.keys(level).join(", ");
          const values = Object.values(level).map(formatSqlValue).join(", ");
          return `INSERT INTO morse_levels (morse_${columns}) VALUES (${values});`;
        })
        .join("\n")
  );

  // Courses
  sqlStatements.push(
    `\n-- Courses\n` +
      seedData.courses
        .map((course) => {
          const columns = Object.keys(course).join(", ");
          const values = Object.values(course).map(formatSqlValue).join(", ");
          return `INSERT INTO morse_courses (morse_${columns}) VALUES (${values});`;
        })
        .join("\n")
  );

  // Color Schemes
  sqlStatements.push(
    `\n-- Color Schemes\n` +
      seedData.colorSchemes
        .map((scheme) => {
          const columns = Object.keys(scheme).join(", ");
          const values = Object.values(scheme).map(formatSqlValue).join(", ");
          return `INSERT INTO morse_color_schemes (morse_${columns}) VALUES (${values});`;
        })
        .join("\n")
  );

  return sqlStatements.join("\n");
};

// Replace the existing code with:
const sqlInserts = generateSqlInserts(seedData);
fs.writeFileSync("brilliant-paths.sql", sqlInserts);
