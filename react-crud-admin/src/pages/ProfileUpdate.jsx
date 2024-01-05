import Footer from "../components/Footer";
import { MdAlternateEmail } from "react-icons/md";
import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiMail } from "react-icons/hi";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      navigate("/profile");
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  return (
    <>
      <div>
        <div>
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
            <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:max-w-sm rounded-xl">
              <div className="pb-6">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap justify-center">
                    <div className="flex justify-center w-full">
                      <div className="relative cursor-pointer">
                        <input
                          type="file"
                          ref={fileRef}
                          hidden
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                        <img
                          src={
                            formData.profilePicture ||
                            currentUser.profilePicture
                          }
                          onClick={() => fileRef.current.click()}
                          className="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[120px] max-h-[120px]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-16">
                    <p>
                      {imageError ? (
                        <span className="text-red-700 font-xs font-bold">
                          Error uploading image (max file size: 2MB)
                        </span>
                      ) : imagePercentage > 0 && imagePercentage < 100 ? (
                        <span className="text-slate-700 font-xs font-bold">{`Uploading: ${imagePercentage}%`}</span>
                      ) : (
                        imagePercentage === 100 && (
                          <span className="text-green-700 font-xs font-bold">
                            Image uploaded successfully ✅
                          </span>
                        )
                      )}
                    </p>
                  </div>

                  <div className="p-5">
                    <div>
                      {error && (
                        <div
                          className="my-2 rounded-lg bg-red-100 py-4 px-6 text-base text-red-700"
                          role="alert"
                        >
                          Something went wrong!
                        </div>
                      )}
                    </div>
                    <div className="max-w-md mb-2">
                      <div className="mb-2 block">
                        <Label htmlFor="user4" value="Username" />
                      </div>
                      <TextInput
                        id="username"
                        type="text"
                        icon={MdAlternateEmail}
                        defaultValue={currentUser?.username}
                        onChange={handleChange}
                        placeholder=""
                        required
                      />
                    </div>
                    <div className="max-w-md mb-2">
                      <div className="mb-2 block">
                        <Label htmlFor="email4" value="Email" />
                      </div>
                      <TextInput
                        id="email"
                        type="email"
                        icon={HiMail}
                        defaultValue={currentUser?.email}
                        onChange={handleChange}
                        placeholder="name@flowbite.com"
                        required
                      />
                    </div>

                    <div className="max-w-md mb-2">
                      <div className="mb-2 block">
                        <Label htmlFor="pass4" value="Password" />
                      </div>
                      <TextInput
                        id="password"
                        type="password"
                        onChange={handleChange}
                        placeholder="********"
                      />
                    </div>
                  </div>
                  <div className=" mx-6 text-center border-t border-gray-200 dark:border-gray-700/50">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full px-6 flex justify-center gap-5">
                        <Button
                          className="w-full"
                          outline
                          gradientDuoTone="purpleToBlue"
                          type="submit"
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
                  <div className="absolute flex -space-x-12 rounded-b-2xl">
                    <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-gray-400/90 group-hover:bg-gray-600/90 z-10"></div>
                    <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-gray-300/90 group-hover:bg-gray-500/90 z-20"></div>
                    <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-gray-200/90 group-hover:bg-gray-400/90 z-30"></div>
                    <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-gray-100/90 group-hover:bg-gray-300/90 z-40"></div>
                    <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-gray-50/90 group-hover:bg-gray-200/90 z-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
