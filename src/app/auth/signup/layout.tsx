import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - NextLearn",
  description: "Create your NextLearn account",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
