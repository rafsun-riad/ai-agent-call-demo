"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit3, Eye, Save, Smile, Type } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Dynamic imports to avoid SSR issues
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
  loading: () => (
    <div className="text-sm text-slate-500">Loading emojis...</div>
  ),
});

// Dynamic import for Ace Editor to avoid SSR issues

const AceEditor = dynamic(
  async () => {
    const ace = await import("react-ace");
    await import("ace-builds/src-noconflict/mode-markdown");
    await import("ace-builds/src-noconflict/theme-github");
    await import("ace-builds/src-noconflict/theme-monokai");
    await import("ace-builds/src-noconflict/ext-language_tools");
    return ace.default;
  },
  {
    ssr: false,
    loading: () => (
      <div className="h-96 bg-slate-50 rounded border flex items-center justify-center">
        <div className="text-slate-500">Loading editor...</div>
      </div>
    ),
  }
);

interface SystemPromptEditorProps {
  systemPrompt: string;
  onSave?: (updatedPrompt: string) => void;
  isEditable?: boolean;
}

export default function SystemPromptEditor({
  systemPrompt,
  onSave,
  isEditable = true,
}: SystemPromptEditorProps) {
  const [editedPrompt, setEditedPrompt] = useState(systemPrompt);
  const [activeTab, setActiveTab] = useState<"preview" | "edit">("preview");
  const [hasChanges, setHasChanges] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const aceEditorRef = useRef<{ editor: unknown } | null>(null);

  // Common symbols and emojis used in AI prompts
  const commonSymbols = [
    "❌",
    "✅",
    "⚠️",
    "📝",
    "🔍",
    "💡",
    "🎯",
    "⭐",
    "🚫",
    "✨",
    "🔢",
    "📋",
    "🎭",
    "🌟",
    "🎪",
    "🎨",
    "🎵",
    "🎮",
    "🎲",
    "🎯",
    "→",
    "←",
    "↑",
    "↓",
    "⇒",
    "⇐",
    "⇑",
    "⇓",
    "↗",
    "↘",
    "•",
    "‣",
    "▶",
    "▸",
    "►",
    "▷",
    "▪",
    "▫",
    "■",
    "□",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showEmojiPicker) {
        const target = event.target as HTMLElement;
        if (!target.closest(".emoji-picker-container")) {
          setShowEmojiPicker(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    setEditedPrompt(systemPrompt);
    setHasChanges(false);
  }, [systemPrompt]);

  const handlePromptChange = (value: string) => {
    setEditedPrompt(value);
    setHasChanges(value !== systemPrompt);
  };

  const handleSave = () => {
    if (onSave && hasChanges) {
      onSave(editedPrompt);
      setHasChanges(false);
    }
  };

  const handleDiscard = () => {
    setEditedPrompt(systemPrompt);
    setHasChanges(false);
    setActiveTab("preview");
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    const emoji = emojiData.emoji;
    insertTextAtCursor(emoji);
    setShowEmojiPicker(false);
  };

  const handleSymbolClick = (symbol: string) => {
    insertTextAtCursor(symbol);
  };

  const insertTextAtCursor = (text: string) => {
    if (aceEditorRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const editor = aceEditorRef.current.editor as any;
      editor.insert(text);
      editor.focus();
    } else {
      // Fallback: append to end
      const newValue = editedPrompt + text;
      handlePromptChange(newValue);
    }
  };

  // Convert \n to actual newlines for display
  const formattedPrompt = editedPrompt.replace(/\\n/g, "\n");

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            System Prompt
          </CardTitle>
          {isEditable && hasChanges && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDiscard}
                className="text-slate-600"
              >
                Discard
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value: string) =>
            setActiveTab(value as "preview" | "edit")
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            {isEditable && (
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                Edit
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="preview" className="mt-4">
            <div className="prose prose-slate max-w-none bg-white border rounded-lg p-6 h-96 overflow-y-auto">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-medium text-slate-700 mb-2 mt-4">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-700 mb-3 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1 mb-4 text-slate-700">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-1 mb-4 text-slate-700">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-slate-700">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-slate-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-slate-700">{children}</em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono text-slate-800">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-slate-50 border rounded-lg p-4 overflow-x-auto mb-4">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-600 mb-4">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {formattedPrompt}
              </ReactMarkdown>
            </div>
          </TabsContent>

          {isEditable && (
            <TabsContent value="edit" className="mt-4">
              {/* Emoji and Symbol Toolbar */}
              <div className="mb-4 space-y-3">
                {/* Quick Symbol Buttons */}
                <div className="flex flex-wrap gap-1 p-3 bg-slate-50 border rounded-lg">
                  <span className="text-xs font-medium text-slate-600 mr-2 flex items-center">
                    <Type className="h-3 w-3 mr-1" />
                    Quick Symbols:
                  </span>
                  {commonSymbols.slice(0, 20).map((symbol, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-base hover:bg-slate-200"
                      onClick={() => handleSymbolClick(symbol)}
                      title={`Insert ${symbol}`}
                    >
                      {symbol}
                    </Button>
                  ))}

                  {/* Emoji Picker Button */}
                  <div className="relative ml-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile className="h-3 w-3 mr-1" />
                      Emojis
                    </Button>

                    {showEmojiPicker && (
                      <div className="absolute top-8 left-0 z-50 bg-white border rounded-lg shadow-lg emoji-picker-container">
                        <EmojiPicker
                          onEmojiClick={handleEmojiClick}
                          width={350}
                          height={400}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* More Symbols */}
                <div className="flex flex-wrap gap-1 p-3 bg-slate-50 border rounded-lg">
                  <span className="text-xs font-medium text-slate-600 mr-2 flex items-center">
                    More Symbols:
                  </span>
                  {commonSymbols.slice(20).map((symbol, index) => (
                    <Button
                      key={index + 20}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-base hover:bg-slate-200"
                      onClick={() => handleSymbolClick(symbol)}
                      title={`Insert ${symbol}`}
                    >
                      {symbol}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <AceEditor
                  mode="markdown"
                  theme="github"
                  value={formattedPrompt}
                  onChange={handlePromptChange}
                  onLoad={(editor) => {
                    aceEditorRef.current = { editor };
                  }}
                  width="100%"
                  height="400px"
                  fontSize={14}
                  showPrintMargin={false}
                  showGutter={true}
                  highlightActiveLine={true}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                    useWorker: false,
                    wrap: true,
                  }}
                  editorProps={{
                    $blockScrolling: true,
                  }}
                />
              </div>
            </TabsContent>
          )}
        </Tabs>

        {hasChanges && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-700">
              You have unsaved changes. Click &quot;Save Changes&quot; to apply
              them or &quot;Discard&quot; to revert.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
