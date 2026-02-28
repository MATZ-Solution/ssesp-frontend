import { toast } from "react-toastify";
import api from "../axios";
import API_ROUTE from "../endPoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

export function useAdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {
    mutate: adminLogin,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.post(API_ROUTE.admin.signIn, data),
    onSuccess: (response) => {
      console.log("1")
      dispatch(setUser(response?.data?.data))
      navigate("/admin/dashboard")
    },
    onError: (err) => {
      console.log("err: ", err)
    }
  });

  return {
    adminLogin,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}

export function useAdminSignUp(options = {}) {
  const {
    mutate: adminSignUp,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.post(API_ROUTE.admin.signUp, data),
    ...options,
  });

  return {
    adminSignUp,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}

export function useGetDashbaordData() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.admin.getDashbaordData],
    queryFn: async () => await api.get(`${API_ROUTE.admin.getDashbaordData}`),
    staleTime: 60 * 1000 * 5,
    retry: 1
    // enabled: id !== undefined && id !== null
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetDashbaordApplicantRecentData(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.admin.getDashbaordApplicantRecentData, params],
    queryFn: async () => await api.get(`${API_ROUTE.admin.getDashbaordApplicantRecentData}?${constructQueryString(params)}`),
    staleTime: 60 * 1000 * 5,
    retry: 1
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetDashbaordApplicantData(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.admin.getDashbaordApplicantData, params],
    queryFn: async () => await api.get(`${API_ROUTE.admin.getDashbaordApplicantData}?${constructQueryString(params)}`),
    // staleTime: 60 * 1000 * 5,
    refetchOnWindowFocus: false,
    retry: 1
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetApplicantInfo(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.admin.getApplicantInfo],
    queryFn: async () =>
      await api.get(`${API_ROUTE.admin.getApplicantInfo}?${constructQueryString(params)}`),
    // enabled: id !== undefined && id !== null,
    refetchOnWindowFocus: false,
    // staleTime: 60 * 1000 * 5,
    retry: 1,
  });
  return {
    data: data?.data?.data,
    eligible: data?.data?.eligible,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetApplicantGuardianInfo(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.admin.getApplicantGuardianInfo],
    queryFn: async () =>
      await api.get(`${API_ROUTE.admin.getApplicantGuardianInfo}?${constructQueryString(params)}`),
    // enabled: id !== undefined && id !== null,
    refetchOnWindowFocus: false,
    // staleTime: 60 * 1000 * 5,
    refetchOnWindowFocus: false,
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

export function useGetApplicantDocument(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.admin.getApplicantDocuments],
    queryFn: async () =>
      await api.get(`${API_ROUTE.admin.getApplicantDocuments}?${constructQueryString(params)}`),
    // enabled: id !== undefined && id !== null,
    staleTime: 60 * 1000 * 5,
    refetchOnWindowFocus: false,
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

export function useGetApplicantSchoolInfo(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.admin.getApplicantSchoolInfo],
    queryFn: async () =>
      await api.get(`${API_ROUTE.admin.getApplicantSchoolInfo}?${constructQueryString(params)}`),
    // enabled: id !== undefined && id !== null,
    // staleTime: 60 * 1000 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return {
    data: data?.data?.data,
    previousSchool: data?.data?.previousSchool,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetApplicantAddressInfo(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.admin.getApplicantAddressInfo],
    queryFn: async () =>
      await api.get(`${API_ROUTE.admin.getApplicantAddressInfo}?${constructQueryString(params)}`),
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

export function useGetApplicantSchoolPreference() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.admin.getApplicantTestPreference],
    queryFn: async () =>
      await api.get(`${API_ROUTE.admin.getApplicantSchoolPreference}`),
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

export function useExportApplicants() {
  const { mutate: exportApplicants, isPending, isError, error } = useMutation({
    mutationFn: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return api.get(`${API_ROUTE.admin.exportApplicants}?${query}`, {
        responseType: "blob", // critical for binary/excel files
      });
    },
    onSuccess: (response) => {
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Applicants.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Export successful!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Export failed");
    },
  });

  return {
    exportApplicants,
    isPending,
    isError,
    error: error?.response?.data?.message,
  };
}
// PUT

