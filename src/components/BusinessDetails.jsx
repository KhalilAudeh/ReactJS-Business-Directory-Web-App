import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BusinessDirectoryContext } from "../App";

const BusinessDetails = () => {
  const { businessList } = useContext(BusinessDirectoryContext);

  // returing an object businessId for the rendered route upon user click
  const { businessId } = useParams();

  const [businessDetails, setBusinessDetails] = useState();
  const [nearByPlaces, setNearByPlaces] = useState([]);

  useEffect(() => {
    // making sure business list is not empty and the business clicked ID if available
    if (businessList.length > 0 && businessId) {
      // finding the business with the selected one ID
      const currentBusiness = businessList.find(
        (business) => business.id === businessId
      );

      // setting the found selected business to the business details to show its related details
      setBusinessDetails(currentBusiness);

      // NearBy functionality
      // declaring the city of the selected business
      const currentBusinessCity = currentBusiness.address.city;

      // filtering through business list to remove the selected business before finding nearby places
      // so that the selected business won't show within nearByPlaces array
      const filteredBusinesses = businessList.filter(
        (business) => business.id !== businessId
      );

      // filtering over the related businesses that have same city name
      const nearbyBusinesses = filteredBusinesses.filter(
        (business) => business.address.city === currentBusinessCity
      );

      // setting the filtered businesses to the nearByPlaces array
      setNearByPlaces(nearbyBusinesses);
    }
  }, [businessList, businessId]);

  // formatting street address
  const formatStreetAddress = (business) => {
    const { street, number } = business.address;
    return `${number} ${street} Street`;
  };

  // formatting city location address
  const formatCityAddress = (business) => {
    const { country, zip, city } = business.address;
    return `${city}, ${country} ${zip}`;
  };

  if (!businessDetails) {
    return <div>OOps something went wrong...</div>;
  }

  return (
    <div className="container pb-5">
      {/* business image */}
      <div className="row mb-5">
        <div className="col p-0">
          <img
            src={businessDetails.image}
            alt="business-img"
            className="col-12 p-0 img-fluid"
          />
        </div>
      </div>

      <div className="row mx-2">
        {/* business address details */}
        <div className="col mt-4">
          <div className="row">
            <div className="col text-capitalize">
              <h4>address</h4>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col text-muted">
              <p className="mb-0">{formatStreetAddress(businessDetails)}</p>
              <p>{formatCityAddress(businessDetails)}</p>
            </div>
          </div>
        </div>

        {/* business contact info */}
        <div className="col mt-4">
          <div className="row">
            <div className="col text-capitalize">
              <h4>contact</h4>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col text-muted">
              <p className="mb-0">{businessDetails.phone}</p>
              <p>{businessDetails.email}</p>
            </div>
          </div>
        </div>

        {/* business nearby places: showing their related names and addresses */}
        <div className="col-6 p-4 bg-white">
          <div className="row">
            <div className="col text-capitalize">
              <h4>nearby places</h4>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col text-muted">
              <div className="row">
                <div className="col">
                  {nearByPlaces.map((place) => (
                    <div className="row each-place mb-2 mx-1 py-3">
                      <div className="col-4">{place.name}</div>
                      <div className="col">
                        {formatStreetAddress(place)}, {formatCityAddress(place)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
