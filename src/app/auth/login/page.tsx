import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Sing in</h1>

      <LoginForm />
    </div>
  );
}
