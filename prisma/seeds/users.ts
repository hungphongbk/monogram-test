import { Prisma } from "@prisma/client";

export const users: Prisma.UserCreateInput[] = [
  {
    displayName: "Phong Truong Hung",
    email: "51202744@hcmut.edu.vn",
    name: "51202744",
    idToken: "1",
  },
  {
    displayName: "Tri Quang Tran",
    email: "triqutran@gmail.com",
    name: "triqutran",
    idToken: "2",
  },
  {
    displayName: "Trang Thuy Le",
    email: "katniss@gmail.com",
    name: "katniss",
    idToken: "3",
  },
];
