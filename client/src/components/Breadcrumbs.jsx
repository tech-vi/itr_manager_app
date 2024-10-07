import { Breadcrumb, Container } from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <Container>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item
            linkAs={NavLink}
            linkProps={{ to: "/", className: "text-decoration-none" }}
          >
            Home
          </Breadcrumb.Item>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <Breadcrumb.Item
                key={to}
                active={isLast}
                linkAs={!isLast ? NavLink : undefined}
                linkProps={
                  !isLast
                    ? { to, className: "text-decoration-none" }
                    : undefined
                }
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <hr />
      </Container>
    </>
  );
};

export default Breadcrumbs;
