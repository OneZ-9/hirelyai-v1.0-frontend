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
            <CheckCheck className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
          )}
          {copied ? (
            <span className="max-sm:hidden">Link copied</span>
          ) : (
            <span className="max-sm:hidden">Share this job</span>
          )}
        </span>
      </Button>
    </CopyToClipboard>
  );
}

export default ShareButton;
