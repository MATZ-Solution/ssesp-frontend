import { toast } from "react-toastify";
import api from "../axios";
import API_ROUTE from "../endPoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAddCandidate() {
  const navigate = useNavigate();
  const {
    mutate: addCandidate,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.candidate.addCandidate}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      alert("Project added successfully!");
    },
    onError: (error) => {
      alert("Error in Adding Project added !");
    },
  });
  return { addCandidate, isSuccess, isPending, isError, error };
}
