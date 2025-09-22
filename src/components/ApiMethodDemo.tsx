import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { ArrowRight, Play, Zap } from "lucide-react";

interface ApiMethodDemoProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  description: string;
  frontendCode: string;
  backendCode: string;
  explanation: string[];
  mockResponse?: any;
}

export function ApiMethodDemo({
  method,
  endpoint,
  description,
  frontendCode,
  backendCode,
  explanation,
  mockResponse
}: ApiMethodDemoProps) {
  const [showResponse, setShowResponse] = useState(false);
  const [activeTab, setActiveTab] = useState<"frontend" | "backend">("frontend");

  const methodColors = {
    GET: "bg-success/20 text-success-foreground border-success/30",
    POST: "bg-info/20 text-info-foreground border-info/30", 
    PUT: "bg-warning/20 text-warning-foreground border-warning/30",
    DELETE: "bg-destructive/20 text-destructive-foreground border-destructive/30"
  };

  const handleTryIt = () => {
    setShowResponse(true);
    setTimeout(() => setShowResponse(false), 3000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Badge className={methodColors[method]} variant="outline">
            {method}
          </Badge>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg break-all">{endpoint}</CardTitle>
            <CardDescription className="text-sm sm:text-base">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Try It Button */}
        <div className="flex justify-center">
          <Button onClick={handleTryIt} className="bg-primary-gradient hover:opacity-90 transition-opacity">
            <Play className="w-4 h-4 mr-2" />
            Try this API call
          </Button>
        </div>

        {/* Mock Response */}
        {showResponse && mockResponse && (
          <div className="bg-success/10 border border-success/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">Response received!</span>
            </div>
            <CodeBlock
              code={JSON.stringify(mockResponse, null, 2)}
              language="json"
              title="Mock Response"
            />
          </div>
        )}

        {/* Code Tabs */}
        <div>
          <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-1 mb-4">
            <Button
              variant={activeTab === "frontend" ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveTab("frontend")}
              className="w-full xs:w-auto text-xs sm:text-sm"
            >
              React Frontend
            </Button>
            <Button
              variant={activeTab === "backend" ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveTab("backend")}
              className="w-full xs:w-auto text-xs sm:text-sm"
            >
              Spring Boot Backend
            </Button>
          </div>

          <CodeBlock
            code={activeTab === "frontend" ? frontendCode : backendCode}
            language={activeTab === "frontend" ? "typescript" : "java"}
            title={activeTab === "frontend" ? "Frontend Implementation" : "Backend Implementation"}
          />
        </div>

        {/* Line by Line Explanation */}
        <div className="bg-secondary/30 rounded-lg p-3 sm:p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
            Code Explanation
          </h4>
          <ul className="space-y-2 sm:space-y-3">
            {explanation.map((line, index) => (
              <li key={index} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2 sm:gap-3">
                <span className="bg-primary/20 text-primary text-xs px-1.5 sm:px-2 py-1 rounded font-mono min-w-fit flex-shrink-0">
                  {index + 1}
                </span>
                <span className="break-words">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}