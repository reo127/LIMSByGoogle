import { LoginForm } from "@/components/Login";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
