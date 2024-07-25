import { DashboardOptions } from "../types/dashboard";

export const dashboardOptions: DashboardOptions[] = [
  {
    label: "Dashboard",
    icon: <i className="ri-bar-chart-2-fill"></i>,
    url: "/seller/dashboard",
  },
  {
    label: "Orders",
    icon: <i className="ri-shopping-cart-2-fill"></i>,
    url: "/seller/dashboard/orders",
  },
  {
    label: "Products",
    icon: <i className="ri-shopping-bag-2-fill"></i>,
    url: "/seller/dashboard/products",
  },
  {
    label: "Add Products",
    icon: <i className="ri-add-box-fill"></i>,
    url: "/seller/dashboard/add-products",
  },
  {
    label: "Ratings & reviews",
    icon: <i className="ri-star-half-fill"></i>,
    url: "/seller/dashboard/reviews",
  },
  {
    label: "Support",
    icon: <i className="ri-hand-heart-fill"></i>,
    url: "/support",
  },
  {
    label: "Settings",
    icon: <i className="ri-settings-2-fill"></i>,
    url: "/seller/dashboard/settings",
  },
];
