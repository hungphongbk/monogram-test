import { Prisma } from "@prisma/client";

export const users: Prisma.UserCreateInput[] = [
  {
    displayName: "Phong Truong Hung",
    email: "51202744@hcmut.edu.vn",
    name: "51202744",
    idToken: "1",
    image:
      "http://dashboards.webkom.co/jquery/airframe/assets/img/avatars/43.jpg",
  },
  {
    displayName: "Tri Quang Tran",
    email: "triqutran@gmail.com",
    name: "triqutran",
    idToken: "2",
    image:
      "http://dashboards.webkom.co/jquery/airframe/assets/img/avatars/48.jpg",
  },
  {
    displayName: "Trang Thuy Le",
    email: "katniss@gmail.com",
    name: "katniss",
    idToken: "3",
    image:
      "http://dashboards.webkom.co/jquery/airframe/assets/img/avatars/20.jpg",
  },
];
