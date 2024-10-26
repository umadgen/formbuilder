/* eslint-disable @typescript-eslint/no-explicit-any */
import { Path, UseFormReturn } from "react-hook-form";

export type WatchFields<T> = Path<T>[] | Path<T>;

export type RuleCondition<T> = {
  fields: WatchFields<T>;
  evaluate: (values: Partial<{ [K in keyof T]: T[K] }>) => boolean;
};

export type RuleUtils<TFieldValues extends Record<string, any>> = {
  getValues: UseFormReturn<TFieldValues>["getValues"];
  setValue: UseFormReturn<TFieldValues>["setValue"];
  watchValues: Partial<{ [K in keyof TFieldValues]: TFieldValues[K] }>;
};

export type FormRule<TFieldValues extends Record<string, any>> = {
  name?: string;
  condition: RuleCondition<TFieldValues>;
  action: (params: RuleUtils<TFieldValues>) => void;
};
