
import { signIn } from "@/auth"
 
export type signInProps = {};

export function SignIn(props: signInProps) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/spells" })
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 