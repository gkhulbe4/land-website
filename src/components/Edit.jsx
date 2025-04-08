import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "react-toastify/dist/ReactToastify.css";
import useLandStore from "../../landStore";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

function Edit() {
  let { landId } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [files, setFiles] = useState();
  const [price, setPrice] = useState("");
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [zipcode, setZipcode] = useState();
  const [size, setSize] = useState();
  const [deleteFile, setDeleteFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { auth } = useLandStore((state) => ({
    auth: state.auth,
  }));

  const notifySuccess = () => {
    toast.success("Land Updated", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyFileSuccess = () => {
    toast.success("Files added", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyError = () => {
    toast.error("Please Login to Update Land", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyFileError = () => {
    toast.error("File not added", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/lands/${landId}`).then((res) => {
      const result = res.data.land;
      setTitle(result.title);
      setDescription(result.description);
      setPrice(result.price);
      setCity(result.city);
      setAddress(result.address);
      setZipcode(result.zipcode);
      setSize(result.size);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/lands/${landId}`).then((res) => {
      const result = res.data.land;
      setFiles(result.files);
    });
  }, [files]);

  const deleteImg = (index) => {
    axios
      .delete(`http://localhost:3000/land/${landId}/${index}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.message);
        setDeleteFile(null);
      });
  };

  const submitData = async (e) => {
    setLoading(true);
    e.preventDefault(); // Prevent default form submission
    const selectedFiles = Array.from(e.currentTarget.files);
    // setFiles(selected)
    console.log("selected", selectedFiles);
    for (let i = 0; i < selectedFiles.length; i++) {
      let data = new FormData();
      data.append("file", selectedFiles[i]);
      data.append("upload_preset", "LandFiles");
      data.append("cloud_name", "dzn9oj49z");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dzn9oj49z/image/upload",
          data
        );
        const fileUrl = response.data.url;
        // console.log("Files",fileUrl);
        await axios
          .put(
            `http://localhost:3000/edit/${landId}`,
            { fileUrl },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            console.log(res.data.message);
          });
      } catch (error) {
        console.log(error);
        notifyFileError();
      }
    }
    notifyFileSuccess();
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="w-[800px]">
        <h1 className="text-left text-3xl font-bold">Details</h1>
      </div>

      {deleteFile !== null && (
        <Modal
          isOpen={true}
          onClose={() => {
            setDeleteFile(null);
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Image</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this image?</ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                mr={3}
                onClick={() => {
                  setDeleteFile(null);
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteImg(deleteFile);
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <div className="w-[800px] h-full ">
        <div className="carousel w-full flex">
          {files?.map((file, index) => (
            <div
              key={index + 1}
              id={index + 1}
              className="carousel-item w-full justify-center"
            >
              <div className="h-96 w-[600px] relative">
                <div className="absolute top-5 right-7 p-1 cursor-pointer rounded-3xl bg-black">
                  <DeleteRoundedIcon
                    className="text-gray-400 hover:text-red-600"
                    fontSize="medium"
                    onClick={() => setDeleteFile(index)}
                  />
                </div>
                <img src={file} className="object-fill h-full w-full" />
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

        <div className="flex mt-7 border-t border-gray-200">
          <div className="flex-col py-5 w-full">
            <h1 className="text-gray-500 text-sm font-medium">Title</h1>
            <input
              className="outline-none w-4/5"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex-col py-5 w-full">
            <h1 className="text-gray-500 text-sm font-medium">Size</h1>
            <input
              className="outline-none w-4/5"
              type="text"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
        </div>

        <div className="flex border-t border-gray-200">
          <div className="flex-col py-5 w-full">
            <h1 className="text-gray-500 text-sm font-medium">Price</h1>
            <input
              className="outline-none w-4/5"
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex-col py-5 w-full">
            <h1 className="text-gray-500 text-sm font-medium">Zipcode</h1>
            <input
              className="outline-none w-4/5"
              type="text"
              name="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
        </div>

        <div className="flex border-t border-gray-200">
          <div className="flex-col py-5 w-full">
            <h1 className="text-gray-500 text-sm font-medium">Address</h1>
            <input
              className="outline-none w-4/5"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex-col py-5 w-full">
            <h1 className="text-gray-500 text-sm font-medium">City</h1>
            <input
              className="outline-none w-4/5"
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>

        <div className="flex border-t border-gray-200">
          <div className="flex-col py-5 w-full">
            <h1 className="text-gray-500 text-sm font-medium">Description</h1>
            <textarea
              className="resize-none outline-none overflow-y-scroll w-full"
              name="description"
              id=""
              cols="30"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <input
          className="file-input bg-gray-100 border-gray-300 outline-none rounded-md shadow-sm file-input-ghost w-full max-w-xs"
          type="file"
          multiple
          disabled={auth ? false : true}
          onChange={(e) => submitData(e)}
        />

        <div className="flex justify-end mx-7">
          <button
            className="btn bg-[#38e078] hover:bg-green-500 px-8"
            disabled={loading}
            onClick={() => {
              axios
                .put(
                  `http://localhost:3000/lands/${landId}`,
                  {
                    title: title,
                    description: description,
                    price: price,
                    size: size,
                    zipcode: zipcode,
                    address: address,
                    city: city,
                  },
                  {
                    headers: {
                      "Content-type": "application/json",
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data.message);
                  notifySuccess();
                })
                .catch(() => {
                  notifyError();
                });
            }}
          >
            Update
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1999}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Edit;
