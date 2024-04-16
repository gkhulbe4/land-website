import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLandStore from "../../landStore";

function AllLands() {
  // const [lands, setLands] = useState([]);
  const {landInfo , fetchLandInfo} = useLandStore((state) => ({
    landInfo: state.landInfo,
    fetchLandInfo: state.fetchLandInfo,
  }))
  
  const navigate = useNavigate();
  const [deleteLandId, setDeleteLandId] = useState(null);

  const notifyError = () => {
    toast.error("Please Login to Delete Land",{
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  };

  useEffect(() => {
    fetchLandInfo();
  }, [landInfo]);

  const deleteLand = (id) => {
    axios.delete(`http://localhost:3000/lands/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // location.reload();
        setDeleteLandId(null)
      })
      .catch(() => {
        notifyError();
      })
  };
  return (
    <div>
      {deleteLandId && (
        <Modal
          isOpen={true}
          onClose={() => {
            setDeleteLandId(null);
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Land</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this land?</ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                mr={3}
                onClick={() => {
                  setDeleteLandId(null);
                }}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => {
                deleteLand(deleteLandId)
              }}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <div className='flex flex-col gap-6 pt-6 bg-gray-200'>
      {landInfo.map((land) => (
            <div className="relative bg-white flex py-7 px-2 hover:opacity-80 hover:shadow-lg transition duration-200 ease-out border-t mx-5 rounded-lg">
              <div className="absolute flex top-2 right-6 z-50 gap-4 justify-between">
              <button className="btn btn-outline btn-warning btn-sm"
                onClick={() => navigate("/edit/" + land._id)}
                >Edit</button>

                <button className="btn btn-outline btn-error btn-sm"
                onClick={() => {
                  setDeleteLandId(land?._id);
                }}
                >Delete</button>
              </div>

            <div className="flex relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
              <img className="rounded-xl h-full w-full" src={land.files[0]}/>
            </div>
      
            <div className="flex flex-col flex-grow pl-5">
              <div className="flex justify-between text-right font-light">
                <p>{land.city}</p>
              </div>
              <h4 className="text-xl">{land.title.toUpperCase()}</h4>
              <div className="border-b w-10 pt-2"></div>
      
              <p className="pt-2 text-sm text-gray-500 flex-grow">{land.description}</p>
      
              <div className="flex justify-between items-end pt-5">
                <p className="flex items-center text-right font-light">
                  {land.address} , {land.zipcode}
                </p>
                <div>
                  <p className="text-lg font-semibold pb-2 lg:text-2xl">₹{new Intl.NumberFormat("en-IN").format(land.price)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
        transition: Bounce
        />
    </div>
  );
}

export default AllLands;
