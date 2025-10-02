"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailCaptureCopy } from "@/lib/copy";
import { sectionPadding } from "@/lib/design-tokens";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function EmailCapture() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      toast({
        title: "Subscribed",
        description: "Welcome to the liquidity briefing. You’ll hear from us soon.",
      });
      reset();
    } else {
      toast({
        title: "Something went wrong",
        description: "Try again or ping hello@marketmaker.com.",
      });
    }
  };

  return (
    <section className={`${sectionPadding.base}`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 rounded-3xl border border-border/70 bg-card/80 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-3">
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">{emailCaptureCopy.headline}</h2>
          <p className="text-lg text-muted-foreground">{emailCaptureCopy.description}</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          noValidate
        >
          <div className="flex-1">
            <Input
              type="email"
              autoComplete="email"
              placeholder={emailCaptureCopy.placeholder}
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email ? (
              <p className="mt-2 text-sm text-danger" role="alert">
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <Button type="submit" disabled={isSubmitting} className="shrink-0">
            {isSubmitting ? "Joining…" : emailCaptureCopy.button}
          </Button>
        </form>
      </div>
    </section>
  );
}
