import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  name,
  value,
  placeholder,

  disabled,
}: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(className)} />;
}

export { Input };
