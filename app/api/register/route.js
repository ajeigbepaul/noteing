import { connectToDB } from "../../../utils/database";
import User from "../../../models/user";
export const POST = async (req, res) => {
  const { username, email, password } = await req.json();

  try {
    connectToDB();
    const user = new User({
      username: username,
      email: email,
      password: password,
    });
    await user.save();
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new user", { status: 500 });
  }
};
