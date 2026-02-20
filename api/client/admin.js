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
    queryKey: [API_ROUTE.admin.getDashbaordApplicantData, params],
    queryFn: async () => await api.get(`${API_ROUTE.admin.getDashbaordApplicantData}?${constructQueryString(params)}`),
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
    staleTime: 60 * 1000 * 5,
    // refetchOnWindowFocus: false,
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