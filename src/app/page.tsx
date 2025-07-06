import { signIn } from "@/auth";

export default function Home() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}
