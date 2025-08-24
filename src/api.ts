import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { checkPrimeSync } from "crypto";
import { formatDate } from "./lib/utils";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [, roomPk] = queryKey;
  return instance.get(`rooms/${roomPk}/`).then((Response) => Response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews/`)
    .then((Response) => Response.data);
};

export const getMe = () =>
  instance.get(`users/me/`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out/`, null, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  instance
    .post(
      `/users/github`,
      { code },
      { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
    )
    .then((response) => response.status);

export interface IKakaoAuthRes {
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
    nickname: string;
    profile_image?: string;
  };
}

export const kakaoLogIn = (code: string) =>
  instance
    .post(
      `/users/kakao`,
      { code },
      { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
    )
    .then((response) => response.status);

// export const kakaoLogIn = async (code: string): Promise<IKakaoAuthRes> {
//   const { data } = await instance.post<IKakaoAuthRes>(`/users/kakao`, { code });
//   sessionStorage.setItem("access", data.token);
//   setAccessToken(data.token)
// }

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error?: string;
  detail?: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      `/users/log-in/`,
      { username, password },
      { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
    )
    .then((response) => response.data);

export interface IUsernameSignUpVariables {
  name: string;
  email: string;
  username: string;
  password: string;
}

export const usernameSighUp = ({
  name,
  email,
  username,
  password,
}: IUsernameSignUpVariables) =>
  instance
    .post(
      `users/`,
      { name, email, username, password },
      { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
    )
    .then((response) => response.data);

export const getAmenities = () =>
  instance.get(`rooms/amenities/`).then((response) => response.data);

export const getCategories = () =>
  instance.get(`categories/`).then((response) => response.data);

export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilet: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export const uploadRoom = (variables: IUploadRoomVariables) =>
  instance
    .post(`rooms/`, variables, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((response) => response.data);

export const getUploadURL = () =>
  instance
    .post(`medias/photos/get-url`, null, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((response) => response.data);

export interface IUploadImageVariables {
  file: FileList;
  uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVariables) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);
};

export interface ICreatePhotoVariables {
  description: string;
  file: string;
  roomPk: string;
}

export const createPhoto = ({
  description,
  file,
  roomPk,
}: ICreatePhotoVariables) =>
  instance
    .post(
      `rooms/${roomPk}/photos/`,
      { description, file },
      { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }
    )
    .then((response) => response.data);

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [_, roomPk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const checkIn = formatDate(firstDate)
    const checkOut = formatDate(secondDate)

    return instance
      .get(
        `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
      )
      .then((response) => response.data);
  }
};
