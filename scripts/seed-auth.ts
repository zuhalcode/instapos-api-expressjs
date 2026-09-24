import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const users = [
  { email: "zuhal@gmail.com", name: "zuhal" },
  { email: "bahri@gmail.com", name: "bahri" },
  { email: "user@gmail.com", name: "user" },
  { email: "customer@gmail.com", name: "customer" },
  { email: "owner@gmail.com", name: "owner" },
  { email: "supervisor@gmail.com", name: "supervisor" },
  { email: "cashier@gmail.com", name: "cashier" },
];

async function main() {
  // Create Auth users
  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: "password123",
      email_confirm: true,
      user_metadata: {
        name: user.name,
      },
    });

    if (error) {
      throw error;
    }

    console.log(`Created: ${data.user.email}`);
  }

  // Set application roles
  const roles = [
    {
      role: "superuser",
      emails: ["zuhal@gmail.com", "bahri@gmail.com"],
    },
    {
      role: "user",
      emails: ["user@gmail.com"],
    },
    {
      role: "customer",
      emails: ["customer@gmail.com"],
    },
    {
      role: "owner",
      emails: ["owner@gmail.com"],
    },
    {
      role: "supervisor",
      emails: ["supervisor@gmail.com"],
    },
    {
      role: "cashier",
      emails: ["cashier@gmail.com"],
    },
  ];

  for (const { role, emails } of roles) {
    const { error } = await supabase
      .from("users")
      .update({ role })
      .in("email", emails);

    if (error) {
      throw error;
    }
  }

  console.log("Auth users and roles seeded successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
