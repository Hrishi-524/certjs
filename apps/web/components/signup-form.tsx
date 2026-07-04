import { cn } from "@/lib/utils"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signup } from "@/lib/api/auth"
import type { SignUpInput, SignUpResponse } from "@/types/auth.types"
import { useRouter } from "next/navigation"
import { setAccessToken } from "@/lib/auth/token-storage"
import { toast } from "sonner"
import { handleApiError } from "@/lib/errors/handle-api-errors"
import { redirectToGoogleOAuth } from "@/lib/auth/oauth"

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
    const router = useRouter()

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async  (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        if(formData.password !== formData.confirmPassword) {
            setError("Passwords dont match")
            return
        }
        
        setLoading(true);

        const { name, email, password } = formData;

        const input: SignUpInput = {
            name,
            email,
            password
        };

        try {
            const response : SignUpResponse = await signup(input);

            setAccessToken(response.accessToken)

            setLoading(false)

            toast.success("Welcome to CertJS! Your account has been created successfully.")

            router.replace("/dashboard")
        } catch (error) {
            handleApiError(error)
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                    Fill in the form below to create your account
                </p>
                </div>
                <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="bg-background"
                    value={formData.name}
                    onChange={handleChange}
                />
                </Field>
                <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="bg-background"
                    value={formData.email}
                    onChange={handleChange}
                />
                <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your email
                    with anyone else.
                </FieldDescription>
                </Field>
                <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="bg-background"
                    value={formData.password}
                    onChange={handleChange}
                />
                <FieldDescription>
                    Must be at least 8 characters long.
                </FieldDescription>
                </Field>
                <Field>
                <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    className="bg-background"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <FieldDescription>Please confirm your password.</FieldDescription>
                {error && <p className="text-sm text-red-500">{error}</p>}
                </Field>
                <Field>
                <Button type="submit" disabled={loading}>{loading ? "Please wait ..." : "Create Account"}</Button>
                </Field>
                <FieldSeparator>Or continue with</FieldSeparator>
                <Field>
                <Button onClick={redirectToGoogleOAuth} variant="outline" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                    Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
