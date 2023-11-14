"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

const xc_token = process.env.xc_auth;



interface FormState {
  positionID: string;
  storeName: string;
  image1: File | null;
  image2: File | null;
}


const FieldAgentForm = () => {
  const [formState, setFormState] = useState<FormState>({
    positionID: '',
    storeName: '',
    image1: null,
    image2: null,
  });

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value, files, type } = e.target;

   if (type === 'file') {
      // Update the state for file inputs
      setFormState({
        ...formState,
        [name]: files ? files[0] : null,
      });
    } else {
      // Update the state for text inputs
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  
};
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formState)
    const formData = new FormData();
    formData.append('postionID', formState.positionID);
    formData.append('storeName', formState.storeName);
    if (formState.image1) formData.append('image1', formState.image1);
    if (formState.image2) formData.append('image2', formState.image2);
    
    const response = await fetch('http://localhost:3000/api/uploadform', 
      { method: 'POST', body: formData,  });
    
    // const xc_url = 'https://abbott.zipdata.ai/api/v1/db/data/noco/py4pu5vdgaqyvk3/Store Audit'
    
    // const response = await fetch(xc_url, {
    //   method: 'POST',
    //   headers: {
    //     'xc-auth': xc_token
    //   }
    // })
};


    // console.log(response)

  return (

<div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-10">Store Audit Form</h1>

<form onSubmit={handleSubmit} encType="multipart/form-data">
  
<div className="mb-6">
    <label htmlFor="positionID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salesman Position ID</label>
    <input id="positionID" type="text" name="positionID" value={formState.positionID}  onChange= {handleInputChange}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XXX-XX-XXX" required></input>
  </div>
  <div className="mb-6">
    <label htmlFor="storeName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Store Name</label>
    <input id="storeName" type="text" name="storeName" value={formState.storeName} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC Chemists" required></input>
  </div>
  

<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="DealerBoard">Dealer Board</label>
<input name='image1' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="DealerBoard" type="file" accept='image/png, image/jpg, image/jpeg'  onChange={handleInputChange}></input>


<br></br>
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="Window">Window Visibility</label>
<input name='image2' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="Window" onChange={handleInputChange} type="file" accept='image/png, image/jpg, image/jpeg'></input>

<br></br>
<br></br>
  <button type="submit" className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full m:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

</div>
</div>
</div>
  )
  
};

export default FieldAgentForm;
