import { Link, useLocation } from "react-router-dom";

const tabs = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Tasks",
    href: "/tasks",
  },
  {
    name: "Sessions",
    href: "/sessions",
  },
  {
    name: "Pomodoro",
    href: "/pomodoro",
  },
];

export default function TabNav() {
  const location = useLocation();

  return (
    <nav className="flex justify-center border-b border-border/40">
      <div className="flex space-x-8">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.href;
          return (
            <Link
              key={tab.name}
              to={tab.href}
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                isActive
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
