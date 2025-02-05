


import React, {useState} from 'react';
import './Sidebar.css';
import { NavLink } from "react-router-dom";
function Sidebar({ sidebar }) {

    const [openModules, setOpenModules] = useState({});

    const toggleModule = (module) => {
        setOpenModules((prevState) => ({
            ...prevState,
            [module]: !prevState[module],
        }));
    };

    const modules = [
        {
            name: "Dashboard",
            path: "/dashboard",
        },
        {
            name: "Products",
            submodules: [
                { name: "Add Product", path: "/add-product" },
                { name: "View Products", path: "/products/view" },
            ],
        },
        {
            name: "Users",
            submodules: [
                { name: "Add User", path: "/users/add" },
                { name: "Manage Users", path: "/users/manage" },
            ],
        },
    ];
    return (
    //     <div className={sidebar ? "sidebar sidebar--open" : "sidebar"}>
    //         <ul>
    //             <li>
    //                 <i class="bi bi-house"></i>Dashboard</li>
    //             <li><i class="bi bi-cloud-upload"></i> Products</li>
    //             <li><i class="bi bi-gender-male"></i>Mens</li>
    //             <li><i class="bi bi-gender-female"></i>Womens</li>
    //             <li><i class="bi bi-gender-male"></i>Kids</li>
    //             <li><i class="bi bi-gender-male"></i>Toys</li>
    //             <li><i class="bi bi-phone"></i>Mobile</li>
    //             <li><i class="bi bi-person"></i>Profile</li>
    //             <li><i class="bi bi-gear"></i>Settings</li>

    //         </ul>
    //     </div>
    // );
    // <div style={{ width: "250px", background: "#f4f4f4", padding: "10px", height: "100vh" }}>
    <div className={sidebar ? "sidebar sidebar--open" : "sidebar"}>
      {/* <h3>Sidebar</h3> */}
      <ul >
        {modules.map((module) => (
          <li key={module.name} >
            {module.submodules ? (
              <>
                <div
                  onClick={() => toggleModule(module.name)}
                //   style={{
                //     cursor: "pointer",
                //     padding: "10px",
                //     background: "#ddd",
                //     fontWeight: "bold",
                //   }}
                >
                  {module.name}
                </div>
                {openModules[module.name] && (
                  <ul 
                //   style={{ listStyleType: "none", padding: "10px" }}
                  >
                    {module.submodules.map((submodule) => (
                      <li key={submodule.name}>
                        <NavLink
                          to={submodule.path}
                        // //   style={{
                        // //     textDecoration: "none",
                        // //     color: "#333",
                        // //     padding: "5px 0",
                        // //     display: "block",
                        //   }}
                          activeStyle={{ fontWeight: "bold", color: "blue" }}
                        >
                          {submodule.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <NavLink
                to={module.path}
                // style={{
                //   textDecoration: "none",
                //   color: "#333",
                //   display: "block",
                //   padding: "10px",
                //   background: "#ddd",
                //   fontWeight: "bold",
                // }}
                activeStyle={{ background: "#bbb" }}
              >
                {module.name}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar