import {
  Tag,
  Users,
  Settings,
  Bookmark,
  Newspaper,
  SquarePen,
  HandPlatterIcon,
  Package,
  MapPinnedIcon,
    BadgeDollarSign,
    Coffee,
  LayoutGrid,
  type LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/employee",
          label: "Employee",
          active: pathname.includes("/employee"),
          icon: Newspaper,
          submenus: [
            {
              href: "/employee",
              label: "All Employee"
            },
            {
              href: "/employee/new",
              label: "New Employee"
            }
          ]
        },
        {
          href: "/branch",
          label: "Branch",
          active: pathname.includes("/branch"),
          icon: MapPinnedIcon
        },
        {
          href: "/service",
          label: "Service",
          active: pathname.includes("/service"),
          icon: HandPlatterIcon
        },
        {
          href: "/inventory",
          label: "Inventory",
          active: pathname.includes("/inventory"),
          icon: Package
        },
        {
          href: "",
          label: "Transactions",
          active: pathname.includes("/transactions"),
          icon: Newspaper,
          submenus: [
            {
              href: "/transactions",
              label: "All Transactions"
            },
            {
              href: "/transactions/new",
              label: "New Transaction"
            }
          ]
        },
        {
          href: "/serviceoffer",
          label: "Service Offered",
          active: pathname.includes("/serviceoffer"),
          icon: BadgeDollarSign
        },
        {
          href: "/orderstatus",
          label: "Order Status",
          active: pathname.includes("/orderstatus"),
          icon: Coffee
        },
        {
          href: "",
          label: "Posts",
          active: pathname.includes("/posts"),
          icon: SquarePen,
          submenus: [
            {
              href: "/posts",
              label: "All Posts"
            },
            {
              href: "/posts/new",
              label: "New Post"
            }
          ]
        },
        {
          href: "/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings
        }
      ]
    }
  ];
}
