import { getProviders } from "next-auth/react";
import { ProvidersButtons } from "./providerButtons";

export async function SignInForm() {
  const providers = await getProviders();
  return <ProvidersButtons providers={providers} />;
}
