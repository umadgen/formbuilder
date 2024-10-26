/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DeepPartial,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

export interface UserFormData {
  firstName: string;
  lastName: string;
  age: number | null;
  lifestyle: string;
  civility: string;
  country: string;
}

export type RuleUtils<T extends Record<string, any>> = {
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  value: DeepPartial<T>[keyof DeepPartial<T>];
};

export type FormRule<T extends Record<string, any>> = {
  field: keyof T;
  condition?: (value: DeepPartial<T>[keyof DeepPartial<T>]) => boolean;
  action: (params: {
    getValues: UseFormGetValues<T>;
    setValue: UseFormSetValue<T>;
    value: DeepPartial<T>[keyof DeepPartial<T>];
  }) => void;
};
