import { useState } from "react";
import copy from "copy-to-clipboard";

export default function CardLink({ card }) {
  const url = `${window.location.origin}/card/${card?.handle}`;

  return (
    <div className="flex items-center gap-2">
      <p className="text-gray-600" style={{ wordBreak: "break-word" }}>
        Public link:{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-gray-600 hover:underline"
        >
          {url}
        </a>
      </p>
    </div>
  );
}
