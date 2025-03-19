"use server";

import { signIn } from "@/auth";
import { sleep } from "@/utils/sleep";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await sleep(1);
    // console.log("🚀 ~ formData:", Object.fromEntries(formData));

    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function login(email: string, password: string) {
  try {
    await sleep(1);

    await signIn("credentials", { email, password });

    return {
      ok: true,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
