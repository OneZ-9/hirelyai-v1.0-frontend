import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button } from "../ui/button";
import { CheckCheck, Share2 } from "lucide-react";

function ShareButton({ value, className }) {
  const [copied, setCopied] = useState(false);

  return (
    <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
      <Button variant="share" className={className}>
        <span className="flex gap-1 items-center">
          {copied ? (
            <CheckCheck className="w-4 h-4" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
          {copied ? "Link copied" : "Share this job"}
        </span>
      </Button>
    </CopyToClipboard>
  );
}

export default ShareButton;
