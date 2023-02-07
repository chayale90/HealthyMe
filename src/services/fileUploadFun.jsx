import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, TOKEN_NAME } from "./apiService";

 export const doApiFileUpload = async (_id,fileRef) => {
    console.log(fileRef.current.files[0])
    if (fileRef.current.files.length == 0) {
        return toast.info("You need to choose image and then upload it")
    }
    let myFile = fileRef.current.files[0];
    if (myFile.size > 2 * 1024 * 1024) {
        return toast.error("Image too big")
    }
    console.log(myFile);
    // new FormData() -> know to use with files from client
    const formData = new FormData();
    formData.append("myFile22", myFile);
    let url = API_URL + "/upload/uploadCategory/" + _id;
    try {
        let resp = await axios.post(url, formData, {
            headers: {
                'x-api-key': localStorage[TOKEN_NAME]
            }
        })
        if (resp.data) {
            toast.success(resp.data.msg)
        }
    }
    catch (err) {
        toast.error("There error, try again later")
        console.log(err);
    }
}

export const doApiFileUploadAvatars = async (_id,fileRef) => {
    if (fileRef.current.files.length == 0) {
        return toast.info("The image did not upload")
    }
    let myFile = fileRef.current.files[0];
    if (myFile.size > 2 * 1024 * 1024) {
        return toast.error("Image too big")
    }
    console.log(myFile);
    // new FormData() -> know to use with files from client
    const formData = new FormData();
    formData.append("myFile22", myFile);
    let url = API_URL + "/upload/uploadAvatarSignUp/" + _id;
    try {
        let resp = await axios.post(url, formData)
        if (resp.data) {
            toast.success(resp.data.msg)
        }
    }
    catch (err) {
        toast.error("There error, try again later")
        console.log(err);
    }
}

export const doApiFileUploadFood = async (_id,fileRef) => {
    if (fileRef.current.files.length == 0) {
        return toast.info("You need to choose image and then upload it")
    }
    let myFile = fileRef.current.files[0];
    if (myFile.size > 2 * 1024 * 1024) {
        return toast.error("Image too big")
    }
    console.log(myFile);
    // new FormData() -> know to use with files from client
    const formData = new FormData();
    formData.append("myFile22", myFile);
    let url = API_URL + "/upload/uploadFood/" + _id;
    try {
        let resp = await axios.post(url, formData, {
            headers: {
                'x-api-key': localStorage[TOKEN_NAME]
            }
        })
        if (resp.data) {
            toast.success(resp.data.msg)
        }
    }
    catch (err) {
        toast.error("There error, try again later")
        console.log(err);
    }
}


export const doApiFileEditFood = async (_id,fileRef) => {
    if (fileRef.current.files.length == 0) {
        return toast.info("You do not change the image")
    }
    let myFile = fileRef.current.files[0];
    if (myFile.size > 2 * 1024 * 1024) {
        return toast.error("Image too big")
    }
    console.log(myFile);
    // new FormData() -> know to use with files from client
    const formData = new FormData();
    formData.append("myFile22", myFile);
    let url = API_URL + "/upload/uploadFood/" + _id;
    try {
        let resp = await axios.post(url, formData, {
            headers: {
                'x-api-key': localStorage[TOKEN_NAME]
            }
        })
        if (resp.data) {
            toast.success(resp.data.msg)
        }
    }
    catch (err) {
        toast.error("There error, try again later")
        console.log(err);
    }
}
