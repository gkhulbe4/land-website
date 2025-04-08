import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Land() {
  let { landId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/lands/${landId}`)
      .then((res) => {
        const result = res.data.land;
        setTitle(result.title);
        setDescription(result.description);
        setPrice(result.price);
        setFiles(result.files);
        setZip(result.zipcode);
        setAdress(result.address);
        setCity(result.city);
        setSize(result.size);
      })
      .catch((err) => console.error(err));
  }, [landId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-center items-start p-10">
      <div className="order-1 lg:order-2">
        <div className="carousel w-full flex ">
          {files?.map((file, index) => (
            <div
              key={index + 1}
              id={index + 1}
              className="carousel-item w-full justify-center"
            >
              <div className="h-96 w-full sm:w-[500px] mx-auto relative">
                <img src={file} className="object-cover h-full w-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          {files?.map((file, index) => (
            <a key={index} href={`#${index + 1}`} className="btn btn-xs">
              {index + 1}
            </a>
          ))}
        </div>
      </div>

      <div className="order-2 lg:order-1 text-center lg:text-left">
        <div className="flow-root">
          <dl className="-my-3 divide-y divide-gray-200 text-sm *:even:bg-gray-50">
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Title</dt>

              <dd className="text-gray-700 sm:col-span-2">{title}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Address</dt>

              <dd className="text-gray-700 sm:col-span-2">{address}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">City</dt>

              <dd className="text-gray-700 sm:col-span-2">{city}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Price</dt>

              <dd className="text-gray-700 sm:col-span-2">{price}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Size</dt>

              <dd className="text-gray-700 sm:col-span-2">{size} sq.feet</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Bio</dt>

              <dd className="text-gray-700 sm:col-span-2">{description}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Land;
