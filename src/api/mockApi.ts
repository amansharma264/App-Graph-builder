import type { AppItem } from "@/types/app";

export const getApps = async (): Promise<AppItem[]> => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  return [
    {
      id: "1",
      name: "supertokens-golang",
    },
    {
      id: "2",
      name: "supertokens-java",
    },
    {
      id: "3",
      name: "supertokens-python",
    },
    {
      id: "4",
      name: "supertokens-ruby",
    },
  ];
};

export const getGraph = async (
  appId: string
) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  if (Math.random() < 0.2) {
    throw new Error(
      "failed to load Graph"
    );
  }

  return {
    nodes: [
      {
        id: "app",
        type: "custom",
        position: {
          x: 100,
          y: 150,
        },

        data: {
          label: "Application",
          status: "healthy",
          cpu: 50,
          memory: 70,

          category: "Frontend",
          icon: "⚙️",
        },
      },

      {
        id: "postgres",
        type: "custom",
        position: {
          x: 500,
          y: 50,
        },

        data: {
          label: "PostgreSQL",
          status: "healthy",
          cpu: 45,
          memory: 40,

          category: "Database",
          icon: "🐘",
        },
      },

      {
        id: "redis",
        type: "custom",
        position: {
          x: 500,
          y: 250,
        },

        data: {
          label: "Redis",
          status: "degraded",
          cpu: 72,
          memory: 35,

          category: "Cache",
          icon: "🔴",
        },
      },

      {
        id: "mongodb",
        type: "custom",
        position: {
          x: 900,
          y: 150,
        },

        data: {
          label: "MongoDB",
          status: "healthy",
          cpu: 30,
          memory: 45,

          category: "Database",
          icon: "🍃",
        },
      },
    ],

    edges: [
      {
        id: "e1",
        source: "app",
        target: "postgres",
      },

      {
        id: "e2",
        source: "app",
        target: "redis",
      },

      {
        id: "e3",
        source: "postgres",
        target: "mongodb",
      },
    ],
  };
};