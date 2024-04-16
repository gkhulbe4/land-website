import React from 'react'
import Prac2 from './Prac2';

function Prac() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        {deleteFile!==null && (
        <Modal
          isOpen={true}
          onClose={() => {
            setDeleteFile(null);
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete File</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this file?</ModalBody>

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
              <Button colorScheme="red" onClick={() => {
                deleteImg(deleteFile)
              }}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
        <u><h1>EDIT DETAILS :-</h1></u>
         <div className="carousel w-full flex">
            {files?.map((file , index) => (
                <div key={index+1} id={index+1} className="carousel-item w-full justify-center">
                    <div className='h-96 w-[600px] relative'>
                        <h1 className='absolute top-5 right-7 cursor-pointer'
                        onClick={() => setDeleteFile(index)}
                        >❌</h1>
                        <img src={file} className="object-contain h-full w-full" />
                    </div>
                </div> 
            ))}
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
            {files?.map((file, index) => (
                <a key={index} href={`#${index+1}`} className="btn btn-xs">{index+1}</a> 
            ))}
        </div>
        <h2>Title</h2>
        <input type="text"
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
         />

        <h2>Description</h2>
        <input type="text"
        name='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)} />

        <h2>Price</h2>
        <input type="text"
        name='price'
        value={price}
        onChange={(e) => setPrice(e.target.value)} />

        <h2>Images :-</h2>
            <input
                type='file'
                multiple
                disabled = {auth ? false : true}
                onChange={(e) => submitData(e)}
          />    
        
        <br />
      
        <button className="btn btn-outline btn-info"
        disabled={loading} 
        onClick={() => {
            axios.put(`http://localhost:3000/lands/${landId}` , {
                title: title,
                description: description,
                price: price,
            }, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }).then((res) => {
                console.log(res.data.message)
                notifySuccess()
            }) 
            .catch(() => {
                notifyError();
            });
        }}
        >
            Update
        </button>

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
  )
}

export default Prac