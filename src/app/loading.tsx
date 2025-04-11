"use client";

import { IconLoader2 } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div className="rounded-lg bg-black/80 p-6 shadow-xl border border-blue-500/20">
        <div className="flex flex-col items-center gap-2">
          <IconLoader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="text-sm text-white/70">Loading...</p>
        </div>
      </div>
    </motion.div>
  );
}
