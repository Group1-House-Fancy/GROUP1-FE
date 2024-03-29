import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";
import CustomButton from "./CustomButton";
import { FaEnvelope } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/background-banner.jpg";
import { apiRequest, apiRequestWithHeaders } from "../context/apiRequest";
import axios from "axios";
import swal from "sweetalert";

const Bidder = (props) => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="w-[50px] h-[50px]">
        <img
          src={props.imageProfile}
          alt={props.imageProfile}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-4">
          <p className="font-bold text-lg self-center">{props.fullname}</p>
          <p className="text-sm self-center">{props.bidNominal}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 text-xs">
          <div className="w-full lg:w-1/4">
            <CustomButton
              icon={<FaWhatsapp className="text-lg mr-1" />}
              label={"CHAT BIDDER"}
              color={"green"}
              border={"green"}
              borderWidth={2}
              onClick={props.onClickChat}
            />
          </div>
          <div className="w-full lg:w-1/6">
            <CustomButton
              label={"DEAL"}
              border={"#1D4ED8"}
              borderWidth={2}
              onClick={props.onClickDeal}
            />
          </div>
          <div className="w-full lg:w-1/6">
            <CustomButton
              label={"CANCEL"}
              color={"white"}
              border={"red"}
              borderWidth={2}
              textColor={"red"}
              onClick={props.onClickCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BidderHouse = ({ id, user_id, token }) => {
  const [bidder, setBidder] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://housefancy.site/negotiations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBidder([...res.data.data.data]);
      })
      .catch((err) => console.log(err.response.data.message));
    // .finally(() => BidderHouse());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure to delete?`)) {
      axios
        .delete(`https://housefancy.site/negotiations/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() =>
          swal({
            icon: "success",
            title: "success to delete",
          })
        )
        .catch((err) => console.log(err.response.data.message));
    }
  };

  return (
    <>
      {" "}
      {bidder.map((data) => (
        <div className="flex gap-4 mb-5" key={data.id}>
          <div className="w-[50px] h-[50px]">
            <img
              src={data.user.image_url}
              alt={data.user.full_name}
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <p className="font-bold text-lg self-center">
                {data.user.full_name}
              </p>
              <p className="text-md self-center">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(data.nego)}
              </p>
            </div>
            {user_id == data.user.id && (
              <div className="flex gap-3">
                <CustomButton
                  label={"CANCEL"}
                  color={"white"}
                  border={"red"}
                  borderWidth={2}
                  textColor={"red"}
                  onClick={() => handleDelete(data.id)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
const Owner = (props) => {
  return (
    <div className="flex gap-4">
      <div className="w-[50px] h-[50px]">
        <img
          src={props.imageProfile}
          alt={props.imageProfile}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <p className="font-bold text-lg self-center">{props.fullname}</p>
          <p className="text-md self-center">{props.bidNominal}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex mb-1">
            <div className="self-center">
              <FaPhone />
            </div>
            <p className="font-normal text-sm ml-2">{props.phone}</p>
          </div>
          <div className="flex mb-1">
            <div className="self-center">
              <FaEnvelope />
            </div>
            <p className="font-normal text-sm ml-2">{props.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Bidder, BidderHouse, Owner };
