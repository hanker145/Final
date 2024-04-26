import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
import apiService from "../../app/apiService";

import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line
  const [checked, setChecked] = useState([]);
  // eslint-disable-next-line
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);

  //getall products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      let url = `/api/v1/product/get-product`;
      if (page) {
        url += `?page=${page}`;
      }
      if (checked.length) {
        url += `&checked=${checked}`;
      }
      if (radio.length) {
        url += `&radio=${radio}`;
      }
      const { data } = await apiService.get(url);
      setLoading(false);
      setProducts([...products, ...data.products]);
      setTotal(data.countTotal);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await apiService.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  //lifecycle method
  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3 ">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img src={p.photo} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 60)}...
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
