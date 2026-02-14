import { toast } from "react-toastify";
import api from "../axios";
import API_ROUTE from "../endPoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFormStatus } from "../../redux/slices/authSlice";

// POST
export function useAddApplicantInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const queryClient = useQueryClient();
  const {
    mutate: addApplicant,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.applicant.addApplicantInfo}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Success");
      dispatch(setFormStatus({ formStatus: 'guardian-info-2' }))
      navigate("/form/guardian-info-2");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.applicant.getApplicantInfo],
      });
    },
    onError: (error) => {
      toast.error("Failed to add details.");
    },
  });
  return { addApplicant, isSuccess, isPending, isError, error };
}

export function useAddApplicantGuardianInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  const {
    mutate: addApplicantGuardian,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.applicant.addApplicantGuardianInfo}`, data),
    onSuccess: (data) => {
      toast.success("Success");
      dispatch(setFormStatus({ formStatus: 'address-3' }))
      navigate("/form/address-3");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.applicant.getApplicantGuardianInfo],
      });
    },
    onError: (error) => {
      console.log("error: ", error)
      toast.error("Failed to add details.");
    },
  });
  return { addApplicantGuardian, isSuccess, isPending, isError, error };
}

export function useAddApplicantAddressInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  const {
    mutate: addApplicantAddress,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.applicant.addApplicantAddressInfo}`, data),
    onSuccess: (data) => {
      toast.success("Success");
      dispatch(setFormStatus({ formStatus: 'school-info-4' }))
      navigate("/form/school-info-4");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.applicant.getApplicantAddressInfo],
      });
    },
    onError: (error) => {
      console.log("error: ", error)
      toast.error("Failed to add details.");
    },
  });
  return { addApplicantAddress, isSuccess, isPending, isError, error };
}

export function useAddApplicantSchoolInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  const {
    mutate: addApplicantSchool,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.applicant.addApplicantSchoolInfo}`, data),
    onSuccess: (data) => {
      toast.success("Success");
      dispatch(setFormStatus({ formStatus: 'document-upload-5' }))
      navigate("/form/document-upload-5");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.applicant.getApplicantSchoolInfo],
      });
    },
    onError: (error) => {
      console.log("error: ", error)
      toast.error("Failed to add details.");
    },
  });
  return { addApplicantSchool, isSuccess, isPending, isError, error };
}

export function useAddApplicantDocument() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const queryClient = useQueryClient();
  const {
    mutate: addDocument,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.applicant.addApplicantDocument}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Success");
      dispatch(setFormStatus({ formStatus: 'test-preference-6' }))
      navigate("/form/test-preference-6");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.applicant.getApplicantInfo],
      });
    },
    onError: (error) => {
      toast.error("Failed to add details.");
    },
  });
  return { addDocument, isSuccess, isPending, isError, error };
}

export function useAddApplicantTestPreference() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  const {
    mutate: addTestPreference,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.applicant.addApplicantTestPreference}`, data),
    onSuccess: (data) => {
      toast.success("Success");
      dispatch(setFormStatus({ formStatus: 'completed' }))
      navigate("/form/complete");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.applicant.getApplicantTestPreference],
      });
    },
    onError: (error) => {
      console.log("error: ", error)
      toast.error("Failed to add details.");
    },
  });
  return { addTestPreference, isSuccess, isPending, isError, error };
}

// GET
export function useGetApplicantInfo() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.applicant.getApplicantInfo],
    queryFn: async () =>
      await api.get(`${API_ROUTE.applicant.getApplicantInfo}`),
    // enabled: id !== undefined && id !== null,
    staleTime: 60 * 1000 * 5, // 5 minute,
    retry: 1,
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetApplicantGuardianInfo() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.applicant.getApplicantGuardianInfo],
    queryFn: async () =>
      await api.get(`${API_ROUTE.applicant.getApplicantGuardianInfo}`),
    // enabled: id !== undefined && id !== null,
    staleTime: 60 * 1000 * 5, // 5 minute,
    retry: 1,
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetApplicantAddressInfo() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.applicant.getApplicantAddressInfo],
    queryFn: async () =>
      await api.get(`${API_ROUTE.applicant.getApplicantAddressInfo}`),
    // enabled: id !== undefined && id !== null,
    staleTime: 60 * 1000 * 5, // 5 minute,
    retry: 1,
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetApplicantSchoolInfo() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.applicant.getApplicantSchoolInfo],
    queryFn: async () =>
      await api.get(`${API_ROUTE.applicant.getApplicantSchoolInfo}`),
    // enabled: id !== undefined && id !== null,
    staleTime: 60 * 1000 * 5, // 5 minute,
    retry: 1,
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetApplicantTestPreference() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.applicant.getApplicantTestPreference],
    queryFn: async () =>
      await api.get(`${API_ROUTE.applicant.getApplicantTestPreference}`),
    // enabled: id !== undefined && id !== null,
    staleTime: 60 * 1000 * 5, // 5 minute,
    retry: 1,
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}
