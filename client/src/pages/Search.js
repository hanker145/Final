import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
const Search = () => {
  // eslint-disable-next-line
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search results</h1>
          <h6>
            {values?.results.length < 1
              ? "No product found"
              : `Found ${values?.results.length} items`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div key={p.id} className="card m-2" style={{ width: "18rem" }}>
                <img src={p.photo} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price} </p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
