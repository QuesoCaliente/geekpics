import { ProvidersButtons } from "./providerButtons";

const getProviders = async () => {
  const response = await fetch(`${process.env.API_URL}/api/auth/providers`);
  const providers = await response.json();
  return providers;
};

export async function SignInForm() {
  const providers = await getProviders();
  return <ProvidersButtons providers={providers} />;
}
