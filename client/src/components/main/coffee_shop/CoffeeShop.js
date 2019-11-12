import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import Queries from "../../../graphql/queries";
import AddShopToFavorite from "../Favorite/AddShopToFavorite";
const { FETCH_SHOP } = Queries;

export default () => {
  const { shopId } = useParams();
  const { data, error, loading } = useQuery(FETCH_SHOP, {
    variables: { id: shopId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const {
    coffeeShop: {
      name,
      description,
      url,
      imageURL,
      address,
      founded,
      type,
      baristaSatisfaction,
      coffees,
      users
    }
  } = data;
  return (
    <div className="coffee-shop">
      <img src="#" alt={`${name} coffee shop`} />
      <div className="coffe-shop-main-info">
        <h1>{name}</h1>
        <h2>{address.street}</h2>
        <h3>{`${address.city}, ${address.state} ${address.zip}`}</h3>
      </div>
      <div>
        <AddShopToFavorite users={users} shopId={shopId} />
      </div>
      <div className="coffe-shop-extra-info">
        <ul>
          <li>
            <s>Founded:</s>
            <span>{founded}</span>
          </li>
          <li>
            <s>Type:</s>
            <span>{type}</span>
          </li>
          <li>
            <s>Barista Satisfaction:</s>
            <span>{baristaSatisfaction}</span>
          </li>
        </ul>
        <section>
          <h3>Coffee:</h3>
          <ul className="shop-coffee-ul">
            {coffees.map(coffee => (
              <li className="coffee-li" key={coffee.id}>
                <Link to={`/${shopId}/coffee-${coffee.id}`}>{coffee.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
