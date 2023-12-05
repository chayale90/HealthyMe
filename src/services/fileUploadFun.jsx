import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, TOKEN_NAME } from "./apiService";

//category image in admin panel - V
 export const uploadImgCategory = async (_id,fileRef) => {
    if (fileRef.current.files.length == 0) {
        return toast.info("The image category did not change")
    }
    let myFile = fileRef.current.files[0];
    if (myFile.size > 2 * 1024 * 1024) {
        return toast.error("Image too big")
    }
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
            toast.success("image uploaded successfully");
            return true;
        }
    }
    catch (err) {
        toast.error("There error, try again later")
        console.log(err);
    }
}

//avater image
export const doApiFileUploadAvatars = async (_id,fileRef) => {
    if (fileRef.current.files.length == 0) {
        return toast.info("The image Avater did not change")
    }
    let myFile = fileRef.current.files[0];
    if (myFile.size > 2 * 1024 * 1024) {
        return toast.error("Image too big")
    }
    console.log(myFile);
    const formData = new FormData();
    formData.append("myFile22", myFile);
    let url = API_URL + "/upload/uploadAvatarSignUp/" + _id;
    console.log(url);
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

//food image - V
export const uploadImgFood = async (_id,fileRef) => {
    if (fileRef.current.files.length == 0) {
        return toast.info("The image did not change")
    }
    let myFile = fileRef.current.files[0];
    if (myFile.size > 2 * 1024 * 1024) {
        return toast.error("Image too big")
    }
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
            toast.success("image uploaded successfully");
            return true; 
        }
    }
    catch (err) {
        toast.error("There error, try again later")
        console.log(err);
    }
}
