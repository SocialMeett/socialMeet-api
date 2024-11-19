export const permissions = [
  {
    role: "admin",
    actions: [
      "create_circle",
      "delete_circle",
      "join_circle",
      "share_location",
      "view_location",
      "get_circle"
    ],
  },
  {
    role: "member",
    actions: ["join_circle", "share_location", "view_location"],
  },
];



