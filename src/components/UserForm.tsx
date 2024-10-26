import React from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  styled,
} from "@mui/material";
import { FormRule, UserFormData } from "../types/form.type";
import { useFormWithRules } from "../hooks/useFormWithRules.hook";

const FormContainer = styled("form")`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormField = styled(Box)`
  margin-bottom: 1.5rem;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

const lifestyleOptions = [
  "Sédentaire",
  "Modérément actif",
  "Actif",
  "Très actif",
  "Athlétique",
];

const civilityOptions = ["M.", "Mme.", "Autre"];

const countries = [
  "France",
  "Belgique",
  "Suisse",
  "Canada",
  "Luxembourg",
  "Autre",
];

const UserForm: React.FC = () => {
  const rules: FormRule<UserFormData>[] = [
    {
      field: "lastName",
      condition: (value) => value === "Charly",
      action: ({ setValue }) => {
        setValue("firstName", "LEBG");
        setValue("age", 27);
        setValue("lifestyle", "Actif");
        setValue("civility", "M.");
        setValue("country", "France");
      },
    },
  ];
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormWithRules<UserFormData>({
    rules: rules,
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      lifestyle: "",
      civility: "",
      country: "",
    },
  });

  const onSubmit = (data: UserFormData) => {
    console.log(data);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Formulaire d'inscription
      </Typography>

      <FormField>
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Le nom est requis" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nom"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
      </FormField>

      <FormField>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "Le prénom est requis" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Prénom"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />
      </FormField>

      <FormField>
        <Controller
          name="age"
          control={control}
          rules={{
            required: "L'âge est requis",
            min: { value: 18, message: "Vous devez avoir au moins 18 ans" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Âge"
              type="number"
              fullWidth
              error={!!errors.age}
              helperText={errors.age?.message}
            />
          )}
        />
      </FormField>

      <FormField>
        <FormControl fullWidth>
          <InputLabel>Style de vie</InputLabel>
          <Controller
            name="lifestyle"
            control={control}
            rules={{ required: "Le style de vie est requis" }}
            render={({ field }) => (
              <Select
                {...field}
                label="Style de vie"
                error={!!errors.lifestyle}
              >
                {lifestyleOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </FormField>

      <FormField>
        <FormControl fullWidth>
          <InputLabel>Civilité</InputLabel>
          <Controller
            name="civility"
            control={control}
            rules={{ required: "La civilité est requise" }}
            render={({ field }) => (
              <Select {...field} label="Civilité" error={!!errors.civility}>
                {civilityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </FormField>

      <FormField>
        <FormControl fullWidth>
          <InputLabel>Pays</InputLabel>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Le pays est requis" }}
            render={({ field }) => (
              <Select {...field} label="Pays" error={!!errors.country}>
                {countries.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </FormField>

      <SubmitButton
        type="submit"
        variant="contained"
        color="primary"
        size="large"
      >
        Soumettre
      </SubmitButton>
    </FormContainer>
  );
};

export default UserForm;
