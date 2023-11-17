import { StyledLink } from "rakkasjs";
import { useRakkasBreadCrumbs } from "./useBreadCrumbs";

interface BreadCrumbsProps {}

export default function BreadCrumbs({}: BreadCrumbsProps) {
  const { breadcrumb_routes } = useRakkasBreadCrumbs();
  return (
    <div className="flex z-50 px-2">
      {breadcrumb_routes.map(({ name, path }, idx) => {
        return (
          <StyledLink href={path} className="" activeClass="text-accent">
            {name} {idx < breadcrumb_routes.length - 1 && ">"}
          </StyledLink>
        );
      })}
    </div>
  );
}


