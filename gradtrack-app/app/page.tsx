import { Sidebar } from "@/components/chat/Sidebar";
import { ChatInterface } from "@/components/chat/ChatInterface";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  );
}