export function useAdminVerifyAge(id) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  const {
    mutate: verfiyAge,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.admin.adminVerifyAge}/${id}`, data),
    onSuccess: (data, formData) => {
      // if (formData.status === 'false') {
      //   navigate(`/admin/applications`);
      //   toast.success("Rejected Successfully.")
      // } else {
      //   navigate(`/admin/applications/view-form-2?applicantID=${id}`);
      // }

      // testing
      if (formData.status === 'false') {
        navigate(`/admin/testing`);
        toast.success("Rejected Successfully.")
      } else {
        navigate(`/admin/testing/view-form-2?applicantID=${id}`);
      }
    },
    onError: (error) => {
      console.log("error: ", error)
      toast.error("Failed to add details.");
    },
  });
  return { verfiyAge, isSuccess, isPending, isError, error };
}

export function useAdminVerifyGuardianSalary(id) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  const {
    mutate: verfiyGuardianSalary,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.admin.adminVerifyGuardianSalary}/${id}`, data),
    onSuccess: (data, formData) => {
      // if (formData.status === 'false') {
      //   navigate(`/admin/applications`);
      //   toast.success("Rejected Successfully.")
      // } else {
      //   navigate(`/admin/applications/view-form-3?applicantID=${id}`);
      // }

      // testing
      if (formData.status === 'false') {
        navigate(`/admin/testing`);
        toast.success("Rejected Successfully.")
      } else {
        navigate(`/admin/testing/view-form-3?applicantID=${id}`);
      }
    },
    onError: (error) => {
      console.log("error: ", error)
      toast.error("Failed to add details.");
    },
  });
  return { verfiyGuardianSalary, isSuccess, isPending, isError, error };
}

export function useAdminVerifyApplicantSchool(id) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  const {
    mutate: verfiyApplicantSchool,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.admin.adminVerifyApplicantSchool}/${id}`, data),
    onSuccess: (data, formData) => {
      // if (formData.status === 'false') {
      //   navigate(`/admin/applications`);
      //   toast.success("Rejected Successfully.")
      // } else {
      //   navigate(`/admin/applications/view-form-4?applicantID=${id}`);
      // }

      // testing
      if (formData.status === 'false') {
        navigate(`/admin/testing`);
        toast.success("Rejected Successfully.")
      } else {
        navigate(`/admin/testing/view-form-4?applicantID=${id}`);
      }
     
    },
    onError: (error) => {
      console.log("error: ", error)
      toast.error("Failed to add details.");
    },
  });
  return { verfiyApplicantSchool, isSuccess, isPending, isError, error };
}

export function useAdminVerifyDocument(id) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  const {
    mutate: verfiyDocument,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.admin.adminVerifyDocument}/${id}`, data),
    onSuccess: (data) => {
      // navigate(`/admin/applications`);
      toast.success("Updated Successfully.")
      // queryClient.invalidateQueries({
      //   queryKey: [API_ROUTE.applicant.getApplicantSchoolPreference],
      // });
    },
    onError: (error) => {
      console.log("error: ", error)
      toast.error("Failed to add details.");
    },
  });
  return { verfiyDocument, isSuccess, isPending, isError, error };
}

// testing

export function useGetDashbaordApplicantTestingData(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.admin.getDashbaordApplicantTestingData, params],
    queryFn: async () => await api.get(`${API_ROUTE.admin.getDashbaordApplicantTestingData}?${constructQueryString(params)}`),
    // staleTime: 60 * 1000 * 5,
    refetchOnWindowFocus: false,
    retry: 1
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useResetDashbaordApplicantTesting() {
  const queryClient = useQueryClient(); 
  const {
    mutate: resetDocument,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (id) =>
      await api.put(`${API_ROUTE.admin.resetDashbaordApplicantTesting}/${id}`),
    onSuccess: (data) => {
      toast.success("Updated Successfully.")
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.admin.getDashbaordApplicantTestingData],
      });
    },
    onError: (error) => {
      console.log("error: ", error)
      toast.error("Failed to add details.");
    },
  });
  return { resetDocument, isSuccess, isPending, isError, error };
}