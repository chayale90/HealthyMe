import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, TOKEN_NAME } from "./apiService";

//category image in admin panel - V
export const uploadImgCategory = async (_id, fileRef) => {
    if (fileRef.current.files.length == 0) {
        return toast.info("Image category did not change")
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
            toast.success("Image uploaded successfully");
            return true;
        }
    }
    catch (err) {
        toast.error("There error, try again later")
        console.log(err);
    }
}

//avater image upload - V
export const uploadImgAvatar = async (_id, fileRef) => {
    if (fileRef.current.files.length == 0) {
        return toast.info("Image Avater did not change")
    }
    let myFile = fileRef.current.files[0];
    if (myFile.size > 2 * 1024 * 1024) {
        return toast.error("Image too big")
    }
    const formData = new FormData();
    formData.append("myFile22", myFile);
    let url = API_URL + "/upload/uploadAvatar/" + _id;
    try {
        let resp = await axios.post(url, formData)
        if (resp.data) {
            toast.success("Avater image uploaded successfully");
            return true;
        }
    }
    catch (err) {
        toast.error("There error, try again later")
        console.log(err);
    }
}

//avater image upload update with token- V
export const uploadAvatarUpdate = async (_id, fileRef) => {
    if (fileRef.current.files.length == 0) {
        return toast.info("Image Avater did not change")
    }
    let myFile = fileRef.current.files[0];
    if (myFile.size > 2 * 1024 * 1024) {
        return toast.error("Image too big")
    }
    const formData = new FormData();
    formData.append("myFile22", myFile);
    let url = API_URL + "/upload/uploadAvatarUpdate";
    try {
        let resp = await axios.post(url, formData, {
            headers: {
                'x-api-key': localStorage[TOKEN_NAME]
            }
        })
        if (resp.data) {
            toast.success("Avater updated image uploaded successfully");
            return true;
        }
    }
    catch (err) {
        toast.error("There error, try again later")
        console.log(err);
    }
}
//food image - V
export const uploadImgFood = async (_id, fileRef) => {
    if (fileRef.current.files.length == 0) {
        return toast.info("Food image did not change")
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
            toast.success("Image uploaded successfully");
            return true;
        }
    }
    catch (err) {
        toast.error("There error, try again later")
        console.log(err);
    }
}
