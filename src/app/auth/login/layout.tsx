import { Metadata } from "next";
import { inter, geist, geistMono } from '../../fonts';

export const metadata: Metadata = {
    title: "Login - NextLearn",
    description: "Log in to your NextLearn account",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`} ${geist.variable} ${geistMono.variable}`}>
            {children}
        </div>
    );
}
