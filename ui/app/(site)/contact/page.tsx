"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactCopy } from "@/lib/copy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Enter your company"),
  message: z.string().min(10, "Share a bit more context"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
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
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.info("contact submitted", values);
    toast({
      title: "Request received",
      description: "We’ll reply within two business days.",
    });
    reset();
  };

  return (
    <div className="pb-20">
      <section className="pt-24">
        <div className="mx-auto w-full max-w-3xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            Let’s build your next liquidity advantage
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{contactCopy.intro}</p>
        </div>
      </section>
      <section className="mt-12">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border/70 bg-card/80 p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" required>
                  Full name
                </Label>
                <Input id="name" autoComplete="name" {...register("name")} />
                {errors.name ? <p className="mt-2 text-sm text-danger">{errors.name.message}</p> : null}
              </div>
              <div>
                <Label htmlFor="email" required>
                  Work email
                </Label>
                <Input id="email" type="email" autoComplete="email" {...register("email")} />
                {errors.email ? <p className="mt-2 text-sm text-danger">{errors.email.message}</p> : null}
              </div>
            </div>
            <div>
              <Label htmlFor="company" required>
                Company
              </Label>
              <Input id="company" autoComplete="organization" {...register("company")} />
              {errors.company ? <p className="mt-2 text-sm text-danger">{errors.company.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="message" required>
                What should we know?
              </Label>
              <Textarea id="message" rows={5} {...register("message")} />
              {errors.message ? <p className="mt-2 text-sm text-danger">{errors.message.message}</p> : null}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Book a strategy session"}
            </Button>
            <p className="text-sm text-muted-foreground">{contactCopy.privacy}</p>
          </form>
        </div>
      </section>
    </div>
  );
}
