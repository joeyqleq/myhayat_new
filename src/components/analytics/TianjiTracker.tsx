"use client";

import { useEffect } from "react";

export function TianjiTracker() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://numbers.trumpstein.me/tracker.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-website-id", "cmrhp5kpu000dlftpai7v0hzd");
    script.setAttribute("data-domains", "myhayat.app,www.myhayat.app");

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
