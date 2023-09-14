import { useEffect } from "react";

interface IPropsUseSaveForm {
  formKey: string;
  formData: unknown;
  setFormData(data: unknown): void;
}

export default function useFormStorage({
  formKey,
  formData,
  setFormData,
}: IPropsUseSaveForm) {
  useEffect(() => {
    const storedValue = window.localStorage.getItem(formKey);
    if (storedValue) {
      try {
        const storageVal = window.localStorage.getItem(formKey);
        if (storageVal) setFormData(JSON.parse(storageVal));
      } catch (e) {
        console.log("Failed to parse stored value");
      }
    }
  }, [formKey, setFormData]);

  useEffect(() => {
    window.localStorage.setItem(formKey, JSON.stringify(formData));
  }, [formData, formKey]);
}
