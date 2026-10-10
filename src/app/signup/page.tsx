import { AuthPanel } from "@/components/auth-panel"

type SignupPageProps = {
  searchParams: Promise<{ error?: string }>
}

const authErrorMessages: Record<string, string> = {
  AccessDenied: "Sign-in was canceled or access was denied.",
  Configuration:
    "Sign-in is not configured yet. Check the server configuration and provider settings.",
  OAuthAccountNotLinked:
    "This provider account could not be linked. Try the account you used before.",
  OAuthCallback: "The provider could not complete sign-in. Please try again.",
  OAuthSignin: "Could not start provider sign-in. Please try again.",
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { error } = await searchParams
  return (
    <AuthPanel
      mode="signup"
      initialError={error ? authErrorMessages[error] ?? authErrorMessages.OAuthCallback : ""}
    />
  )
}
