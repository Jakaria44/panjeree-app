import { subjectsAtom } from '@/store/commons';
import { axiosClient, transformSubjectsResponse } from "@/utils/api";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export function useSubjects() {
  const [subjects, setSubjects] = useAtom(subjectsAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSubjects = async (className: string = "10") => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(
        "/api/classes/nested?className=" + className
      );

      if (response.status === 200) {
        console.debug(response.data);
        setSubjects(transformSubjectsResponse(response.data));
      }
    } catch (err) {
      console.error("Failed to load subjects:", err);
      setError("Failed to load subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load subjects on mount
    loadSubjects();
  }, []);

  return {
    subjects,
    loading,
    error,
    refetch: loadSubjects,
  };
}
