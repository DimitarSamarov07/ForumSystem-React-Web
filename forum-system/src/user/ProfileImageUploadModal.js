import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserService} from "../services/user.service.js";

const userService = new UserService();

const ProfileImageUploadModal = ({user}) => {
    let [image, setImage] = useState();
    let [imageError, setImageError] = useState("");
    let navigate = useNavigate();

    const registerImage = (e) => {
        let newValue = e.target.files[0];
        setImageError("");
        setImage(newValue);
    }

    const onModalSubmit = async () => {
        if (!image) {
            setImageError("Image is required.")
        } else {
            await userService.changeProfilePic(user, image);
            navigate("/profile/index/" + user.username);
        }

    }

    return (
        <div className="container">

            {/*Trigger the modal with a button*/}
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModal">
                Change Profile Image
            </button>

            {/*Modal*/}
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Change Profile Picture</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Upload Profile Image</label>
                            <br/>
                            <label className="btn btn-dark">
                                <input className="btn btn-dark" type="file" onChange={registerImage}/>
                            </label>
                            <br/>
                            <span className="text-danger">{imageError}</span>
                            <br/>
                            <p className="text-danger">Make sure to use high-resolution images with aspect ratio
                                16:9</p>
                            <br/>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={onModalSubmit}>Update</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileImageUploadModal;