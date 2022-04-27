import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BusinessDirectoryContext } from "../App";

const BusinessesList = () => {
  // implementing useNavigate to make a use of when user clicks on a business to explore more details about it
  const navigate = useNavigate();

  // declaring businessList context object by passing the value of the BusinessDirectoryContext Provider
  const { businessList } = useContext(BusinessDirectoryContext);

  return (
    <div>
      <div className="container px-0 table-list">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">
                <h6 className="text-uppercase fw-bold px-4 py-2 mb-0">name</h6>
              </th>
              <th scope="col">
                <h6 className="text-uppercase fw-bold px-4 py-2 mb-0">
                  description
                </h6>
              </th>
            </tr>
          </thead>

          <tbody>
            {businessList.map((business) => (
              <tr onClick={() => navigate(business.id)} key={business.id}>
                <td>
                  <p className="px-4 py-2 mb-0">{business.name}</p>
                </td>
                <td>
                  <p className="px-4 py-2 mb-0">{business.description}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessesList;
