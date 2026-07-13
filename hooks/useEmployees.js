import { useCallback, useEffect, useState } from "react";
import { getEmployees } from "../lib/api/employees";

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEmployees = useCallback(async () => {
    setError(null);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadEmployees();
  }, [loadEmployees]);

  return {
    employees,
    loading,
    error,
    refetch: loadEmployees
  };
}