import { subjectsAtom } from '@/store/commons';
import { mockApiResponse } from '@/utils/mockData';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

export function useSubjects() {
  const [subjects, setSubjects] = useAtom(subjectsAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSubjects = async (className: string = '10') => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use mock data for now
      const response = mockApiResponse;

      // Transform the response to match our expected structure
      const transformedSubjects = response.flatMap(
        (classItem: any) =>
          classItem.subjects?.map((subject: any) => ({
            id: subject.id,
            name: subject.name,
            icon: subject.icon || '/placeholder.svg',
            papers:
              subject.papers?.map((paper: any) => ({
                id: paper.id,
                name: paper.name,
                chapters:
                  paper.chapters?.map((chapter: any) => ({
                    id: chapter.id,
                    name: chapter.name,
                    topics:
                      chapter.topics?.map((topic: any) => ({
                        id: topic.id,
                        name: topic.name,
                      })) || [],
                  })) || [],
              })) || [],
          })) || []
      );

      setSubjects(transformedSubjects);
    } catch (err) {
      console.error('Failed to load subjects:', err);
      setError('Failed to load subjects. Please try again.');
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
