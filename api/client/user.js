import API_ROUTE from "../endPoints";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../axios/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {
    mutate: userLogin,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.post(API_ROUTE.user.login, data),
    onSuccess: (response) => {
      dispatch(setUser(response?.data?.data))
      const status = response?.data?.data?.formStatus
      if (!status || status === 'null') {
       return navigate(`/form/student-info-1`);
      }
      if (status === 'completed') {
        return navigate(`/form/complete`);
      }
      if (status.includes('-')) {
       return navigate(`/form/${status}`);
      }
    },
    onError: (err) => {
      console.log("err: ", err)
    }
  });

  return {
    userLogin,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}

export function useSignUp(options = {}) {
  const {
    mutate: addSignUp,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.post(API_ROUTE.user.signUp, data),
    ...options,
  });

  return {
    addSignUp,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}

// export function useSendOtp(options = {}) {
//   const navigate = useNavigate();

//   const {
//     mutate: handleEmail,
//     isSuccess,
//     isPending,
//     isError,
//     reset,
//     error,
//     data,
//   } = useMutation({
//     mutationFn: (data) => api.post(API_ROUTE.user.sendOtp, data),
//     ...options,
//   });

//   return {
//     handleEmail,
//     isSuccess,
//     isPending,
//     isError,
//     reset,
//     error: error?.response?.data?.message,
//     data,
//   };
// }

// export function useSubmitOtp(options = {}) {
//   const navigate = useNavigate();

//   const {
//     mutate: handleOtp,
//     isSuccess,
//     isPending,
//     isError,
//     reset,
//     error,
//     data,
//   } = useMutation({
//     mutationFn: (data) => api.post(API_ROUTE.user.submitOtp, data),
//     ...options,
//   });

//   return {
//     handleOtp,
//     isSuccess,
//     isPending,
//     isError,
//     reset,
//     error: error?.response?.data?.message,
//     data,
//   };
// }

// export function useChangePassword(options = {}) {
//   const navigate = useNavigate();

//   const {
//     mutate: change_pass,
//     isSuccess,
//     isPending,
//     isError,
//     reset,
//     error,
//     data,
//   } = useMutation({
//     mutationFn: (data) => api.put(API_ROUTE.user.changePasword, data),
//     ...options,
//   });

//   return {
//     change_pass,
//     isSuccess,
//     isPending,
//     isError,
//     reset,
//     error: error?.response?.data?.message,
//     data,
//   };
// }
