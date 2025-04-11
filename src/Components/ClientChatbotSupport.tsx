"use client";

import dynamic from 'next/dynamic';

// Dynamically import the ChatbotSupport component with no SSR
const ChatbotSupport = dynamic(
    () => import('./ChatbotSupport'),
    { ssr: false }
);

export default function ClientChatbotSupport() {
    return <ChatbotSupport />;
}
