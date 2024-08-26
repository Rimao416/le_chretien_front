import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const API_URL = "localhost:5000/api/v1/users";

function changePermissionBackward(getPermission, listPermission) {
  // Trouver la position de l'élément actuel dans le tableau permission
  const currentIndex = listPermission.indexOf(getPermission);

  console.log(getPermission);
  // Si l'élément actuel est à la première position (indice 0), ne rien faire
  // if (currentIndex === 0) {
  //   return;
  // }

  // Si l'élément actuel n'est pas le premier, changer la valeur de permission
  const previousPermission = listPermission[currentIndex - 1];
  return listPermission[currentIndex] === undefined ? "" : previousPermission;
}

const API = axios.create({ baseURL: "http://localhost:5000" });
API.defaults.withCredentials = true;

const permission = [
  "emailSuccess",
  "tokenVerificationSuccess",
  "passwordVerificationSuccess",
];

export const verifyEmail = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        "/api/v1/users/verify-email",
        credentials
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/token",
  async (credentials, { rejectWithValue }) => {
    console.log("Let's go");
    try {
      const response = await API.post(
        "/api/v1/users/verify-token",
        credentials
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
export const resendToken = createAsyncThunk(
  "auth/resend",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        "/api/v1/users/resend-token",
        credentials
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
export const verifyPassword = createAsyncThunk(
  "auth/password",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        "/api/v1/users/verify-password",
        credentials
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const skipVerification = createAsyncThunk(
  "auth/skip",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/v1/users/skip-verification");
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
export const sendUsername = createAsyncThunk(
  "auth/send",
  async (credentials, { rejectWithValue }) => {
    // Send axios
    try {
      const { data } = await API.post(
        "/api/v1/users/send-username",
        credentials
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

// export const verifyEmail = (formData) => async (dispatch) => {
//   try {
//     dispatch({ type: "VERIFY_EMAIL_START" });
//     const { data } = await AuthApi.verifyEmail(formData);
//     dispatch({ type: "VERIFY_EMAIL_SUCCESS", data });
//     console.log(data);
//     // console.log("Salut les gars")
//   } catch (error) {
//     console.log(error);

//     dispatch({ type: "VERIFY_EMAIL_FAIL", data: error.response.data });
//   }
// };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: null,
    loading: false,
    message: [],
    errorType: "",
    status: "",
    permission: "",
  },
  reducers: {
    intializeAuth: (state) => {
      return {
        ...state,
        authData: null,
        loading: false,
        message: [],
        errorType: "",
        status: "",
        permission: "",
      };
    },
    updatePermission: (state, action) => {
      console.log(action);
      // changePermissionBackward(action.data, permission),
      return {
        ...state,
        permission: changePermissionBackward(action.payload, permission),
      };
    },
    validationError: (state, action) => {
      return {
        ...state,
        message: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.message = [];
        state.status = "pending";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = [];
        state.authData = action.payload.user;
        state.status = "success";
        state.permission = permission[0];
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.message = action.payload.alert;
        state.status = "fail";
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.message = [];
        state.errorType = null;
        state.status = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        console.log("J'ai reussi");
        state.loading = false;
        state.message = [];
        state.authData = action.payload.user;
        state.errorType = null;
        state.status = action.payload.status;
        state.permission = permission[1];
      })
      .addCase(verifyToken.rejected, (state, action) => {
        console.log(action);
        console.log(action);
        return {
          ...state,
          loading: false,
          message: action.payload.alert,
          status: "fail",
        };
      })
      .addCase(resendToken.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorType = null;
        state.status = null;
        state.message = [];
      })
      .addCase(resendToken.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = false;
        state.authData = action.payload.user;
        state.message = action.payload.alert;
        state.errorType = null;
        state.status = action.payload.status;
      })
      .addCase(resendToken.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
          status: "fail",
          message: action.payload.alert,
        };
      })
      .addCase(verifyPassword.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorType = null;
        state.status = null;
      })
      .addCase(verifyPassword.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = false;
        state.authData = action.payload.user;
        state.errorType = null;
        state.status = action.payload.status;
        state.permission = permission[2];
      })
      .addCase(verifyPassword.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
          status: action.payload.status,
          errorType: action.payload.type,
          message: action.payload.alert,
        };
      })
      .addCase(skipVerification.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorType = null;
        state.status = null;
        state.message = [];
      })
      .addCase(skipVerification.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = false;
        state.authData = action.payload.user;
        state.errorType = null;
        state.status = action.payload.status;
        // state.permission = permission[3];
      })
      .addCase(skipVerification.rejected, (state, action) => {
        console.log(action);
        return {
          ...state,
          loading: false,
          error: true,
          status: action.payload.status,
          // errorType: action.payload.type,
          // message: action.payload.message,
        };
      })
      .addCase(sendUsername.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorType = null;
        state.status = null;
        state.message = [];
      })
      .addCase(sendUsername.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = false;
        state.authData = action.payload.user;
        state.errorType = null;
        state.status = action.payload.status;
      })
      .addCase(sendUsername.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
          status: action.payload.status,
          // errorType: action.payload.type,
          message: action.payload.alert,
        };
      });
  },
});

export const { intializeAuth, updatePermission, validationError } =
  authSlice.actions;
export default authSlice.reducer;
