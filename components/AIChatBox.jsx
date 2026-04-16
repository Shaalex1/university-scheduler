import { useState } from "react";
import { MessageCircle, X, Bot } from "lucide-react";

export default function AIChatBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur-md group-hover:opacity-100"></div>
          {isOpen ? (
            <X className="relative h-6 w-6" />
          ) : (
            <Bot className="relative h-6 w-6" />
          )}
        </button>
      </div>

      {/* Chat Rectangle */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Box */}
          <div className="fixed bottom-6 left-6 z-50 h-[500px] w-[380px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">AI Assistant</div>
                  <div className="text-xs opacity-90">Online</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Content Area */}
            <div className="flex h-full flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {/* Sample AI Message */}
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3">
                      <p className="text-sm text-slate-700">
                        Hello! I'm your AI assistant. How can I help you with your course scheduling today?
                      </p>
                    </div>
                  </div>

                  {/* Sample User Message */}
                  <div className="flex gap-3 justify-end">
                    <div className="rounded-2xl rounded-tr-md bg-blue-600 px-4 py-3 text-white">
                      <p className="text-sm">
                        I need help finding available classrooms.
                      </p>
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-300">
                      <span className="text-xs font-semibold text-slate-600">U</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-200 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    disabled
                  />
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md transition-shadow"
                    disabled
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500 text-center">
                  Chat functionality coming soon...
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}