"use client";
import Button from "@/components/button";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";

export function ProvidersButtons({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) {
  return (
    <div className="flex flex-col gap-5 items-center">
      {providers &&
        Object.values(providers).map((provider) => (
          <Button
            className="w-full"
            key={provider.id}
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </Button>
        ))}
    </div>
  );
}
