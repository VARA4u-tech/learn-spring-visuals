import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ code, language, title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightSyntax = (code: string, language: string) => {
    // Simple syntax highlighting for demo purposes
    if (language === 'java') {
      return code
        .replace(/(@\w+|public|private|class|return|new|void|String|int|if|else)/g, '<span class="text-syntax-keyword font-semibold">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="text-syntax-string">"$1"</span>')
        .replace(/\/\/.*$/gm, '<span class="text-syntax-comment italic">$&</span>')
        .replace(/\b\d+\b/g, '<span class="text-syntax-number">$&</span>');
    }
    if (language === 'javascript' || language === 'typescript') {
      return code
        .replace(/(const|let|var|function|return|if|else|import|export|from|async|await)/g, '<span class="text-syntax-keyword font-semibold">$1</span>')
        .replace(/'([^']*)'/g, '<span class="text-syntax-string">\'$1\'</span>')
        .replace(/"([^"]*)"/g, '<span class="text-syntax-string">"$1"</span>')
        .replace(/\/\/.*$/gm, '<span class="text-syntax-comment italic">$&</span>')
        .replace(/\b\d+\b/g, '<span class="text-syntax-number">$&</span>');
    }
    return code;
  };

  return (
    <div className={cn("bg-code border border-code rounded-lg overflow-hidden", className)}>
      {title && (
        <div className="px-4 py-2 border-b border-code bg-secondary/50 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: highlightSyntax(code, language)
          }}
        />
      </pre>
    </div>
  );
}