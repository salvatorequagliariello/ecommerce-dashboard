<h1 align="center">
  E-commerce CMS 📟
</h1>
A complete and fully functional CMS with a user-friendly interface that will allow you to control multiple stores and manage products, categories, billboards and payments.

<br>

## Table of Contents  
-  [Tech Stack](https://github.com/salvatorequagliariello/ecommerce-dashboard#tech-stack)
-  [Overview](https://github.com/salvatorequagliariello/ecommerce-dashboard/blob/main/README.md#overview)
-  [Features](https://github.com/salvatorequagliariello/ecommerce-dashboard/blob/main/README.md#features)
-  [Screenshots](https://github.com/salvatorequagliariello/ecommerce-dashboard/blob/main/README.md#screenshots)

<br>

## Tech stack
<div align="center"> 
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)"> 
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white">
  <img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/planetscale-%23000000.svg?style=for-the-badge&logo=planetscale&logoColor=white">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
  <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
</div>
<br>

## Overview
Built using mainly React and NextJS and wrote in Typescript, this user-friendly and responsive CMS will allow you to control and manage multiple stores with a single account through a sleek and modern UI. All you have to do to start using it is create an account and connect your E-Commerce Front-end to it through APIs.

The authentication for the web-app relies on [Clerk](https://clerk.com/), a powerful and secure authentication and user management system, while its UI is the combined result of [TailwindCSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) a collection of components built on top of Radix UI and Tailwind CSS. The entire web-app has been designed to specifically manage wristwatch E-commerces, but can be easily refactored to be able to manage any kind of E-shop.

The CMS dashboard let the user easily navigate and manage sales, payments, billboards, different categories and products, from a desktop, a laptop or even a smartphone. The user can create one or more stores to manage and then switch from one to another just by using a cascade menu. Then it's possible to create new products simply uploading a photo, a description and then choosing which category it belongs to. All the billboards and products images are uploaded on [Cloudinary](https://cloudinary.com/), and all the stores data is organized in a MySQL database hosted on [Planetscale](https://planetscale.com/) and managed through [Prisma](https://www.prisma.io/). 

All the payments and sales details are provided by the Stripe API.

<br>

## Features
- Manage multiple stores with a single account
- Fully responsive
- Stripe integration for payments reports and details
- Light/Dark mode
- Serverless database
- Easy to scale or refactor

<br>

## Screenshots
![Nuovo progetto (1)](https://github.com/salvatorequagliariello/ecommerce-dashboard/assets/109867120/8c31723e-354a-45bc-be73-b22bc7216661)
> The Orders section, where payments and orders are listed, and the main Dashboard of the CMS.

<br>

![Nuovo progetto](https://github.com/salvatorequagliariello/ecommerce-dashboard/assets/109867120/6fb255c9-7e27-47ca-aa11-e20e0af3bdad)
> The Products section and the edit page for an already created product.

