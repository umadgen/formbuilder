/* eslint-disable @typescript-eslint/no-explicit-any */
import { Path, UseFormProps, UseFormReturn, useForm } from "react-hook-form";
import { useEffect } from "react";
import { FormRule } from "./useFormWithRules.type";

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
    if (!props.rules?.length) return;

    // Get all watched fields
    const allWatchFields = new Set(
      props.rules.flatMap((rule) =>
        Array.isArray(rule.condition.fields)
          ? rule.condition.fields
          : [rule.condition.fields]
      )
    );

    const subscription = watch((formValue, { name }) => {
      if (!name || !allWatchFields.has(name)) return;

      // Get all values from watched fields
      const watchValues = Array.from(allWatchFields).reduce((acc, field) => {
        acc[field] = formValue[field as keyof typeof formValue];
        return acc;
      }, {} as Partial<Record<keyof TFieldValues, any>>);

      // Evaluate each rule
      props.rules!.forEach((rule) => {
        // If single field, map it to array
        const fieldsToCheck = Array.isArray(rule.condition.fields)
          ? rule.condition.fields
          : [rule.condition.fields];

        // Check if the field is in the list of fields to check
        if (fieldsToCheck.includes(name as Path<TFieldValues>)) {
          // Evaluate the condition with all watched values
          if (rule.condition.evaluate(watchValues)) {
            rule.action({
              getValues,
              setValue,
              watchValues,
            });
          }
        }
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, getValues, setValue, props.rules]);

  return methods;
};
