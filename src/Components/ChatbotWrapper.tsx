"use client";

import dynamic from 'next/dynamic';

// Dynamically import the ChatbotSupport with no SSR
const ClientChatbotSupport = dynamic(
    () => import('@/Components/ClientChatbotSupport'),
    { ssr: false }
);

export default function ChatbotWrapper() {
    return <ClientChatbotSupport />;
}