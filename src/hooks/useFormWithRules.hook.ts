/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormProps, UseFormReturn, useForm } from "react-hook-form";
import { useEffect } from "react";
import { FormRule } from "../types/form.type";

interface Props<TFieldValues extends Record<string, any>, TContext = any>
  extends UseFormProps<TFieldValues, TContext> {
  rules?: FormRule<TFieldValues>[];
}

export const useFormWithRules = <
  TFieldValues extends Record<string, any> = Record<string, any>,
  TContext = any,
  TTransformedValues extends Record<string, any> | undefined = undefined
>(
  props: Props<TFieldValues, TContext> = {
    rules: [],
  }
): UseFormReturn<TFieldValues, TContext, TTransformedValues> => {
  const methods = useForm<TFieldValues, TContext, TTransformedValues>(props);
  const { watch, getValues, setValue } = methods;

  useEffect(() => {
    const subscriptions = props.rules!.map((rule) => {
      return watch((value, { name }) => {
        const fieldValue = value[rule.field as keyof typeof value];
        if (name === rule.field && rule.condition?.(fieldValue)) {
          rule.action({
            getValues,
            setValue,
            value: fieldValue,
          });
        }
      });
    });

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [watch, getValues, setValue, props.rules]);

  return methods;
};
