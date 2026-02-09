import API_ROUTE from "../endPoints";
import api from "../axios/index";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export function useGetAllUsers(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.superadmin.getAllUsers, params];

  const { data, error, isLoading, isError, isPending } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(
        `${API_ROUTE.superadmin.getAllUsers}${constructQueryString(params)}`
      ),
  });

  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    error,
    isLoading,
    isPending,
    isError,
  };
}

export function useGetAllFreelancers(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.superadmin.getAllFreelancers, params];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(
        `${API_ROUTE.superadmin.getAllFreelancers}${constructQueryString(
          params
        )}`
      ),
  });

  return {
    data: data?.data?.data,
    error,
    isLoading,
    isError,
  };
}

export function useGetAllGigs(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.superadmin.getAllGigs, params];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(
        `${API_ROUTE.superadmin.getAllGigs}${constructQueryString(params)}`
      ),
  });

  return {
    data: data?.data?.data,
    error,
    isLoading,
    isError,
  };
}

export function useGetAllProjects(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.superadmin.getAllProjects, params];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(
        `${API_ROUTE.superadmin.getAllProjects}${constructQueryString(params)}`
      ),
  });

  return {
    data: data?.data?.data,
    error,
    isLoading,
    isError,
  };
}

export function useGetAllJobs(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.superadmin.getAllJobs, params],
    queryFn: async () =>
      await api.get(
        `${API_ROUTE.superadmin.getAllJobs}?${constructQueryString(params)}`
      ),
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    active_jobs: data?.data?.active_jobs,
    total_jobs: data?.data?.total_jobs,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetStatisticsData(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.superadmin.statisticData, params],
    queryFn: async () =>
      await api.get(
        `${API_ROUTE.superadmin.statisticData}?${constructQueryString(params)}`
      ),
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useClosedDispute(id) {
  const navigate = useNavigate();
  const {
    mutate: closeDispute,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.superadmin.closeDispute}/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Dispute Close Successfully");
    },
    onError: (error) => {
      toast.error("Failed to close dispute.");
    },
  });
  return { closeDispute, isSuccess, isPending, isError, error };
}

export function useDisableUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: disableuser,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.superadmin.disableUser}/${data.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.superadmin.getAllUsers],
      });
      toast.success("User disable Successfully");
    },
    onError: (error) => {
      toast.error("Failed to disable user.");
    },
  });
  return { disableuser, isSuccess, isPending, isError, error };
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (id) => {
      return api.delete(`${API_ROUTE.superadmin.deleteUser}/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.superadmin.getAllUsers],
      });
      toast.success("User deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  return { deleteUser, isPending, isSuccess, isError, error };
}

